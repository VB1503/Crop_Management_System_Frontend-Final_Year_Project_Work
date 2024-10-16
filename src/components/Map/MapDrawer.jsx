import React, { useRef, useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, FeatureGroup, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { EditControl } from "react-leaflet-draw";
import L from "leaflet";
import { toast } from 'react-toastify';
import { IoSearch } from 'react-icons/io5';
import "leaflet-geometryutil";
import axios from "axios";

const MapComponent = () => {
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [drawnItems, setDrawnItems] = useState(null);
  const [perimeter, setPerimeter] = useState(null);
  const [area, setArea] = useState(null);
  const [polygonCoords, setPolygonCoords] = useState(JSON.parse(localStorage.getItem("polygonCoords")) || []);
  const [userPolygons, setUserPolygons] = useState([]);
  const [selectedLand, setSelectedLand] = useState(null);
  const [isPolygonDrawn, setIsPolygonDrawn] = useState(false); // New state for controlling button visibility
  const [sideMeasurements, setSideMeasurements] = useState([]);
  const latitude = 20.5937;
  const longitude = 78.9629;
  const [zoomLevel, setZoom] = useState(5);

  useEffect(() => {
    const fetchUserPolygons = async () => {
      try {
        const userId = localStorage.getItem("userid");
        const response = await axios.get(`https://agroharvest.onrender.com/landmarks/${userId}/`);
        setUserPolygons(response.data);
        localStorage.setItem("userlands", JSON.stringify(response.data));
        
      } catch (error) {
        console.error("Error fetching user polygons:", error);
      }
    };

    fetchUserPolygons();
  }, []);

  // Function to handle locating user's position
  const locateUser = () => {
    mapRef.current.locate();
  };

  // Event handler for user's position found
  const handleLocationFound = async (e) => {
    setUserLocation(e.latlng);
    mapRef.current.setView(e.latlng, 15);

    // Convert coordinates to human-readable address
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}`);
      const address = response.data.display_name;
      setUserAddress(address);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  // Function to handle searching for a place
  const searchPlace = async () => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${searchQuery}&format=json&limit=1`);
      if (response.data.length > 0) {
        const { lat, lon, display_name } = response.data[0];
        const newPosition = [parseFloat(lat), parseFloat(lon)];
        setUserLocation(newPosition);
        setUserAddress(display_name);
        mapRef.current.setView(newPosition, zoomLevel);
      } else {
        console.error("Place not found");
      }
    } catch (error) {
      console.error("Error searching for place:", error);
    }
  };

 

  // Function to display side labels (s1, s2, ...) on the map
  const displaySideLabels = (coordinates, map) => {
    const measurements = []; // Array to hold the side measurements
  
    coordinates.forEach((point, index) => {
      const nextPoint = coordinates[(index + 1) % coordinates.length]; // Get the next point, wrapping around
  
      // Calculate the distance between two points
      const distance = map.distance(point, nextPoint).toFixed(2); // Distance in meters
      measurements.push({ side: `S${index + 1}`, length: distance }); // Store the side name and length
  
      // Calculate the midpoint between the current and next point
      const midpoint = L.latLng(
        (point.lat + nextPoint.lat) / 2,
        (point.lng + nextPoint.lng) / 2
      );
  
      // Create a small divIcon to show the side label (s1, s2, ...)
      const sideLabel = L.divIcon({
        className: "side-label", // Custom class for styling
        html: `<div style="background-color: white; padding: 2px; border-radius: 3px; border: 1px solid black;">
                 s${index + 1}
               </div>`,
      });
  
      // Add the label to the map
      L.marker(midpoint, { icon: sideLabel }).addTo(map);
    });
  
    // Update state with the side measurements to display in the list
    setSideMeasurements(measurements);
  };
  
  
  // Function to handle selecting a land
  const handleSelectLand = (event) => {
    const selectedLandId = parseInt(event.target.value);
    setSelectedLand(selectedLandId);
  
    // Find the selected land coordinates
    const selectedLandCoordinates = userPolygons.find(land => land.landId === selectedLandId)?.coordinates;
  
    // Zoom to the selected land area
    if (selectedLandCoordinates) {
      const bounds = L.latLngBounds(selectedLandCoordinates);
      mapRef.current.fitBounds(bounds);
  
      // Display side labels and measurements for the selected land
      displaySideLabels(selectedLandCoordinates, mapRef.current); 
    }
  };
  

  // Function to handle when a shape is drawn
  const onDraw = (e) => {
    setDrawnItems(e.layer);
  
    const coordinates = e.layer.getLatLngs()[0]; // Extract the coordinates of the polygon
  
    // Convert coordinates to Leaflet LatLng objects
    const latLngCoords = coordinates.map(coord => ({ lat: coord.lat, lng: coord.lng }));
    localStorage.setItem('polygonCoords', JSON.stringify(latLngCoords));
    setPolygonCoords(latLngCoords);
  
    // Calculate perimeter and area using Leaflet.GeometryUtil
    const perimeter = L.GeometryUtil.length(coordinates);
    const area = L.GeometryUtil.geodesicArea(coordinates) / 10000; // Convert area to hectares
  
    setPerimeter(perimeter);
    setArea(area);
  
    // Show the "Confirm Coordinates" button after drawing the polygon
    setIsPolygonDrawn(true);
  
    // Display side labels (s1, s2, ...) on the map
    displaySideLabels(coordinates, e.layer._map);
  };
  

  // Custom hook to listen for events on the map
  const EventListener = () => {
    useMapEvents({
      locationfound: handleLocationFound,
    });
    return null;
  };

  // Function to handle sending coordinates to the endpoint
  const sendCoordinates = async () => {
    try {
      const response = await axios.post('https://agroharvest.onrender.com/landmark/', {
        user: localStorage.getItem("userid"),
        coordinates: polygonCoords
      });
      localStorage.setItem("landid", response.data.landId);
      console.log("Coordinates sent successfully:", response.data);
      // Notify the user
      toast.success("Your Land configured successfully");
  
      // Hide the "Confirm Coordinates" button after successful submission
      setIsPolygonDrawn(false); // <--- ADD THIS LINE
  
      // Clear the drawn polygon
      setPolygonCoords([]);
      setDrawnItems(null);
  
      // Refresh the page or userPolygons to update the map with the new polygon
      const userId = localStorage.getItem("userid");
      const updatedPolygons = await axios.get(`https://agroharvest.onrender.com/landmarks/${userId}/`);
      setUserPolygons(updatedPolygons.data);
      localStorage.setItem("userlands", JSON.stringify(updatedPolygons.data));
  
    } catch (error) {
      console.error("Error sending coordinates:", error);
      toast.error("Error confirming coordinates");
    }
  };
  
  // Function to handle delete land request
  // Function to handle delete land request
// Function to handle delete land request
const handleDeleteLand = async () => {
  const userId = localStorage.getItem("userid");

  if (window.confirm("Are you sure you want to delete this land?")) {
    try {
      await axios.delete(`https://agroharvest.onrender.com/landmark/delete/${userId}/${selectedLand}/`);

      // Remove the selected land from the userPolygons and update local storage
      const updatedPolygons = userPolygons.filter(polygon => polygon.landId !== selectedLand);
      setUserPolygons(updatedPolygons);  // Update the state to trigger re-render
      localStorage.setItem("userlands", JSON.stringify(updatedPolygons));

      // Clear the polygon coordinates from localStorage
      localStorage.removeItem("polygonCoords");

      // Clear the selected land and reset polygonCoords and drawnItems
      setSelectedLand(null);
      setPolygonCoords([]); // Clear the polygon coordinates from the map

      // Remove the polygon from the map
      if (drawnItems) {
        drawnItems.clearLayers(); // Clear all drawn layers
        setDrawnItems(null); // Reset the drawnItems state
      }      
      // Optionally refresh the map view
      mapRef.current.setView([latitude, longitude], zoomLevel); 
      window.location.reload(true);
    } catch (error) {
      console.error("Error deleting land:", error);
      toast.error("Error deleting land");
    }
  }
};

  return (
    <div className="flex items-center justify-center flex-col mb-[20px]">
      <div className="mt-14 mb-4 text-black mx-auto w-full flex justify-center">
        <div className="relative w-full max-w-[260px] md:max-w-[500px]">
          <input
            type="text"
            className="border p-3 rounded-lg shadow-xl w-full"
            placeholder="Search place..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={searchPlace}
            className="absolute text-[24px] text-blue-400 right-3 bg-yellow-500 rounded-full p-1 top-2"
          >
            <IoSearch />
          </button>
        </div>
      </div>

      <div className="flex gap-10 map-cont">
        <div className="w-[380px] h-[40vh] md:w-[100vh] md:h-[70vh] relative shadow-lg ">
          <MapContainer className="shadow-xl" center={[latitude, longitude]} zoom={zoomLevel} ref={mapRef} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              attribution='&copy; Google Maps'
              url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
              subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
            />

            <EventListener />

            <button onClick={locateUser} style={{ position: 'absolute', bottom: '10px', left: '10px', zIndex: 1000 }}>
              <img src="https://img.icons8.com/?size=96&id=OBmVbH2qOGwK&format=png" height={"40px"} width={"40px"} alt="locate" />
            </button>

            {userLocation && (
              <Marker position={userLocation}>
                <Popup>{userAddress || "You are here"}</Popup>
              </Marker>
            )}

            {userPolygons.map((polygon, index) => (
              <Polygon key={index} positions={polygon.coordinates} color="blue" />
            ))}

            <FeatureGroup>
              <EditControl
                position="topright"
                onCreated={onDraw}
                draw={{
                  rectangle: false,
                  circle: false,
                  marker: true,
                  circlemarker: false,
                }}
                edit={{
                  remove: true, // Enable removal of drawn items
                }}
              />
              {polygonCoords.length > 0 && (
                <Polygon positions={polygonCoords} color="blue" />
              )}
            </FeatureGroup>
          </MapContainer>
        </div>
        <div className="flex flex-col gap-10 items-center">
        {isPolygonDrawn && (
          <button onClick={sendCoordinates} className="p-[10px] border rounded-lg text-blue-800 shadow-sm">
            Confirm Coordinates
          </button>
        )}

          {perimeter && area && (
            <div className="p-6 shadow-sm rounded-sm">
              <p>Perimeter: {perimeter.toFixed(2)} meters</p>
              <p>Area: {area.toFixed(2)} hectares</p>
            </div>
          )}

          {/* Selectable option to choose land */}
          <div>
            <select value={selectedLand} onChange={handleSelectLand} className="map-select">
              <option value="" >Select Land</option>
              {userPolygons.map((polygon, index) => (
                <option key={index} value={polygon.landId}>{`Land ${index + 1}`}</option>
              ))}
            </select>
          </div>

          {/* Show delete button if land is selected */}
          {selectedLand && (
            <button onClick={handleDeleteLand} className="p-[10px] border rounded-lg text-red-800 shadow-sm">Delete Land</button>
          )}
          {sideMeasurements[0] &&
              <div className="p-6 shadow-sm rounded-sm">
                <h3>Side Measurements:</h3>
                <ul>
                  {sideMeasurements.map((side, index) => (
                    <li key={index}>
                      {side.side}: {side.length} meters
                    </li>
                  ))}
                </ul>
              </div>
          }

        </div>
      </div>
    </div>
  );
};

export default MapComponent;




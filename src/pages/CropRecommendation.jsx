import React, { useState, useEffect } from "react";
import axios from "axios";

const CropRecommendationForm = () => {
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");
  const [ph, setPh] = useState("");
  const [response, setResponse] = useState(null);
  const [userLands, setUserLands] = useState([]);
  const [selectedLand, setSelectedLand] = useState("");

  useEffect(() => {
    const fetchUserLands = async () => {
      try {
        const userId = localStorage.getItem("userid");
        const response = await axios.get(`https://agroharvest.onrender.com/landmarks/${userId}/`);
        setUserLands(response.data);
      } catch (error) {
        console.error("Error fetching user lands:", error);
      }
    };

    fetchUserLands();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      user: parseInt(localStorage.getItem("userid")),
      landId: parseInt(selectedLand), // Updated with the selected land ID
      nitrogen: parseInt(nitrogen),
      phosphorus: parseInt(phosphorus),
      potassium: parseInt(potassium),
      ph: parseFloat(ph),
    };

    try {
      const res = await axios.post(
        "https://agroharvest.onrender.com/croprecommendation/",
        data
      );
      setResponse(res.data);
      // Store selected land ID in local storage
      localStorage.setItem("userlands", selectedLand);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-10 ">
      <h2 className="text-center text-[20px] font-bold mb-10 text-green-700">Crop Recommendation System</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {/* Selectable option to choose land */}
        <div className="form-group">
          <label htmlFor="land" className="label">
            Choose Land
          </label>
          <select
            id="land"
            value={selectedLand}
            onChange={(e) => setSelectedLand(e.target.value)}
            required
            className="input"
          >
            <option value="">Select Land</option>
            {userLands.map((land,index) => (
              <option key={index} value={land.landId}>{`Land ${index + 1}`}</option>
            ))}
          </select>
        </div>
        {/* Rest of the form fields */}
        <div className="form-group">
          <label htmlFor="nitrogen" className="label">
            Nitrogen (N)
          </label>
          <input
            type="number"
            id="nitrogen"
            value={nitrogen}
            onChange={(e) => setNitrogen(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phosphorus" className="label">
            Phosphorus (P)
          </label>
          <input
            type="number"
            id="phosphorus"
            value={phosphorus}
            onChange={(e) => setPhosphorus(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="potassium" className="label">
            Potassium (K)
          </label>
          <input
            type="number"
            id="potassium"
            value={potassium}
            onChange={(e) => setPotassium(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="ph" className="label">
            pH
          </label>
          <input
            type="number"
            step="0.1"
            id="ph"
            value={ph}
            onChange={(e) => setPh(e.target.value)}
            required
            className="input"
          />
        </div>
        <button type="submit" className="button col-span-2">
          Get Crop Recommendation
        </button>
      </form>
      {response && (
        <div className="response">
          <h3 className="text-[20px] font-bold text-orange-600">{response.message}</h3>
          <p className="font-bold text-center">Predicted Crop: <span className="text-green-600 font-bold">{response.data.prediction}</span></p>
          <p className="font-bold text-center">Date: {new Date(response.data.start_date).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default CropRecommendationForm;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CropYieldPredictionForm() {
    const [userLands, setUserLands] = useState([]);
    const [selectedLand, setSelectedLand] = useState("");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        user: parseInt(localStorage.getItem("userid")),
        landId: '', // Initialize landId as empty string
        year: '',
        season: '',
        month: '',
        crop: '',
        area: ''
    });
    console.log(selectedLand)
    const [responseInfo, setResponseInfo] = useState(null);
    const [error, setError] = useState(null);

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

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Special handling for landId
        if (name === 'landId') {
            setSelectedLand(value); // Update selectedLand separately
            setFormData({ ...formData, landId: value }); // Update formData
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post('https://agroharvest.onrender.com/cropyield/', formData)
            .then(response => {
                setResponseInfo(response.data);
                setLoading(false);
                setError(null);
            })
            .catch(error => {
                setError(error.message);
                setResponseInfo(null);
            });
    };

    const monthsOptions = Array.from({ length: 10 }, (_, index) => ({
        value: index + 3,
        label: `${index + 3} months`
    }));
    const crops = [
        'rice', 'banana', 'maize', 'mungbean', 'cotton', 'chickpea',
        'grapes', 'mango', 'orange', 'papaya', 'pomegranate', 'pigeonpeas',
        'jute', 'blackgram', 'mothbeans', 'coffee', 'watermelon', 'lentil',
        'kidneybeans', 'apple'
    ];

    return (
        <div className="max-w-md md:max-w-4xl mx-auto p-8 mt-10  ">
            <h2 className="text-2xl mb-6 text-green-800 text-center font-bold">Crop Yield Prediction</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div >
                    <label htmlFor="land" className="label text-[18px] font-bold">
                        Choose Land
                    </label>
                    <select
                        id="land"
                        name='landId'
                        value={selectedLand}
                        onChange={handleChange}
                        required
                        className="input"
                    >
                        <option value="">Select Land</option>
                        {userLands.map((land, index) => (
                            <option key={index} value={land.landId}>{`Land ${index + 1}`}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="year" className="block text-[18px] font-bold">Year:</label>
                    <input type="number" id="year" name="year" value={formData.year} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" placeholder='Enter the Year' required />
                </div>
                <div>
                    <label htmlFor="season" className="block text-[18px] font-bold">
                        Season
                    </label>
                    <select
                        id="season"
                        name="season"
                        value={formData.season}
                        onChange={handleChange}
                        className="block w-full px-2 py-2 mt-2 text-md border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        required
                    >
                        <option value="">Select Season</option>
                        <option value="0">Kharif</option>
                        <option value="1">Whole Year</option>
                        <option value="2">Autumn</option>
                        <option value="3">Rabi</option>
                        <option value="4">Summer</option>
                        <option value="5">Winter</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="month" className="block text-[18px] font-bold">Forecast Duration:</label>
                    <select id="month" name="month" value={formData.month} onChange={handleChange} className="w-full px-2 py-2 text-md border rounded-lg focus:outline-none focus:border-blue-500" required>
                        <option value="">Select Forecast Duration</option>
                        {monthsOptions.map(option => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="crop_type" className="block text-[18px] font-bold">
                        Crop:
                    </label>
                    <select
                        id="crop_type"
                        name="crop"
                        value={formData.crop}
                        onChange={handleChange}
                        className="block w-full px-2 py-2 mt-2 text-md border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        required
                    >
                        <option value="">Select Crop</option>
                        {crops.map((crop, index) => (
                            <option key={index} value={index}>{crop.charAt(0).toUpperCase() + crop.slice(1)}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="area" className="block text-[18px] font-bold">Area in hectare:</label>
                    <input type="number" id="area" name="area" value={formData.area} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" placeholder='Enter the Area size in Hectare'required />
                </div>
                <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg">Submit</button>
            </form>
            {/* Preloader overlay */}
      {loading && (
        <div className="fixed inset-0 bg-sky-500 bg-opacity-50 flex items-center justify-center z-50">
          <img src="/preloader.gif" alt="Loading..." className="w-[300px]" />
        </div>
      )}
            {responseInfo && (
                <div className="mt-8">
                    <h3 className="text-xl font-semibold">Yield Prediction and Production Rate</h3>
                    <p><strong>Production:</strong> {responseInfo.production} <strong>kg</strong></p>
                    <p><strong>Yield:</strong> {responseInfo.yield_per_hectare} <strong>kg/ha</strong></p>
                    {/* Add additional content related to yield prediction and production rate */}
                </div>
            )}

            {error && (
                <div className="mt-8 text-red-500">
                    <p>Error: {error}</p>
                </div>
            )}
        </div>
    );
}

export default CropYieldPredictionForm;

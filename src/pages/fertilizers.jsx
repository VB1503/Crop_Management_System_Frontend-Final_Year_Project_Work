import React, { useState } from 'react';
import axios from 'axios';

const FertilizerRecommendationForm = () => {
    const [fertilizer,setFertilizer]=useState('')
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        temperature: '',
        humidity: '',
        moisture: '',
        soil_type: 0,
        crop_type: 0,
        nitrogen: '',
        phosphorous: '',
        potassium: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('https://agroharvest.onrender.com/fertilizer/', formData);
            console.log(response.data);
            setFertilizer(response.data.recommendation)
            // Handle response data as needed
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        } finally {
            setLoading(false); // Hide preloader after response
          }
        
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className='flex flex-col-reverse gap-[10px] md:flex-row'>

        <div className="max-w-md md:max-w-xl mx-auto p-8  rounded-lg shadow-sm">
            <h2 className="text-2xl mb-6 text-center font-bold text-black mt-4">
                Get informed advice on fertilizer based on soil
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="temperature" className="text-lg font-bold">
                        Temperature
                    </label>
                    <input
                        type="number"
                        id="temperature"
                        name="temperature"
                        value={formData.temperature}
                        onChange={handleChange}
                        placeholder="Enter the value"
                        className="block w-full px-4 py-2 mt-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="humidity" className="text-lg font-bold">
                        Humidity
                    </label>
                    <input
                        type="number"
                        id="humidity"
                        name="humidity"
                        value={formData.humidity}
                        onChange={handleChange}
                        placeholder="Enter the value"
                        className="block w-full px-4 py-2 mt-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="moisture" className="text-lg font-bold">
                        Moisture
                    </label>
                    <input
                        type="number"
                        id="moisture"
                        name="moisture"
                        value={formData.moisture}
                        onChange={handleChange}
                        placeholder="Enter the value"
                        className="block w-full px-4 py-2 mt-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="soil_type" className="text-lg font-bold">
                        Soil Type
                    </label>
                    <select
                        id="soil_type"
                        name="soil_type"
                        value={formData.soil_type}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 mt-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        required
                    >
                        <option value="0">Sandy</option>
                        <option value="1">Loamy</option>
                        <option value="2">Black</option>
                        <option value="3">Red</option>
                        <option value="4">Clayey</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="crop_type" className="text-lg font-bold">
                        Crop Type
                    </label>
                    <select
                        id="crop_type"
                        name="crop_type"
                        value={formData.crop_type}
                        onChange={handleChange}
                        className="block w-full px-4 py-2 mt-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        required
                    >
                        <option value="0">Maize</option>
                        <option value="1">Sugarcane</option>
                        <option value="2">Cotton</option>
                        <option value="3">Tobacco</option>
                        <option value="4">Paddy</option>
                        <option value="5">Barley</option>
                        <option value="6">Wheat</option>
                        <option value="7">Millets</option>
                        <option value="8">Oil seeds</option>
                        <option value="9">Pulses</option>
                        <option value="10">Ground Nuts</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="nitrogen" className="text-lg font-bold">
                        Nitrogen
                    </label>
                    <input
                        type="number"
                        id="nitrogen"
                        name="nitrogen"
                        value={formData.nitrogen}
                        onChange={handleChange}
                        placeholder="Enter the value"
                        className="block w-full px-4 py-2 mt-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phosphorous" className="text-lg font-bold">
                        Phosphorous
                    </label>
                    <input
                        type="number"
                        id="phosphorous"
                        name="phosphorous"
                        value={formData.phosphorous}
                        onChange={handleChange}
                        placeholder="Enter the value"
                        className="block w-full px-4 py-2 mt-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="potassium" className="text-lg font-bold">
                        Potassium
                    </label>
                    <input
                        type="number"
                        id="potassium"
                        name="potassium"
                        value={formData.potassium}
                        onChange={handleChange}
                        placeholder="Enter the value"
                        className="block w-full px-4 py-2 mt-2 text-lg border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 mt-4 text-lg font-bold rounded-lg focus:outline-none focus:shadow-outline"
                    >
                        Predict
                    </button>
                </div>
            </form>
            {/* Preloader overlay */}
      {loading && (
        <div className="fixed inset-0 bg-sky-500 bg-opacity-50 flex items-center justify-center z-50">
          <img src="/preloader.gif" alt="Loading..." className="w-[300px]" />
        </div>
      )}
        </div>
        {fertilizer &&
        <div className="flex items-center container mx-auto my-16">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 justify-items-center">
                <div className="py-4">
                    <h1 className='text-center text-[28px] font-bold'>{fertilizer.name}</h1>
                    <div className="bg-blended-almond py-4 px-6 rounded-lg shadow-md">
                       {fertilizer.fertilizer}
                    </div>
                </div>
            </div>
        </div>
}
        </div>
    );
};

export default FertilizerRecommendationForm;

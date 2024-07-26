import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Timer = ({ onTimerComplete }) => {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(seconds => seconds + 1);
            if (seconds === 59) {
                setSeconds(0);
                setMinutes(minutes => minutes + 1);
            }
            if (minutes === 59) {
                setMinutes(0);
                setHours(hours => hours + 1);

            }
            if (hours === 0 && minutes === 0 && seconds === 10) {
                clearInterval(interval);
                onTimerComplete();
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [seconds, minutes, hours, onTimerComplete]);

    return (
        <div className="text-center">
            <p className="text-3xl font-semibold mb-2">Timer</p>
            <p className="text-xl">{hours < 10 ? `0${hours}` : hours}:{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
        </div>
    );
};

const IrrigationSystem = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [error, setError] = useState(null);
    const [isTimerVisible, setIsTimerVisible] = useState(false);

    useEffect(() => {
        const fetchWeatherData = async (latitude, longitude) => {
            try {
                // Fetch current weather data
                const currentWeatherResponse = await axios.get(`http://api.weatherapi.com/v1/current.json?key=31a8d1a6588a42a78ff115005242702&q=${latitude},${longitude}`);
                setWeatherData(currentWeatherResponse.data);

                // Fetch forecast weather data
                const forecastResponse = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=31a8d1a6588a42a78ff115005242702&q=${latitude},${longitude}&days=3`);
                setForecastData(forecastResponse.data);

                setError(null);
            } catch (error) {
                setError('Failed to fetch weather data');
                setWeatherData(null);
                setForecastData(null);
            }
        };

        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    fetchWeatherData(latitude, longitude);
                }, error => {
                    setError('Failed to fetch location');
                });
            } else {
                setError('Geolocation is not supported by this browser.');
            }
        };

        getLocation();
    }, []);

    const handleIrrigationOn = () => {
        setIsTimerVisible(true);
    };

    const handleIrrigationOff = () => {
        setIsTimerVisible(false);
    };

    const handleTimerComplete = () => {
        setIsTimerVisible(false); // Turn off the irrigation system after 10 seconds
    };

    return (
        <div className='flex flex-col  pt-10'>
            <div className='flex items-center justify-center gap-[40px]'>
                <div className=" p-8 border border-gray-300 rounded-lg shadow-lg">
                    {forecastData ? (
                        <div className="mt-8">
                            <h3 className="text-center text-xl font-semibold mb-8 text-blue-800">Forecast Weather</h3>
                            <div className='flex gap-[25px]'>
                                {forecastData.forecast.forecastday.map((day, index) => (
                                    <div key={index} className="text-center mb-4">
                                        <img src={day.day.condition.icon} alt="Weather Icon" className="mx-auto mt-2" />
                                        <h4 className="text-lg font-semibold text-green-600">{day.date}</h4>
                                        <p><strong>Condition:</strong> {day.day.condition.text}</p>
                                        <p><strong>Max Temperature:</strong> {day.day.maxtemp_c} °C</p>
                                        <p><strong>Min Temperature:</strong> {day.day.mintemp_c} °C</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center mb-8">
                            <p>Loading forecast data...</p>
                        </div>
                    )}

                    {error && (
                        <div className="text-red-500 mt-4">
                            <p>{error}</p>
                        </div>
                    )}
                </div>
                <div className=" w-[400px] p-8 border border-gray-300 rounded-lg shadow-lg">
                    <div className="mb-8">
                        <h2 className="text-2xl mb-6 text-center">Irrigation System</h2>
                        <div className="flex justify-center mb-4">
                            <button onClick={handleIrrigationOn} className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:bg-green-600 mr-2">On</button>
                            <button onClick={handleIrrigationOff} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:bg-red-600 ml-2">Off</button>
                        </div>
                        {isTimerVisible && <Timer onTimerComplete={handleTimerComplete} />}
                    </div>

                    {weatherData ? (
                        <div className="text-center mb-8">
                            <h3 className="text-xl font-semibold mb-2">Current Weather</h3>
                            <p><strong>Location:</strong> {weatherData.location.name}, {weatherData.location.country}</p>
                            <p><strong>Temperature:</strong> {weatherData.current.temp_c} °C</p>
                            <p><strong>Condition:</strong> {weatherData.current.condition.text}</p>
                            <p><strong>Wind Speed:</strong> {weatherData.current.wind_kph} km/h</p>
                            <img src={weatherData.current.condition.icon} alt="Weather Icon" className="mx-auto mt-4" />
                        </div>
                    ) : (
                        <div className="text-center mb-8">
                            <p>Loading weather data...</p>
                        </div>
                    )}
                </div>
            </div>
            <div className="bg-transperent mr-auto ml-60 p-8 border border-gray-300 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-2">Irrigation Guidelines</h3>
                
                <ul className="list-disc ml-6">
                    <li>Ensure proper soil moisture levels.</li>
                    <li>Monitor weather forecasts regularly.</li>
                    <li>Adjust irrigation schedules based on weather conditions.</li>
                </ul>
            </div>
        </div>
    );
};

export default IrrigationSystem;

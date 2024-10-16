import React,{useState} from 'react';
import './Home.css'; 
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
  const username = useState(localStorage.getItem('first_name'))
  const navigate = useNavigate();
  const handleButtonClick = () => {
    if (username) {
      // If username is valid (true), navigate to /LSM
      navigate('/LSM');
    } else {
      // If username is false or empty, navigate to /login
      navigate('/login');
    }
  };
  return (
    <div className="home-container bg-gray-100 text-gray-900">
      {/* Welcome Section */}
      <div className="section py-16 bg-gradient-to-r from-green-400 to-green-600 text-white text-center px-4">
        <h2 className="text-4xl font-extrabold mb-4">Welcome To AgroHarvest!</h2>
        <p className="text-lg md:text-xl font-light">Your smart assistant for crop recommendation and yield prediction.</p>
      </div>

      {/* Content Section */}
      <div className="content container mx-auto px-4 py-2 space-y-12">
        {/* Methodology */}
        <div>
          <h3 className="text-3xl font-semibold mb-4">Methodology</h3>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            AgroHarvest operates through a seamless integration of user input, data analysis, and visualization. Users input parameters like soil type, climate, and crop preferences, while the platform analyzes agricultural data such as historical crop yields, weather patterns, and soil characteristics.
          </p>
        </div>

        {/* How It Works */}
        <div>
          <h3 className="text-3xl font-semibold mb-4">How It Works</h3>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Users gain insights into crop suitability and yield potential via visualizations and summaries. Customization options allow users to explore various scenarios, refining recommendations with user feedback over time.
          </p>
        </div>

        {/* Key Features */}
        <div className='w-full'>
          <h3 className="text-3xl font-semibold mb-4">Key Features</h3>
          <ul className="list-disc list-inside text-lg md:text-xl text-gray-700 space-y-2">
            <li>Crop recommendation based on location-specific factors.</li>
            <li>Yield prediction using real-time data and machine learning models.</li>
            <li>Custom scenarios for different outcomes based on user inputs.</li>
            <li>Data-driven insights combining historical and real-time data.</li>
            <li>Push notifications for real-time updates.</li>
          </ul>
        </div>

        {/* Performance Evaluation and Results */}
        <div>
          <h3 className="text-3xl font-semibold mb-4">Performance Evaluation and Results</h3>
          <h4 className="text-xl font-semibold mb-2">Crop Recommendation System Evaluation</h4>
          <p className="text-lg md:text-xl text-gray-700 mb-6">
            The system evaluates machine learning models like Random Forest, Logistic Regression, and Decision Tree for accuracy. Random Forest outperforms others in terms of accuracy and precision.
          </p>
          <h4 className="text-xl font-semibold mb-2">Crop Yield Prediction Analysis</h4>
          <p className="text-lg md:text-xl text-gray-700">
            Yield prediction is based on factors such as weather, soil, and historical data. Results are visualized through heatmaps, box plots, and scatter plots, aiding farmers in resource management.
          </p>
        </div>
      </div>

      

      {/* Architectural Diagram */}
      <div className="section py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-semibold mb-4">Architectural Diagram</h3>
          <div className="flex justify-center">
            <img src="architecture.png" alt="Architectural Diagram" className="w-full md:w-3/4 rounded-lg shadow-lg"/>
          </div>
        </div>
      </div>

      {/* Visualizations */}
      <div className="section py-16 bg-gray-200">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-semibold mb-4">Visualizations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <img src="heatmap.png" alt="Heatmap for Crop Recommendation" className="rounded-lg shadow-lg"/>
            <img src="scatterplot-1.png" alt="Scatterplot for Crop Yield Prediction" className="rounded-lg shadow-lg"/>
          </div>
        </div>
      </div>

      {/* Get Started */}
      <div className="py-16 bg-green-600 text-center">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-semibold mb-4">Get Started</h3>
          <p className="text-lg md:text-xl leading-relaxed mb-6">
            Create an account using Google OAuth / user details, select your Land and input the parameters, and get actionable insights on which crops to plant and expected yields.
          </p>
          <button className="bg-white text-green-600 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300" onClick={handleButtonClick}>
            Get Started Now
          </button>
        </div>
      </div>

      {/*  Tech Stack */}
      <div className="bg-gray-800 text-white mt-10 w-full">
        <div className="bg-gray-800 container  space-y-4">
          <h3 className="text-[20px] md:text-3xl font-semibold"> Tech Stack</h3>
          <ul className="list-disc list-inside text-[14px] md:text-xl space-y-2">
            <li>Django Rest Framework for API development.</li>
            <li>React-Vite for Frontend development.</li>
            <li>PostgreSQL for scalable database management.</li>
            <li>Google OAuth for secure user authentication.</li>
            <li>Pushbullet for real-time notifications.</li>
            <li>WeatherAPI for live weather updates.</li>
          </ul>
        </div>
      </div>
    </div>

    
  );
};

export default HomePage;

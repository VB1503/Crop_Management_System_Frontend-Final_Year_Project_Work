import React from 'react';
import './Home.css'; // Import CSS for styling

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="section">
        <h2 className='welcome-text'>Welcome To AgroHarvest !</h2>
        <div className='tsd-img-cont'>
        <img src="https://theagroharvest.com/wp-content/uploads/2023/09/cropped-agro-harvest-logo-png-1.png" alt="Twitter Spam Detection" className='tsd-img' />
        </div>
        <div className="content">
          <h3 className='cont-head'>Methodology</h3>
          <p className='content-text'>
          The crop recommendation and yield prediction website operates through a seamless integration of user input, comprehensive data analysis, and intuitive visualization. Users navigate a user-friendly interface to input location-specific parameters such as soil type, climate conditions, and crop preferences. Behind the scenes, the website harnesses a wealth of agricultural data, including historical crop yields, weather patterns, and soil characteristics.
          </p>
          <h2 className='cont-head'>How It Works</h2>
<p className='content-text'>Through interactive visualizations and insightful summaries, users gain valuable insights into crop suitability and yield potential. The website offers customization options for exploring alternative scenarios and encourages user feedback to refine its recommendations and predictions over time. Accessible across devices and supported by additional resources, the website empowers farmers with data-driven decision-making tools to optimize agricultural productivity and resource allocation.</p>

        </div>
      </div>
      <div className="section">
        <div className='tsd-img-cont'>
        <img src="https://media.istockphoto.com/id/1484751132/photo/aerial-view-of-tractor-as-dragging-a-sowing-machine-over-agricultural-field-farmland.webp?b=1&s=170667a&w=0&k=20&c=tUzn3O7GnzOeAcRrpyzU5RMFANS1l0k1vvliawZfESc=" alt="Sentiment Analysis" className='tsd-img'/>
        </div>
        
      </div>
    </div>
  );
};

export default HomePage;

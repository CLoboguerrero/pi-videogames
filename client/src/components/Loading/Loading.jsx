import React from 'react';
import './Loading.modules.css';
import backgroundVideo from '../../assets/videos/loadingCar.webm';

function Loading() {
    return (
      <div className="loading-container">
        <video src= {backgroundVideo} className="background-video" autoPlay loop muted>
        </video>
        <div className="loading-content">
          <h1>Loading</h1>
        </div>
      </div>
    );
  }
  
  export default Loading;
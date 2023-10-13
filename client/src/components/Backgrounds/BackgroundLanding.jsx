import React from 'react';
import './Backgrounds.modules.css';
import backgroundVideo from '../../assets/videos/homeBkg.mp4';

function BackgroundLanding() {
    return (
      <div className="background-container">
        <video src= {backgroundVideo} className="background-video" autoPlay loop muted></video>
      </div>
    );
  }
  
  export default BackgroundLanding;
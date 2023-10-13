import React from 'react';
import './Backgrounds.modules.css';
import backgroundVideo from '../../assets/videos/backgroundCity.webm';
import Cards from '../Cards/Cards';

function BackgroundMain() {
    return (
      <div className="background-container">
        <video src= {backgroundVideo} className="background-video" autoPlay loop muted></video>
      </div>
    );
  }
  
  export default BackgroundMain;
import React from 'react';
import './Backgrounds.modules.css';
import backgroundVideo from '../../assets/videos/backgroundCity.webm';

function BackgroundMain() {
    return (
      <div className="background-container">
        <div className='bkg-layer'></div>
        <video src= {backgroundVideo} className="background-video" autoPlay loop muted></video>
      </div>
    );
  }
  
  export default BackgroundMain;
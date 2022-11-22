import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import facialrecognition from './facialrecognition.png';

const Logo = ({ onButtonSubmit }) => {
      return (
            <div className='ma4 mt0 blur pointer' onClick={onButtonSubmit}>
                  <Tilt className='myTilt br2' perspective={500} options={{ max: 55 }} style={{width: 150, height: 150}}>
                        <div className='inner-element'>
                              <img id='logoIcon' src={facialrecognition} alt='Facial Recognition' />
                        </div>
                  </Tilt>
            </div>
      );
}

export default Logo;
import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ box, imageUrl }) => {

      return (
            <div className='center ma'>
                  <div className='absolute mt2 shadow-3'>
                        <img id='inputimage' src={imageUrl} width='700px' height='auto' alt='Input Will Appear Here'/>
                        <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
                  </div>
            </div>
      );
}

export default FaceRecognition;
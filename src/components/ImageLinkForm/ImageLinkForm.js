import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
      return (
            <div>
                  <p className='f3'>
                        {'Provide the URL to an image that has a face and we will detect it. Try it out!'}
                  </p>
                  <div className='center'>
                        <div className='form center pa4 br3 shadow-5'>
                              <input className='f4 pa2 w-70 center' type='text' placeholder='Enter image URL here' onChange={onInputChange}/>
                                    <button 
                                          className='container btn'
                                          onClick={onButtonSubmit}
                                    >
                                          <svg viewBox={'0 0 180 60'} preserveAspectRatio="none" className='border'>
                                                <polyline points='179,0.5 179,59 0.5,59 1,0.5 179,0.5' className='bg-line' />
                                                <polyline points='179,0.5 179,59 0.5,59 1,0.5 179,0.5' className='hl-line' />
                                          </svg>
                                          <span>Detect</span>
                                    </button>
                              {/* <button className='w-30 grow f4 link ph3 pv2 dib' onClick={onButtonSubmit}>Detect</button> */}
                        </div>
                  </div>
            </div>
      );
}

export default ImageLinkForm;
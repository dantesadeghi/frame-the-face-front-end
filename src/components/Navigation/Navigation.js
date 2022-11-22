import React from 'react';
import './Navigation.css'

const Navigation = ({ onRouteChange, isSignedIn }) => {
      return (
            isSignedIn 
            ?     <nav>
                        <p onClick={() => onRouteChange('signin')} className='f3 link dim pointer'> Sign Out </p>
                  </nav>
            :     <nav>
                        <p onClick={() => onRouteChange('signin')} className='f3 link dim pointer'> Sign In </p>
                        <p onClick={() => onRouteChange('register')} className='f3 link dim pointer'> Register </p>
                  </nav>
      );
}

export default Navigation;
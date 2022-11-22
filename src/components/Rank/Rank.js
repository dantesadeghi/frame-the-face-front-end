import React from 'react';
import './Rank.css';

const Rank = ({ name, entries }) => {
      return (
            <div>
                  <div className='changeFont'>
                        {`${name}, your current number of submissions is...`}
                  </div>
                  <div className='changeFont2'>
                        {`${entries}`}
                  </div>
            </div>
      );
}

export default Rank;
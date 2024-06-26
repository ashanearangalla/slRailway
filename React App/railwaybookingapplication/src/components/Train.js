import React from 'react'
import Trainform from './Trainform'
import '../index.css';
import Navigationbar from './Navigationbar';

export default function Train() {
  return (
    <div>
      <Navigationbar />
    
    <div className='all-sec'>
        <Trainform/>
    </div>
    </div>
  )
}

import React from 'react'
import Scheduleform from './Scheduleform'
import '../index.css'
import Navigationbar from './Navigationbar'

export default function Schedule() {
  return (
    <div>
      <Navigationbar />
    <div className='all-sec'>
        <Scheduleform/>
    </div>
    </div>
  )
}

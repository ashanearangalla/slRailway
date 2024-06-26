import React from 'react'
import Stationform from './Stationform'
import Navigationbar from './Navigationbar'

export default function Station() {
  return (
    <div>
      <Navigationbar />
    <div className='all-sec'>
        <Stationform/>
    </div>
    </div>
  )
}

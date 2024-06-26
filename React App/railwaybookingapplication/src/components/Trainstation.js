import React from 'react'
import Trainstationform from './Trainstationform'
import Navigationbar from './Navigationbar'

export default function Trainstation() {
  return (
    <div>
      <Navigationbar />
    <div className='all-sec'>
        <Trainstationform/>
    </div>
    </div>
  )
}

import React from 'react'
import '../index.css'
import Ticketform from './Ticketform'
import Navigationbar from './Navigationbar'

export default function Ticket() {
  return (
    <div>
      <Navigationbar/>
    <div className='all-sec'>
        <Ticketform/>
    </div>
    </div>
  )
}

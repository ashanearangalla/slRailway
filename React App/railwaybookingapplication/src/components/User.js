import React from 'react'
import UserForm from './UserForm'
import '../index.css';
import Navigationbar from './Navigationbar';
export default function User() {
  return (
    <div>
      <Navigationbar />
    <div className='all-sec'>
        <UserForm/>

    </div>
    </div>
  )
}

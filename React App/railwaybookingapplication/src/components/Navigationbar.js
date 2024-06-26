import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; 
import '../index.css';




export default function Navigationbar() {
  return (
    <div>
    
        <Navbar  className='navbar-class'>
        <Container>
          <Navbar.Brand className='logo-new' href="#home">Railway Booking System</Navbar.Brand>
          <Nav className="me-auto">
          <Nav.Link as= {Link} to ="/train" className='links'>View Trains</Nav.Link>
            <Nav.Link as= {Link} to ="/trainstation" className='links'>Train-Station</Nav.Link>
            <Nav.Link as= {Link} to ="/schedule" className='links'>Schedules</Nav.Link>
            <Nav.Link as= {Link} to ="/ticket" className='links'>Ticket</Nav.Link>
            <Nav.Link as= {Link} to ="/seat" className='links'>Seats</Nav.Link>
            <Nav.Link as= {Link} to ="/payment" className='links'>Payments</Nav.Link>
            
            <Nav.Link as= {Link} to ="/station" className='links'>Stations</Nav.Link>
            <Nav.Link as= {Link} to ="/user" className='links'>Users</Nav.Link>
            
          </Nav>

          <Nav>
            <Nav.Link as={Link} to='/login'>
              <FontAwesomeIcon className='icon-user' icon={faUser} />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      
    </div>

  )
}

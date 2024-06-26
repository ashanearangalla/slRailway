import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; 
import '../index.css';

export default function NavigationbarP() {
  return (
    <div>
    
    <Navbar  className='navbar-class'>
    <Container>
      <Navbar.Brand className='logo-new' href="#home">Railway Booking System</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link as= {Link} to ="/" className='links'>Home</Nav.Link>
        <Nav.Link href="#pricing" className='links'>About Us</Nav.Link>
            <Nav.Link href="#features" className='links'>Contact</Nav.Link>
            
        
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

import React from 'react';
import Navigationbar from './components/Navigationbar';
import Home from './components/Home';
import Contact from './components/Contact';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Train from './components/Train';
import Payments from './components/Payment';
import Schedule from './components/Schedule';
import User from './components/User';
import Ticket from './components/Ticket';
import Seat from './components/Seat';
import Trainstation from './components/Trainstation';
import Station from './components/Station';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/station" element={<Station />} />
          <Route path="/train" element={<Train/>} />
          <Route path="/payment" element={<Payments />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/user" element={<User />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/seat" element={<Seat />} />
          <Route path="/trainstation" element={<Trainstation/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/home" element={<Home/>} />
          
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;

import React, { Fragment, useState } from "react";
import axios from 'axios';
import { BsEye, BsEyeSlash } from 'react-icons/bs'; 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Authentication = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [userID, setUserID] = useState(null);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    axios.get(`https://localhost:7265/api/User/users/${username}`)
      .then((result) => {
        if (result.data) {
          const user = result.data;
          if (user.password === password) {
            const { role, userID } = user;
            setUserID(userID);
            if (role === 'admin') {
              toast.success('Login Successful');
              navigate('/train');
            } else if (role === 'customer') {
              toast.success('Login Successful');
              // Redirect to home with userID as state
              navigate('/home', { state: { userID } });
            } else {
              // Handle unknown role
            }
          } else {
            toast.error('Incorrect Password');
          }
        } else {
          toast.error('User not found');
        }
      }).catch((error) => {
        toast.error('User not found');
      });
  };

  return (
    <Fragment>
      <ToastContainer/>
    <div>
      <h2 className="heading-top-2">Login</h2>
      <Form className='login-form'>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Enter username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <div className="password-input-container">
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)} type={showPassword ? "text" : "password"}
              placeholder="Password"
            />
            <Button
              variant="light"
              className="password-toggle-btn"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <BsEyeSlash /> : <BsEye />}
            </Button>
          </div>
        </Form.Group>
        <div className="button-container">
        <Button onClick={handleLogin} variant="primary" type="button" className='login-btn'>
          Login
        </Button>
        </div>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Text className="text-muted">
            Don't you have an account? <Link to="/signup">SignUp</Link>
          </Form.Text>
        </Form.Group>
      </Form>
    </div>
    </Fragment>
  );
};

export default Authentication;
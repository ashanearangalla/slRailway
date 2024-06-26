import React,{ useState, useEffect, Fragment } from "react";
import { BsEye, BsEyeSlash } from 'react-icons/bs'; 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../index.css';
import './Form.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [username, setUsername] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = () => {
    if (validateInput(username, password, confirmPassword, contactNo)) {
      const url = `https://localhost:7265/api/User/users/${username}`;
    
      axios.get(url)
        .then((response) => {
          // If username exists, show error message
          if (response.status === 200) {
            toast.error('Username already exists. Please choose another one.');
          } 
        })
        .catch((error) => {
          // If 404 error, proceed with signup
          if (error.response && error.response.status === 404) {
            const signupUrl = 'https://localhost:7265/api/User';
            const data = {
              "username": username,
              "password": password,
              "contactNo": contactNo,
              "role": "customer"
            }
  
            axios.post(signupUrl, data)
              .then((result) => {
                toast.success('Create Account Successful', {
                  onClose: () => navigate('/login')
                });
              })
              .catch((error) => {
                toast.error(error);
              });
          } else {
            toast.error('Error checking username availability.');
          }
        });
    } else {
      toast.error('Please fill in all fields or ensure passwords match.');
    };
  };

  const validateInput = (username, password, confirmPassword, contactNo) => {
    return username !== '' && password !== '' && confirmPassword !== '' && password === confirmPassword;
  }

  return (
    <Fragment>
      <ToastContainer/>
    <div>
      <h2 className="heading-top-signup">Sign Up</h2>
      <Form className='signup-form'>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Enter username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicContactNo">
          <Form.Label>Contact No</Form.Label>
          <Form.Control value={contactNo} onChange={(e) => setContactNo(e.target.value)} type="text" placeholder="Enter Contact No" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <div className="password-input-container">
            <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
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

        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <div className="password-input-container">
            <Form.Control
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
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
        <Button onClick={handleSignup} variant="primary"  className='login-btn'>
          Signup
        </Button>
</div>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Text className="text-muted">
            Already have an account? <Link to="/login">Login</Link>
          </Form.Text>
        </Form.Group>
      </Form>
    </div>
    </Fragment>
  );
};

export default Signup;
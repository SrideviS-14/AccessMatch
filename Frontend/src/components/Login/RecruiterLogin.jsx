import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom'; // Import Navigate
import axios from 'axios';
import RecruiterHome from '../Home/RecruiterHome'; // Import the RecruiterHome component

function RecruiterLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [redirect, setRedirect] = useState(false); // State for redirection

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginSuccess = () => {
    setLoggedIn(true);
    setRedirect(true); // Set redirection state to true upon successful login
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/recruiter/login', formData); // Assuming the endpoint for recruiter login is '/recruiter/login'
      if (response.data.message === "Login successful") {
        handleLoginSuccess();
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('Invalid email or password');
      console.error('Login failed:', error.response.data.message);
    }
  };

  return (
    <>
    { !redirect && <div>
      <h1>Recruiter Login Page</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
      <p>Not registered? <Link to="/register">Register here</Link></p>
      <p>Login as Job Seeker <Link to="/JobSeekerLogin">Login</Link></p>
      </div>}
      {/* Render Navigate component to redirect to RecruiterHome upon loggedIn */}
      {redirect && <RecruiterHome />}
    </>
  );
}

export default RecruiterLogin;

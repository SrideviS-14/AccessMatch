import React, { useState } from 'react';
import axios from 'axios';
import {  Link } from 'react-router-dom';
import '../../App.css';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'jobSeeker' // Default value for userType
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/register', formData);
      console.log(response.data.message); // Log registration success message
    } catch (error) {
      console.error('Registration failed:', error.response.data.message); // Log registration error
    }
  };

  return (
    <div>
      <h2>Register Page</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
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
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div className="select-container">
          <label>User Type:</label>
          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
          >
            <option value="jobSeeker">Job Seeker</option>
            <option value="recruiter">Recruiter</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;

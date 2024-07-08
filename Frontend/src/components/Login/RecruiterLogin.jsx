import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RecruiterHome from '../Home/RecruiterHome';

function RecruiterLogin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [recruiterEmail, setRecruiterEmail] = useState(''); // Store email

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginSuccess = (email) => {
    setLoggedIn(true);
    setRecruiterEmail(email); // Set email on successful login
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/recruiter/login', formData);
      if (response.data.message === "Login successful") {
        handleLoginSuccess(formData.email); // Pass the email
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
      {!loggedIn ? (
        <div>
          <h1>Recruiter Login Page</h1>
          <form onSubmit={handleSubmit} className="form-container">
            <div>
              <label>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div>
              <label>Password:</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} />
            </div>
            <button type="submit">Login</button>
            {error && <p>{error}</p>}
          </form>
          <p>Not registered? <Link to="/register">Register here</Link></p>
          <p>Login as Job Seeker <Link to="/JobSeekerLogin">Login</Link></p>
        </div>
      ) : (
        <RecruiterHome email={recruiterEmail} /> // Pass email to RecruiterHome
      )}
    </>
  );
}

export default RecruiterLogin;



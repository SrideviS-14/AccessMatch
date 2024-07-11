



import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RecruiterHome from '../Home/RecruiterHome';
import styles from './Login.module.css'; 
import startListeningImg from '../../Assets/StartListening.png';
import stopListeningImg from '../../Assets/StopListening.png';
import logo from '../../Assets/logo.png';

function RecruiterLogin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [recruiterEmail, setRecruiterEmail] = useState('');

  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[event.resultIndex][0].transcript.trim().toLowerCase();
        handleVoiceCommand(transcript);
      };

      recognitionInstance.onend = () => {
        if (isListening) {
          recognitionInstance.start(); 
        }
      };

      setRecognition(recognitionInstance);
    } else {
      console.warn('Speech Recognition API is not supported in this browser.');
    }
  }, [isListening]);

  const handleVoiceCommand = (command) => {
    if (command.includes('next')) {
      focusField(0); // Focus on email field
      return;
    }

    if (command.includes('password')) {
      focusField(1); // Focus on password field
      return;
    }

    if (command.includes('submit')) {
      handleSubmit(); // Submit the form
      return;
    }

    // Handle text input for focused field
    const activeElement = document.activeElement;
    if (activeElement && activeElement.tagName === 'INPUT') {
      const fieldName = activeElement.getAttribute('name');
      let updatedValue = command;

      // Remove trailing dots
      if (fieldName === 'email' || fieldName === 'password') {
        updatedValue = command.replace(/\.+$/, ''); // Remove trailing dots
      }

      setFormData(prevData => ({ ...prevData, [fieldName]: updatedValue }));
    }
  };

  const focusField = (index) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index].focus();
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginSuccess = (email) => {
    setLoggedIn(true);
    setRecruiterEmail(email);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/recruiter/login', formData);
      if (response.data.message === "Login successful") {
        handleLoginSuccess(formData.email);
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('Invalid email or password');
      console.error('Login failed:', error.response?.data?.message || error.message);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  return (
    <div className={styles.Login}>
      

      {!loggedIn ? (
        <div class="RecruiterLogin">
          <div className="cont">
        <img className="image" src={logo} alt="Logo" />
        <h1>ACCESS MATCH</h1>
        </div>

          <h1>Recruiter Login Page</h1>
          <form onSubmit={handleSubmit} className="formContainer">
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                ref={(el) => inputRefs.current[0] = el}
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                ref={(el) => inputRefs.current[1] = el}
              />
            </div>
            <button type="submit">Login</button><br></br>
            {error && <p>{error}</p>}


          </form>
          <p>Not registered? <Link to="/register">Register here</Link></p>
          <p>Login as Job Seeker <Link to="/JobSeekerLogin">Login</Link></p>
          <button
      onClick={toggleListening}
      className="listeningButton"
      style={{ backgroundColor: 'white', padding: '0px' }} 
    >
      <img
        src={isListening ? stopListeningImg : startListeningImg}
        alt={isListening ? 'Stop Listening' : 'Start Listening'}
        className="listeningImage"
      />
    </button>
        </div>
      ) : (
        <RecruiterHome email={recruiterEmail} />
      )}



        
    </div>
  );
}

export default RecruiterLogin;







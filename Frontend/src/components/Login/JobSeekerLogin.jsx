import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import JobSeekerHome from '../Home/JobSeekerHome';
import startListeningImg from '../../Assets/StartListening.png';
import stopListeningImg from '../../Assets/StopListening.png';

function JobSeekerLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);

  // Ref to all input fields
  const inputRefs = useRef([]);
  const formRef = useRef(null);

  useEffect(() => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[event.resultIndex][0].transcript.trim().toLowerCase();
        console.log("Voice Command:", transcript); // Debugging: Log recognized command
        handleVoiceCommand(transcript);
      };

      recognitionInstance.onend = () => {
        if (isListening) {
          recognitionInstance.start(); // Restart recognition if still listening
        }
      };

      setRecognition(recognitionInstance);
    } else {
      console.warn('Speech Recognition API is not supported in this browser.');
    }
  }, [isListening]);

  const handleVoiceCommand = (command) => {
    console.log("Voice Command:", command); // Debugging: Log recognized command

    // Define command actions for focusing on fields
    const focusCommands = {
      'next': () => focusField(0), // 'next' will focus on the email input field
      'password': () => focusField(1),
      'login': () => formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
    };

    for (const [key, action] of Object.entries(focusCommands)) {
      if (command.includes(key)) {
        console.log("Executing command:", key); // Debugging: Log which command is being executed
        action();
        return; // Exit after executing the command
      }
    }

    // Handle text input only if no commands matched
    if (command) {
      const activeElement = document.activeElement;
      if (activeElement && activeElement.tagName === 'INPUT') {
        const fieldName = activeElement.getAttribute('name');
        console.log("Filling in field:", fieldName, "with command:", command); // Debugging: Log field name and input

        // Handle special characters
        let sanitizedCommand = command;
        if (fieldName === 'email') {
          sanitizedCommand = command.replace(/[^a-zA-Z0-9.@]/g, ''); // Allow @ and . for email
        } else if (fieldName === 'password') {
          sanitizedCommand = command.replace(/[^a-zA-Z0-9.@]/g, ''); // Allow special characters for passwords
        } else {
          sanitizedCommand = command.replace(/[^\w\s]/g, ''); // No special characters for other fields
        }

        // Remove trailing dots or other unwanted characters
        sanitizedCommand = sanitizedCommand.replace(/\.+$/, '');

        setFormData(prevData => ({ ...prevData, [fieldName]: sanitizedCommand }));
      }
    }
  };

  const focusField = (index) => {
    if (inputRefs.current[index]) {
      inputRefs.current[index].focus();
      setCurrentFieldIndex(index);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/jobSeeker/login', formData);
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

  const toggleListening = () => {
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  const handleLoginSuccess = () => {
    setLoggedIn(true);
  };

  if (loggedIn) {
    return <JobSeekerHome />;
  }

  return (
    <>
      <div>
        <h1>Job Seeker Login Page</h1>
        {/* <button onClick={toggleListening}>
          {isListening ? 'Stop Listening' : 'Start Listening'}
        </button> */}

        <form onSubmit={handleSubmit} className="formContainer" ref={formRef}>
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
          <button type="submit" ref={(el) => inputRefs.current[2] = el}>Login</button>
          {error && <p>{error}</p>}
        </form>
        <p>Not registered? <Link to="/register">Register here</Link></p>
        <p>Login as Recruiter <Link to="/RecruiterLogin">Login</Link></p>
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
    </>
  );
}

export default JobSeekerLogin;
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../App.css';
import logo from '../../Assets/logo.png';
import startListeningImg from '../../Assets/StartListening.png';
import stopListeningImg from '../../Assets/StopListening.png';
import styles from '../Login/Login.module.css';
function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'jobSeeker'
  });

  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);

  // Ref to all input fields
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
      'username': () => focusField(0),
      'email': () => focusField(1),
      'password': () => focusField(2),
      'confirm': () => focusField(3), // Specifically for confirm password
      'user type': () => focusField(4),
      'register': () => focusField(5)
    };

    const userTypeCommands = {
      'job seeker': () => setFormData(prevData => ({ ...prevData, userType: 'jobSeeker' })),
      'recruiter': () => setFormData(prevData => ({ ...prevData, userType: 'recruiter' }))
    };

    const submitCommand = {
      'register': () => handleSubmit()
    };

    if (command.includes('next')) {
      moveToNextField();
      return; // Exit after executing the command
    }

    for (const [key, action] of Object.entries(focusCommands)) {
      if (command.includes(key)) {
        console.log("Focusing on:", key); // Debugging: Log which field is being focused
        action();
        return; // Exit after executing the command
      }
    }

    for (const [key, action] of Object.entries(userTypeCommands)) {
      if (command.includes(key)) {
        action();
        // Move to the register button after setting user type
        if (key === 'job seeker' || key === 'recruiter') {
          focusField(5); // Focus on the register button
        }
        return; // Exit after executing the command
      }
    }

    for (const [key, action] of Object.entries(submitCommand)) {
      if (command.includes(key)) {
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
        } else if (fieldName === 'password' || fieldName === 'confirmPassword') {
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

  const moveToNextField = () => {
    const nextIndex = currentFieldIndex + 1;
    if (nextIndex < inputRefs.current.length) {
      focusField(nextIndex);
    }
  };

  const handleChange = (e) => {
    setFormData(prevData => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/register', formData);
      console.log(response.data.message);
    } catch (error) {
      console.error('Registration failed:', error.response.data.message);
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
    <div class ="Registerpage">
         <div className="cont">
        <img className="image" src={logo} alt="Logo" />
        <h1>ACCESS MATCH</h1>
      </div>
      <h2>Register Page</h2>
      <form onSubmit={handleSubmit} className="formContainer">
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            ref={(el) => inputRefs.current[0] = el}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            ref={(el) => inputRefs.current[1] = el}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            ref={(el) => inputRefs.current[2] = el}
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            ref={(el) => inputRefs.current[3] = el}
          />
        </div>
        <div className="select-container">
          <label>User Type:</label>
          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            ref={(el) => inputRefs.current[4] = el}
          >
            <option value="jobSeeker">Job Seeker</option>
            <option value="recruiter">Recruiter</option>
          </select>
        </div>
        <button type="submit" ref={(el) => inputRefs.current[5] = el}>Register</button><br></br><br></br>
        Already registered? <Link to="/">Login</Link>
      </form>
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
  );
}

export default Register;
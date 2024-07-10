import '../Main/index.css';
import bgimage from '../../Assets/bg.jpg';
import logo from '../../Assets/logo.png';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Main() {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const navigate = useNavigate();

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

    if (command.includes('finder')) {
      navigate('/JobSeekerLogin');
    } else if (command.includes('recruiter')) {
      navigate('/RecruiterLogin');
    } else if (command.includes('register')) {
      navigate('/register');
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
    <div className="fp-container" style={{ backgroundColor: '#fff' }}>
      <div className="bg-image-container">
        <img src={bgimage} alt="Background" className="bg-image" />
        <h1 className="bg-text">Empowering <span>Abilities</span>, Enabling Opportunities</h1>
      </div>
      <div className="left">
        <img src={logo} alt="Logo" />
        <h1>ACCESS MATCH</h1>
        <p>Access Match is dedicated to connecting disabled individuals with inclusive job opportunities, empowering them to achieve their career goals and thrive in the workplace.</p>
          <p><span>Start your journey</span></p>
        <div className="links">
          <Link className="lnk-btn" to="/JobSeekerLogin">Log in as Job Finder</Link><br />
          <Link className="lnk-btn" to="/RecruiterLogin">Log in as Recruiter</Link><br />
          <Link className="lnk-btn" to="/register">Register</Link><br />
        </div>
        <button onClick={toggleListening}>
          {isListening ? 'Stop Listening' : 'Start Listening'}
        </button>
      </div>
    </div>
  );
}

export default Main;
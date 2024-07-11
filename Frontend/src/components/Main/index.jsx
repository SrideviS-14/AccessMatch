// import '../Main/index.css';
// import bgimage from '../../Assets/bg.jpg';
// import logo from '../../Assets/logo.png';
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import startListeningImg from '../../Assets/StartListening.png';
// import stopListeningImg from '../../Assets/StopListening.png';
// import styles from '../Login/Login.module.css'

// function Main() {
//   const [isListening, setIsListening] = useState(false);
//   const [recognition, setRecognition] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (window.SpeechRecognition || window.webkitSpeechRecognition) {
//       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//       const recognitionInstance = new SpeechRecognition();
//       recognitionInstance.continuous = true;
//       recognitionInstance.interimResults = false;
//       recognitionInstance.lang = 'en-US';

//       recognitionInstance.onresult = (event) => {
//         const transcript = event.results[event.resultIndex][0].transcript.trim().toLowerCase();
//         console.log("Voice Command:", transcript); // Debugging: Log recognized command
//         handleVoiceCommand(transcript);
//       };

//       recognitionInstance.onend = () => {
//         if (isListening) {
//           recognitionInstance.start(); // Restart recognition if still listening
//         }
//       };

//       setRecognition(recognitionInstance);
//     } else {
//       console.warn('Speech Recognition API is not supported in this browser.');
//     }
//   }, [isListening]);

//   const handleVoiceCommand = (command) => {
//     console.log("Voice Command:", command); // Debugging: Log recognized command

//     if (command.includes('finder')) {
//       navigate('/JobSeekerLogin');
//     } else if (command.includes('recruiter')) {
//       navigate('/RecruiterLogin');
//     } else if (command.includes('register')) {
//       navigate('/register');
//     }
//   };

//   const toggleListening = () => {
//     if (isListening) {
//       recognition.stop();
//       setIsListening(false);
//     } else {
//       recognition.start();
//       setIsListening(true);
//     }
//   };



//   return (
//     <div className="fp-container" style={{ backgroundColor: '#fff' }}>
//       <div className="bg-image-container">
//         <img src={bgimage} alt="Background" className="bg-image" />
//         <h1 className="bg-text">Empowering <span>Abilities</span>, Enabling Opportunities</h1>
//       </div>
//       <div className="left">
//         <img src={logo} alt="Logo" />
//         <h1>ACCESS MATCH</h1>
//         <p>Access Match is dedicated to connecting disabled individuals with inclusive job opportunities, empowering them to achieve their career goals and thrive in the workplace.</p>
//           <p><span>Start your journey</span></p>
//         <div className="links">
//           <Link className="lnk-btn" to="/JobSeekerLogin">Log in as Job Finder</Link><br />
//           <Link className="lnk-btn" to="/RecruiterLogin">Log in as Recruiter</Link><br />
//           <Link className="lnk-btn" to="/register">Register</Link><br />
//         </div>
//         <button
//       onClick={toggleListening}
//       className={styles.listeningButton}
//       style={{ backgroundColor: '#e8f5e9' }} 
//     >
//       <img
//         src={isListening ? stopListeningImg : startListeningImg}
//         alt={isListening ? 'Stop Listening' : 'Start Listening'}
//         className={styles.listeningImage}
//       />
//     </button>
//       </div>      

//     </div>
//   );
// }

// export default Main;


import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import bgimage from '../../Assets/bg.jpg';
import logo from '../../Assets/logo.png';
import startListeningImg from '../../Assets/StartListening.png';
import stopListeningImg from '../../Assets/StopListening.png';

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
    <div className="fp-container" style={{ display: 'flex', width: '100vw', height: '100vh', gap: '3%', backgroundColor: '#fff' }}>
      <div className="bg-image-container" style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' , borderRadius: '0' }}>
        <img src={bgimage} alt="Background" className="bg-image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <h1 className="bg-text" style={{ position: 'absolute', top: '15%', left: '20%', transform: 'translate(-30%, -30%)', color: 'white', zIndex: '1', fontSize: '2.5rem', width: '50ch' }}>
          Empowering <span style={{ backgroundColor: 'aliceblue', color: 'black' }}>Abilities</span>
        </h1>
      </div>
      <div className="left" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', width: '50%', paddingLeft: '20px', textAlign: 'center', gap: '2%' }}>
        <img src={logo} alt="Logo" style={{ width: '30%', height: '25%', border: 'none', borderRadius: '50%' }} />
        <h1>ACCESS MATCH</h1>
        <p style={{ width: '70ch', fontSize: '1.1rem', wordSpacing: '1px' }}>
          Access Match is dedicated to connecting disabled individuals with inclusive job opportunities, empowering them to achieve their career goals and thrive in the workplace.
        </p>
        <p><span style={{ letterSpacing: '1px', fontSize: '1.2rem', fontWeight: 'bold', width: 'auto', display: 'inline-block', backgroundColor: 'aliceblue', color: 'black' }}>Start your journey</span></p>
        <div className="links" style={{ display: 'flex', flexFlow: 'column', width: '100%', alignItems: 'center' }}>
          <Link className="lnk-btn" to="/JobSeekerLogin" style={{ border: '2px solid rgb(127, 127, 127)', borderRadius: '10px', padding: '20px', width: '70%', textDecoration: 'none', fontSize: '1.2rem', color: 'black', backgroundColor: 'rgb(255, 255, 255)' }}>Log in as Job Finder</Link><br />
          <Link className="lnk-btn" to="/RecruiterLogin" style={{ border: '2px solid rgb(127, 127, 127)', borderRadius: '10px', padding: '20px', width: '70%', textDecoration: 'none', fontSize: '1.2rem', color: 'black', backgroundColor: 'rgb(255, 255, 255)' }}>Log in as Recruiter</Link><br />
          <Link className="lnk-btn" to="/register" style={{ border: '2px solid rgb(127, 127, 127)', borderRadius: '10px', padding: '20px', width: '70%', textDecoration: 'none', fontSize: '1.2rem', color: 'black', backgroundColor: 'rgb(255, 255, 255)' }}>Register</Link><br />
        </div>
        <div className="listening-container" style={{ position: 'fixed', bottom: '0', right: '0', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <button
            onClick={toggleListening}
            className="listening-button"
            style={{ width: '80px', height: '80px', borderRadius: '50%', border: 'none', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
          >
            <img
              src={isListening ? stopListeningImg : startListeningImg}
              alt={isListening ? 'Stop Listening' : 'Start Listening'}
              className="listening-image"
              style={{ width: '50px', height: '50px' }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Main;

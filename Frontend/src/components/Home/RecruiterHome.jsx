

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../Assets/logo.png';
import placeholder from '../../Assets/placeholder.jpeg';
import axios from 'axios';
import chat from '../../Assets/chat.png';
import styles from './RecruiterHome.module.css';

function RecruiterHome({ email }) {
  useEffect(() => {
    (function(d, m){
      var kommunicateSettings = {
          "appId":"192ded5c231fe8072d18b39e136f2a448",
          "popupWidget":true,
          "automaticChatOpenOnNavigation":true
      };
      var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
      window.kommunicate = m; m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
  }, []);

  const [jobs, setJobs] = useState([]);
  const [profile, setProfile] = useState({ name: '', profilePhotoURL: '' });

  useEffect(() => {
    if (email) {
      getJobs(email);
      getProfile(email);
    }
  }, [email]);

  const getJobs = async (email) => {
    try {
      const response = await axios.get(`http://localhost:3001/recruiter/postedJobs?email=${email}`);
      setJobs(response.data);
    } catch (error) {
      console.log("Error occurred: ", error);
    }
  };

  const getProfile = async (email) => {
    try {
      const response = await axios.get(`http://localhost:3001/recruiter/profile?email=${email}`);
      setProfile(response.data);
    } catch (error) {
      console.log("Error occurred: ", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleProfilePhotoUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('profilePhoto', file);
    formData.append('email', email);

    try {
      const response = await axios.post('http://localhost:3001/recruiter/uploadProfilePhoto', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setProfile({ ...profile, profilePhotoURL: response.data.profilePhotoURL });
    } catch (error) {
      console.log("Error occurred: ", error);
    }
  };

  return (


    <div className = "RecruiterHome">
      <div className="cont">
        <img className="image" src={logo} alt="Logo" />
        <h1>ACCESS MATCH</h1>
        <button className="logoutBut" onClick={handleLogout}>
          Logout
        </button>
      </div>
    
      <div className="headerSection">
        <div className="prof">
          <img className="profileImage"
            src={profile.profilePhotoURL ? `http://localhost:3001/uploads/${profile.profilePhotoURL}` : placeholder} alt="Profile" />
          <label className="customFileUpload">
            <input type="file" onChange={handleProfilePhotoUpload} />
            Edit Profile
          </label>
          <div className="info">
            <h2>Profile Info</h2>
            <h4>UserName:<span>{profile.name}</span> </h4>
            <h4>Email:<span>{email}</span></h4>
          </div>
        </div>
        <div className="box">
          <h1>WELCOME {profile.name}</h1>
          <div className="feature">
            <div className="newJobCard">
              <h3>Add New Openings</h3>
              <p>Create and manage job openings with ease.
                Streamline communication with potential hires 
                through centralized job listings. Enhance recruitment 
                efficiency and reach a broader audience of job seekers.
              </p>
              <button style={{ textDecoration: 'none', background: 'black', border: 'none', color: 'white' ,width : '100%' }}>
                <Link to="/postJobByRecruiter" style={{ textDecoration: 'none', color: 'inherit' }}>
                  Post job openings
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>  
      <h1>Jobs you have posted</h1>
      <div className="jobContainer">
        {jobs.length === 0 ? (
          <h3>No jobs posted</h3>
        ) : (
          jobs.map(job => (
            <div key={job._id} className="jobCard">
              <div className="keyInfo">
                <img 
                  src={profile.profilePhotoURL ? `http://localhost:3001/uploads/${profile.profilePhotoURL}` : placeholder} 
                  alt="Profile" 
                />
                <p> Posted by {profile.name}<br />
                  Registration Deadline {new Date(job.regDeadline).toLocaleDateString()}
                </p>
              </div>
              <h2>{job.jobTitle}</h2>
              <h3>{job.companyName}</h3>
              <p>{job.jobDescription}</p>
              <p><span>Number Of Openings:</span> {job.numberOfOpenings}</p>
              <div className="buttons">
                <button>Edit</button>
                <button>View Applicants</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className='chatbox'>
        <a href="https://accessmatch-chatspace.netlify.app/">
          <img className="chatImage" src={chat} alt="chat" />
        </a>
      </div>
    </div>
  );
}

export default RecruiterHome;




// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import './RecruiterHome.css';
// import logo from '../../Assets/logo.png';
// import logout from '../../Assets/logout.png';
// import placeholder from '../../Assets/placeholder.jpeg' // Add the placeholder image
// import axios from 'axios';

// function RecruiterHome({ email }) {
//   const [jobs, setJobs] = useState([]);
//   const [profile, setProfile] = useState({ name: '', profilePhotoURL: '' });

//   useEffect(() => {
//     if (email) {
//       getJobs(email);
//       getProfile(email);
//     }
//   }, [email]);

//   const getJobs = async (email) => {
//     try {
//       const response = await axios.get(`http://localhost:3001/recruiter/postedJobs?email=${email}`);
//       setJobs(response.data);
//     } catch (error) {
//       console.log("Error occurred: ", error);
//     }
//   };

//   const getProfile = async (email) => {
//     try {
//       const response = await axios.get(`http://localhost:3001/recruiter/profile?email=${email}`);
//       setProfile(response.data);
//     } catch (error) {
//       console.log("Error occurred: ", error);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     window.location.reload();
//   };

//   const handleProfilePhotoUpload = async (e) => {
//     const file = e.target.files[0];
//     const formData = new FormData();
//     formData.append('profilePhoto', file);
//     formData.append('email', email);

//     try {
//       const response = await axios.post('http://localhost:3001/recruiter/uploadProfilePhoto', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
//       setProfile({ ...profile, profilePhotoURL: response.data.profilePhotoURL });
//     } catch (error) {
//       console.log("Error occurred: ", error);
//     }
//   };

//   return (
//     <div>
//       <div className="container">
//         <img className="image" src={logo} alt="Logo" />
//         <h1>Access Match</h1>
//         <button className="logout-button" onClick={handleLogout}>
//           <img className="logout-image" src={logout} alt="Logout" />Logout
//         </button>
//       </div>
//       <h2>DASHBOARD</h2>
//       <div className="profile-section">
//         <h3>Profile</h3>
//         <img
//           className="profile-image"
//           src={profile.profilePhotoURL ? `http://localhost:3001/uploads/${profile.profilePhotoURL}` : placeholder}
//           alt="Profile"
//         />
//         <p>Name: {profile.name}</p>
//         <p>Email: {email}</p>
//         <input type="file" onChange={handleProfilePhotoUpload} />
//       </div>
//       <p>Post jobs:</p>
//       <ul>
//         <li><Link to="/shortlistCandidate">Short List your candidates</Link></li>
//         <li><Link to="/postJobByRecruiter">Post job openings</Link></li>
//       </ul>
//       <h1>Jobs you have posted</h1>
//       <div className="job-container">
//         {jobs.map(job => (
//           <div key={job._id} className="job-card">
//             <h2>{job.jobTitle}</h2>
//             <h3>{job.companyName}</h3>
//             <p><span>Description:</span> {job.jobDescription}</p>
//             <p><span>Openings:</span> {job.numberOfOpenings}</p>
//             <p>Registration Deadline: {new Date(job.regDeadline).toLocaleDateString()}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default RecruiterHome;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RecruiterHome.css';
import logo from '../../Assets/logo.png';
import logout from '../../Assets/logout.png';
import placeholder from '../../Assets/placeholder.jpeg';
import axios from 'axios';
import chat from '../../Assets/chat.png';

function RecruiterHome({ email }) {
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
    <div>
      <div class="container">
        <img class="image" src={logo} alt="Logo" />
        <h1>Access Match</h1>
        <button class="logout-button" onClick={handleLogout}>
          <img class="logout-image" src={logout} alt="Logout" />Logout
        </button>
      </div>
      <h2>DASHBOARD</h2>
      <div className="header-section">
      <div class="prof">
        <img class="profile-image" 
        src={profile.profilePhotoURL ? `http://localhost:3001/uploads/${profile.profilePhotoURL}` : placeholder} alt="Profile" />
        <label class="custom-file-upload">
          <input type="file" onChange={handleProfilePhotoUpload} />
          Edit Profile
        </label>
        <div className="info">
          <h2>Profile Info</h2>
        <h4>User Name:{profile.name}</h4>
        <h4>Email:{email}</h4>
        </div>
        </div>
        <div class = "box">
          <h1>WELCOME {profile.name}</h1>
<div className="feature">

<div className="newjobcard">
             <h3>Add New Openings</h3>
             <p>Create and manage job openings with ease.
             Streamline communication with potential hires 
             through centralized job listings. Enhance recruitment 
             efficiency and reach a broader audience of job seekers.
             </p>
             <button style={{ textDecoration: 'none', 
              background: 'black', 
              border: 'none' , 
              color:'white'
              }}>
              <Link to="/postJobByRecruiter" style={{ textDecoration: 'none', color: 'inherit' }}>
              Post job openings
              </Link>
              </button>
          </div>


          <div className="newjobcard">
             
          </div>
</div>
    




        </div>
      </div>  
      <h1>Jobs you have posted</h1>
      <div className="job-container">
        {jobs.length === 0 ? (
          <h3>No jobs posted</h3>
        ) : (
          jobs.map(job => (
            <div key={job._id} className="job-card">
              <div className="keyinfo">
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

      <div>
      <a href="https://accessmatch-chatspace.netlify.app/">
          <img class="chat-image" src={chat} alt="chat" />
          </a>
      </div>
      
    </div>
    
  );
}

export default RecruiterHome;


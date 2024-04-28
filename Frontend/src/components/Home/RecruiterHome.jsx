import React from 'react'
import { Link } from 'react-router-dom';

function RecruiterHome() {
  const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
  return (
    <div>
      <h1>Recruiter Home Page</h1>
      <button onClick={handleLogout}>Logout</button>
      <p>Welcome to the Recruiter Home Page!</p>
      <p>Post jobs:</p>
      <ul>
        <li><Link to="/shortlistCandidate">Short List your candidates</Link></li>
        <li><Link to="/postJobByRecruiter">Post job openings</Link></li>
      </ul>
    </div>
  )
}

export default RecruiterHome

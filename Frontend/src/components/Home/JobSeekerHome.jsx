import React from 'react';
import { Link } from 'react-router-dom';

function JobSeekerHome() {
  const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
  return (
    <div>
      <h1>Job Seeker Home Page</h1>
      <button onClick={handleLogout}>Logout</button>
      <p>Welcome to the Job Seeker Home Page!</p>
       
      <p>Explore available jobs:</p>
      <ul>
        <li><Link to="/jobFinder">Job Finder</Link></li>
      </ul>
    </div>
  );
}

export default JobSeekerHome;

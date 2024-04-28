import React from 'react';
import { Link } from 'react-router-dom';

function Main() {

  return  (         
  <div className="form-container">
      <Link to="/JobSeekerLogin">Log in as Job Finder</Link><br></br>
        <Link to="/RecruiterLogin">Log in as Recruiter</Link><br></br>
        <Link to="/register">Register</Link><br></br>
  </div>
  );
}

export default Main;

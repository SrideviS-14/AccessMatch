import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ShortlistCandidate() {
  const [jobs, setJobs] = useState([]);
  const [email, setEmail] = useState('');
  const getJobs = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/recruiter/postedJobs?email=${email}`);
      setJobs(response.data)
    }
    catch (error) {
      console.log("Error occurred: ", error)
    }
  }
  
  return (
    <div>
    <h1>Jobs you have posted</h1>
    <div className="form-container">
        <label htmlFor="email">Enter your email:</label>
        <input type="text" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <button onClick={getJobs}>Get Jobs</button>
    <div>
      {jobs.map(job => (
        <div key={job._id} className="job-card">
            <h2>{job.jobTitle}</h2>
            <p>Company: {job.companyName}</p>
            <p>Description: {job.jobDescription}</p>
            <p>Openings: {job.numberOfOpenings}</p>
        </div>
      ))}
    </div>
    </div>
    </div>
  )
}

export default ShortlistCandidate

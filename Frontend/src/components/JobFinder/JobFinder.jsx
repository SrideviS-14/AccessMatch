import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function JobFinder() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [searched, setSearched] = useState(false);
  const [allCompanies, setAllCompanies] = useState([]);

  useEffect(() => {
    fetchJobs();
    fetchCompanies();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:3001/jobOpening/all');
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await axios.get('http://localhost:3001/jobOpening/allCompanies');
      setAllCompanies(response.data); // Update allCompanies state with company names
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const handleSearch = async () => {
    try {
      let response;
      if (selectedJob.trim() !== '') {
        response = await axios.get(`http://localhost:3001/jobOpening/all?searchTerm=${selectedJob}`);
      } else if (selectedCompany.trim() !== '') {
        response = await axios.get(`http://localhost:3001/jobOpening/allCompanies?searchTerm=${selectedCompany}`);
      } else {
        fetchJobs(); // No search terms provided, fetch all jobs
        return;
      }
      setJobs(response.data);
      setSearched(true);
    } catch (error) {
      console.error('Error searching jobs:', error);
    }
  };

  const handleReset = () => {
    setSelectedJob('');
    setSelectedCompany('');
    fetchJobs();
    setSearched(false);
  };

  return (
    < div className="job-finder-container">
      <h1>Job Finder Page</h1>
      <div className='job-search-form'>
        <div className="search-bar">
        <select
          value={selectedJob}
          onChange={(e) => setSelectedJob(e.target.value)}
        >
          <option value="">-- Select Job --</option>
          {jobs.map(job => (
            <option key={job._id} value={job.jobTitle}>{job.jobTitle}</option>
          ))}
        </select>
        <select
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
        >
          <option value="">-- Select Company --</option>
          {allCompanies.map((company, index) => (
            <option key={index} value={company}>{company}</option>
          ))}
        </select>
        </div>
        <div className="button-container">
          <button onClick={handleSearch}>Search</button>
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
      <div className='job'>
        {jobs.map(job => (
          <div key={job._id} className="job-card">
            <h2>{job.jobTitle}</h2>
            <p>Company: {job.companyName}</p>
            <p>Description: {job.jobDescription}</p>
            <p>Openings: {job.numberOfOpenings}</p>
            <Link to='/applyToJob'>Link to apply job</Link>
            <hr />
          </div>
        ))}
        {jobs.length === 0 && searched && <p>No jobs found.</p>}
      </div>
    </div>
  );
}

export default JobFinder;

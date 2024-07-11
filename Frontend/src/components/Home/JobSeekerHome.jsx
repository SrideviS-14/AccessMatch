import { useState , useEffect } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import chat from '../../Assets/chat.png';

function JobSeekerHome() {
  useEffect(() => {
    (function(d, m){
      var kommunicateSettings =
          {"appId":"192ded5c231fe8072d18b39e136f2a448","popupWidget":true,"automaticChatOpenOnNavigation":true};
      var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
      s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
      var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
      window.kommunicate = m; m._globals = kommunicateSettings;
  })(document, window.kommunicate || {});
  }, []);

  const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
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
    <div class="seeker">
      
      <h1>Job Seeker Home Page</h1>
      <button class="btn-cls" onClick={handleLogout}>Logout</button>
      <p>Welcome to the Job Seeker Home Page!</p>
      
      < div className="job-finder-container">
      <h3>Jobs that might suit you</h3>
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
        <div className="butt-cont">
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
    <div className='chatbox'>
        <a href="https://accessmatch-chatspace.netlify.app/">
          <img className="chatImage" src={chat} alt="chat" />
        </a>
      </div>


    </div>
  );
}

export default JobSeekerHome;

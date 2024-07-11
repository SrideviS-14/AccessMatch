

import axios from 'axios';
import React, { useState, useEffect } from 'react';

function PostJobByRecruiter() {
  const [formData, setFormData] = useState({
    email: '',
    companyName: '',
    jobTitle: '',
    jobDescription: '',
    numberOfOpenings: 0,
    regDeadline: '',
    disabilityType: '',
    acceptedLevelOfDisability: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/jobOpening/add', formData);
      console.log(response.data);
      // Handle success or error messages
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  const [email, setEmail] = useState('');

  useEffect(() => {
    // Fetch email from localStorage when component mounts
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      setEmail(userEmail);
    }
  }, []);

  return (
    <>
      <h1>Post Job By Recruiter Page</h1>
      <form onSubmit={handleSubmit} className='formContainer'>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Company Name:</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Job Title:</label>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Job Description:</label>
          <textarea
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Number of Openings:</label>
          <input
            type="number"
            name="numberOfOpenings"
            value={formData.numberOfOpenings}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Registration Deadline (yyyy-mm-dd):</label>
          <input
            type="text"
            name="regDeadline"
            value={formData.regDeadline}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Disability Type:</label>
          <input
            type="text"
            name="disabilityType"
            value={formData.disabilityType}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Accepted Level of Disability:</label>
          <input
            type="text"
            name="acceptedLevelOfDisability"
            value={formData.acceptedLevelOfDisability}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default PostJobByRecruiter;


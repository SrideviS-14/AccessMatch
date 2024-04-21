import React, { useState, useEffect } from 'react';
import axios from 'axios';


function ApplyJobByJobSeeker() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [softSkills, setSoftSkills] = useState('');
    const [technicalSkills, setTechnicalSkills] = useState('');
    const [detailsFetched, setDetailsFetched] = useState(false);

    useEffect(() => {
        fetchJobSeekerDetails(); // Fetch job seeker details when component mounts
    }, []);

    const fetchJobSeekerDetails = async () => {
        try {
            // Fetch job seeker details from the backend
            const response = await axios.get('/jobSeeker/details');
            const { name, email, phoneNumber } = response.data;
            setName(name);
            setEmail(email);
            setPhoneNumber(phoneNumber);
            setDetailsFetched(true); // Set flag to indicate details are fetched
        } catch (error) {
            console.error('Error fetching job seeker details:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!softSkills || !technicalSkills) {
            alert('Please fill in all required fields.');
            return;
        }
        try {
            // Send form data to backend for processing
            const response = await axios.post('/apply-job', {
                name,
                email,
                phoneNumber,
                softSkills,
                technicalSkills
            });
            // Handle response
        } catch (error) {
            console.error('Error applying for job:', error);
        }
    };

    if (!detailsFetched) {
        // Render a loading message while details are being fetched
        return <div>Loading...</div>;
    }

    return(
        <>
            <h1>Apply for a job</h1>
            <form onSubmit={handleSubmit} className="form-container">
                <div>
                    <span>Name: {name}</span>
                </div>
                <div>
                    <span>Email: {email}</span>
                </div>
                <div>
                    <span>Phone Number: {phoneNumber}</span>
                </div>
                <label>
                    Soft Skills:
                    <input
                        type="text"
                        value={softSkills}
                        onChange={(e) => setSoftSkills(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Technical Skills:
                    <input
                        type="text"
                        value={technicalSkills}
                        onChange={(e) => setTechnicalSkills(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Apply</button>
            </form>
        </>
    );
}

export default ApplyJobByJobSeeker;

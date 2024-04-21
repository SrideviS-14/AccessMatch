const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { JobSeeker, Recruiter, JobOpenings } = require('./Models/models');
const path = require('path'); // Import path module for handling file paths

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://sridevi:Srsv%400714@amcluster.f44qfxs.mongodb.net/AccessMatch');

// Serve static files from the 'build' directory in the frontend
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Handle requests to the root URL and serve the 'index.html' file from the frontend 'build' directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Job Seeker Login Route
app.post('/jobSeeker/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const jobSeeker = await JobSeeker.findOne({ Email_id: email, Password: password });

        if (!jobSeeker) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Here you can add additional logic for user authentication,
        // such as generating a JWT token for authentication

        res.status(200).json({ message: "Login successful", user: jobSeeker });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Recruiter Login Route
app.post('/recruiter/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const recruiter = await Recruiter.findOne({ Email_id: email, Password: password });

        if (!recruiter) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Here you can add additional logic for user authentication,
        // such as generating a JWT token for authentication

        res.status(200).json({ message: "Login successful", user: recruiter });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Registration Route
app.post('/register', async (req, res) => {
    try {
        const { username, email, password, confirmPassword, userType } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        if (userType === 'jobSeeker') {
            const jobSeeker = new JobSeeker({ Name: username, Email_id: email, Password: password });
            await jobSeeker.save();
            res.status(201).json({ message: "Job Seeker registered successfully" });
        } else if (userType === 'recruiter') {
            const recruiter = new Recruiter({ Name: username, Email_id: email, Password: password });
            await recruiter.save();
            res.status(201).json({ message: "Recruiter registered successfully" });
        } else {
            res.status(400).json({ message: "Invalid user type" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Handle submission of job details form
app.post('/jobOpening/add', async (req, res) => {
    try {
        const { email, companyName, jobTitle, jobDescription, numberOfOpenings } = req.body;

        // Check if the recruiter exists
        const recruiter = await Recruiter.findOne({ Email_id: email });
        if (!recruiter) {
            return res.status(400).json({ message: "Recruiter not found" });
        }

        // Create a new job opening
        const jobOpening = new JobOpenings({
            recruiterEmail: email,
            companyName,
            jobTitle,
            jobDescription,
            numberOfOpenings
        });

        // Save the job opening to the database
        await jobOpening.save();

        res.status(201).json({ message: "Job opening added successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// New route to fetch all job openings or filter by job title
app.get('/jobOpening/all', async (req, res) => {
    try {
        const { searchTerm } = req.query;
        let jobs;

        if (searchTerm && searchTerm.trim() !== '') {
            // If searchTerm is provided, filter jobs by jobTitle containing the searchTerm
            jobs = await JobOpenings.find({ jobTitle: { $regex: searchTerm, $options: 'i' } });
        } else {
            // If no searchTerm provided, fetch all jobs
            jobs = await JobOpenings.find();
        }

        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// New route to fetch all company names
app.get('/jobOpening/allCompanies', async (req, res) => {
    try {
        const { searchTerm } = req.query;
        let companies
        if (searchTerm && searchTerm.trim() !== '') {
            companies = await JobOpenings.find( { companyName: { $regex: searchTerm, $options: 'i'}});
        }
        else {
            companies = await JobOpenings.distinct('companyName');  
        }
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// New route to fetch job seeker details
app.get('/jobSeeker/details', async (req, res) => {
    try {
        // Assuming you have some way to identify the current job seeker, like a session or token
        const jobSeekerId = req.user.id; // Example: get job seeker ID from session or token
        const jobSeeker = await JobSeeker.findById(jobSeekerId);
        if (!jobSeeker) {
            return res.status(404).json({ message: "Job seeker not found" });
        }
        res.status(200).json({
            name: jobSeeker.Name,
            email: jobSeeker.Email_id,
            phoneNumber: jobSeeker.Phone_number
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

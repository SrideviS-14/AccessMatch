const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { JobSeeker, Recruiter } = require('./Models/models');
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

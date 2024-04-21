const mongoose = require('mongoose')

const jobSeekerSchema = new mongoose.Schema({
    Name: String,
    Email_id: String,
    Phone_number: String,
    Password: String
})
const recruiterSchema = new mongoose.Schema({
    Name: String,
    Email_id: String,
    Phone_number: String,
    Password: String
})
const jobOpeningSchema = new mongoose.Schema({
    recruiterEmail: {
        type: String,
        ref: 'Recruiter' // References the Recruiter model
    },
    companyName: String,
    jobTitle: String,
    jobDescription: String,
    numberOfOpenings: Number
});
const JobSeeker = mongoose.model("JobSeeker", jobSeekerSchema)
const Recruiter = mongoose.model("Recruiter", recruiterSchema)
const JobOpenings = mongoose.model("JobOpenings", jobOpeningSchema);
module.exports = {JobSeeker, Recruiter, JobOpenings};

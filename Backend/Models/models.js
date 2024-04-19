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

const JobSeeker = mongoose.model("JobSeeker", jobSeekerSchema)
const Recruiter = mongoose.model("Recruiter", recruiterSchema)
module.exports = {JobSeeker, Recruiter};

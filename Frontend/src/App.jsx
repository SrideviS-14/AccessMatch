import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './components/Register/Register';
import JobSeekerLogin from './components/Login/JobSeekerLogin';
import RecruiterLogin from './components/Login/RecruiterLogin';
import JobFinder from './components/JobFinder/JobFinder';
import ShortlistCandidate from './components/ShortlistCandidate/ShortlistCandidate';
import PostJobByRecruiter from './components/PostJob/PostJobByRecruiter';

function App() {
  return (
    <>
    <Router>
      <div>
        <h1>AccessMatch</h1>
        <ul>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/JobSeekerLogin">Job Seeker Login</Link></li>
        <li><Link to="/RecruiterLogin">Recruiter Login</Link></li>
        </ul>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/JobSeekerLogin" element={<JobSeekerLogin/>} />
          <Route path="/RecruiterLogin" element={<RecruiterLogin/>} />
          <Route path="/jobFinder" element={<JobFinder/>} /> {/* Define the /jobFinder route */}
          <Route path="/shortlistCandidate" element={<ShortlistCandidate/>} />
          <Route path="/postJobByRecruiter" element={<PostJobByRecruiter/>} />
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;

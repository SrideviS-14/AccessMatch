import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register/Register';
import JobSeekerLogin from './components/Login/JobSeekerLogin';
import RecruiterLogin from './components/Login/RecruiterLogin';
import JobFinder from './components/JobFinder/JobFinder';
import ShortlistCandidate from './components/ShortlistCandidate/ShortlistCandidate';
import PostJobByRecruiter from './components/PostJob/PostJobByRecruiter';
import ApplyJobByJobSeeker from './components/ApplyJob/ApplyJobByJobSeeker';
import JobSeekerHome from './components/Home/JobSeekerHome';
import Main from './components/Main';
import RecruiterHome from './components/Home/RecruiterHome';

function App() {
  const user = localStorage.getItem("token");
  return (
    <>
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<Main/>}/>
          {user && <Route path='/JobSeekerHome' exact element={<JobSeekerHome/>}/>}
          {user && <Route path='/RecruiterHome' exact element={<RecruiterHome/>}/>}
          <Route path="/JobSeekerHome" element={<Navigate replace to="/JobSeekerLogin" />} />
          <Route path="/RecruiterHome" element={<Navigate replace to="/RecruiterLogin" />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/JobSeekerLogin" element={<JobSeekerLogin/>} />
          <Route path="/RecruiterLogin" element={<RecruiterLogin/>} />
          <Route path="/jobFinder" element={<JobFinder/>} /> {/* Define the /jobFinder route */}
          <Route path="/shortlistCandidate" element={<ShortlistCandidate/>} />
          <Route path="/postJobByRecruiter" element={<PostJobByRecruiter/>} />
          <Route path="/applyToJob" element={<ApplyJobByJobSeeker/>} />
        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;









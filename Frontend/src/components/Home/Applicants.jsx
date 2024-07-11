import React, { useState, useEffect } from 'react';
import logo from '../../Assets/logo.png';
import axios from 'axios';
import chat from '../../Assets/chat.png';

function Applicants({ email }) {

  return (
    <div className="Applicants">
      <div className="cont">
        <img className="image" src={logo} alt="Logo" />
        <h1>ACCESS MATCH</h1>
      </div>
      <h1>Applicants</h1>
     <div className="jobContainer">
     <div className="job-card" style={{ 
  textAlign:'left'
}}>
  <h3 >Applied By User: manu@gmail.com</h3>
  <p >Applied on: 17/06/2024</p>
  <p >Ability Category: <span style={{ fontWeight: 'bold' }}>Dyslexia</span> </p>
  <p >Ability Level: 3</p>
  <p >Soft Skills:
    <ol style={{ 
    paddingLeft: '20px', 
    textAlign: 'center',
    margin: '0 auto',
    width: 'fit-content',
    fontSize: '14px',
    marginBottom: '10px'
  }} >
      <li >Communication</li>
      <li >Teamwork</li>
      <li >Problem-solving</li>
    </ol>
  </p>
  <p >Technical Skills:
    <ol style={{ 
    paddingLeft: '20px', 
    textAlign: 'center',
    margin: '0 auto',
    width: 'fit-content',
    fontSize: '14px',
    marginBottom: '10px'
  }} >
      <li >JavaScript</li>
      <li >React</li>
      <li >MongoDB</li>
      <li>HTML</li>
      <li>Express</li>
    </ol>
  </p>
</div>

        <div className="job-card">
        <h3>Applied By User: john.doe@gmail.com</h3>
<p>Applied on: 15/07/2024</p>
<p>Ability Category: <span style={{ fontWeight: 'bold' }}>Autism</span></p>
<p>Ability Level: 2 </p>
<p>Soft Skills:
    <ol style={{ 
    paddingLeft: '20px', 
    textAlign: 'center',
    margin: '0 auto',
    width: 'fit-content',
    fontSize: '14px',
    marginBottom: '10px'
  }}>
        <li>Adaptability</li>
        <li>Work Ethic</li>
        <li>Time Management</li>
    </ol>
</p>
<p>Technical Skills:
    <ol style={{ 
    paddingLeft: '20px', 
    textAlign: 'center',
    margin: '0 auto',
    width: 'fit-content',
    fontSize: '14px',
    marginBottom: '10px'
  }}>
        <li>Python</li>
        <li>Django</li>
        <li>PostgreSQL</li>
        <li>JavaScript</li>
        <li>Docker</li>
    </ol>
</p>

        </div>
        <div className="job-card">
        <h3>Applied By User: jane.smith@gmail.com</h3>
<p>Applied on: 10/07/2024</p>
<p>Ability Category: <span style={{ fontWeight: 'bold' }}>ADHD</span> </p>
<p>Ability Level: 1 </p>
<p>Soft Skills:
    <ol style={{ 
    paddingLeft: '20px', 
    textAlign: 'center',
    margin: '0 auto',
    width: 'fit-content',
    fontSize: '14px',
    marginBottom: '10px'
  }}>
        <li>Leadership</li>
        <li>Creativity</li>
        <li>Empathy</li>
    </ol>
</p>
<p>Technical Skills:
    <ol style={{ 
    paddingLeft: '20px', 
    textAlign: 'center',
    margin: '0 auto',
    width: 'fit-content',
    fontSize: '14px',
    marginBottom: '10px'
  }}>
        <li>Java</li>
        <li>Spring Boot</li>
        <li>MySQL</li>
        <li>Angular</li>
        <li>Kubernetes</li>
    </ol>
</p>

        </div>
        <div className="job-card">
        <h3>Applied By User: david.lee@gmail.com</h3>
<p>Applied on: 05/07/2024</p>
<p>Ability Category: <span style={{ fontWeight: 'bold' }}>Blindness </span> </p>
<p>Ability Level: 4</p>
<p>Soft Skills:
    <ol style={{ 
    paddingLeft: '20px', 
    textAlign: 'center',
    margin: '0 auto',
    width: 'fit-content',
    fontSize: '14px',
    marginBottom: '10px'
  }}>
        <li>Critical Thinking</li>
        <li>Teamwork</li>
        <li>Flexibility</li>
    </ol>
</p>
<p>Technical Skills:
    <ol style={{ 
    paddingLeft: '20px', 
    textAlign: 'center',
    margin: '0 auto',
    width: 'fit-content',
    fontSize: '14px',
    marginBottom: '10px'
  }}>
        <li>Ruby</li>
        <li>Rails</li>
        <li>Redis</li>
        <li>JavaScript</li>
        <li>GraphQL</li>
    </ol>
</p>

        </div>
        <div className="job-card">
        <h3>Applied By User: emily.jones@gmail.com</h3>
<p>Applied on: 02/07/2024</p>
<p>Ability Category: <span style={{ fontWeight: 'bold' }}>Hearing Impairment </span> </p>
<p>Ability Level: 3</p>
<p>Soft Skills:
    <ol style={{ 
    paddingLeft: '20px', 
    textAlign: 'center',
    margin: '0 auto',
    width: 'fit-content',
    fontSize: '14px',
    marginBottom: '10px'
  }}>
        <li>Communication</li>
        <li>Problem-solving</li>
        <li>Time Management</li>
    </ol>
</p>
<p>Technical Skills:
    <ol style={{ 
    paddingLeft: '20px', 
    textAlign: 'center',
    margin: '0 auto',
    width: 'fit-content',
    fontSize: '14px',
    marginBottom: '10px'
  }}>
        <li>C#</li>
        <li>.NET</li>
        <li>SQL Server</li>
        <li>Azure</li>
        <li>JavaScript</li>
    </ol>
</p>

        </div>
        <div className="job-card">
        <h3>Applied By User: michael.brown@gmail.com</h3>
<p>Applied on: 25/06/2024</p>
<p>TAbility Category: <span style={{ fontWeight: 'bold' }}>Mobility Impairment</span> </p>
<p>Ability Level: 5</p>
<p>Soft Skills:
    <ol style={{ 
    paddingLeft: '20px', 
    textAlign: 'center',
    margin: '0 auto',
    width: 'fit-content',
    fontSize: '14px',
    marginBottom: '10px'
  }}>
        <li>Leadership</li>
        <li>Work Ethic</li>
        <li>Adaptability</li>
    </ol>
</p>
<p>Technical Skills:
    <ol style={{ 
    paddingLeft: '20px', 
    textAlign: 'center',
    margin: '0 auto',
    width: 'fit-content',
    fontSize: '14px',
    marginBottom: '10px'
  }}>
        <li>PHP</li>
        <li>Laravel</li>
        <li>MariaDB</li>
        <li>JavaScript</li>
        <li>Vue.js</li>
    </ol>
</p>

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

export default Applicants;


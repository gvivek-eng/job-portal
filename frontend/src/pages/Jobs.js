import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/jobs')
      .then(res => setJobs(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Available Jobs</h2>
      {jobs.length === 0 && <p>No jobs posted yet.</p>}
      {jobs.map(job => (
        <div key={job._id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '1.5rem', marginBottom: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h3 style={{ margin: '0 0 0.5rem' }}>{job.title}</h3>
          <p style={{ margin: '0 0 0.25rem', color: '#666' }}>{job.company} — {job.location}</p>
          <p style={{ margin: '0 0 0.25rem' }}>{job.description}</p>
          <p style={{ margin: '0 0 0.25rem', color: 'green', fontWeight: 'bold' }}>{job.salary}</p>
          <span style={{ background: '#2c3e50', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem' }}>
            {job.jobType}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Jobs;
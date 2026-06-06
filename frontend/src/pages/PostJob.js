import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {
  const [form, setForm] = useState({ title: '', company: '', location: '', description: '', salary: '', jobType: 'full-time' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/jobs', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '3rem auto', padding: '2rem', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Post a Job</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {['title', 'company', 'location', 'salary'].map(field => (
          <input key={field} name={field} placeholder={field.charAt(0).toUpperCase() + field.slice(1)} onChange={handleChange} required
            style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
        ))}
        <textarea name="description" placeholder="Job Description" onChange={handleChange} required rows="4"
          style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
        <select name="jobType" onChange={handleChange}
          style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box' }}>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="internship">Internship</option>
          <option value="remote">Remote</option>
        </select>
        <button type="submit"
          style={{ width: '100%', padding: '0.75rem', background: '#2c3e50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' }}>
          Post Job
        </button>
      </form>
    </div>
  );
};

export default PostJob;
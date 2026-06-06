import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'applicant' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '5rem auto', padding: '2rem', boxShadow: '0 0 10px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Register</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" onChange={handleChange} required
          style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required
          style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required
          style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box' }} />
        <select name="role" onChange={handleChange}
          style={{ width: '100%', padding: '0.75rem', marginBottom: '1rem', borderRadius: '4px', border: '1px solid #ddd', boxSizing: 'border-box' }}>
          <option value="applicant">Applicant</option>
          <option value="recruiter">Recruiter</option>
        </select>
        <button type="submit"
          style={{ width: '100%', padding: '0.75rem', background: '#2c3e50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' }}>
          Register
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '1rem' }}>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
};

export default Register;
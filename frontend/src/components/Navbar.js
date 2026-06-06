import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav style={{ background: '#2c3e50', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'bold' }}>
        JobPortal
      </Link>
      <div style={{ display: 'flex', gap: '1rem' }}>
        {token ? (
          <>
            <span style={{ color: 'white' }}>Hi, {user.name}</span>
            {user.role === 'recruiter' && (
              <Link to="/post-job" style={{ color: 'white', textDecoration: 'none' }}>Post Job</Link>
            )}
            <button onClick={logout} style={{ background: 'red', color: 'white', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer', borderRadius: '4px' }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
            <Link to="/register" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Jobs from './pages/Jobs';
import Login from './pages/Login';
import Register from './pages/Register';
import PostJob from './pages/PostJob';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Jobs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post-job" element={<PostJob />} />
      </Routes>
    </Router>
  );
}

export default App;
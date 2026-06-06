const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const authMiddleware = require('../middleware/authMiddleware');

// Get all jobs (public)
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().populate('recruiter', 'name email');
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Post a job (recruiter only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'recruiter') {
      return res.status(403).json({ message: 'Only recruiters can post jobs' });
    }
    const { title, company, location, description, salary, jobType } = req.body;
    const job = await Job.create({
      title, company, location, description, salary, jobType,
      recruiter: req.user.id
    });
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete a job (recruiter only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.recruiter.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await job.deleteOne();
    res.json({ message: 'Job deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
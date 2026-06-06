const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const authMiddleware = require('../middleware/authMiddleware');

// Apply for a job
router.post('/:jobId', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'applicant') {
      return res.status(403).json({ message: 'Only applicants can apply' });
    }

    const existing = await Application.findOne({
      job: req.params.jobId,
      applicant: req.user.id
    });

    if (existing) {
      return res.status(400).json({ message: 'Already applied for this job' });
    }

    const application = await Application.create({
      job: req.params.jobId,
      applicant: req.user.id
    });

    res.status(201).json({ message: 'Applied successfully!', application });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get my applications (applicant)
router.get('/my', authMiddleware, async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user.id })
      .populate('job', 'title company location salary');
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authm');
const Task = require('../models/Task');  


router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});


router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, description, dueDate, status } = req.body;
    
    // Validation
    if (!title || !dueDate) {
      return res.status(400).json({ msg: 'Title and due date are required' });
    }

    // Create task with user reference
    const newTask = new Task({
      title,
      description,
      dueDate,
      status,
      user: req.user.id  
    });

    await newTask.save();
    res.status(201).json(newTask);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});


module.exports = router;

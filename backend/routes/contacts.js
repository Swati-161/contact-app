const express = require('express');
const router = express.Router();
// Use Capital 'C' and singular 'Contact' for the Model
const Contact = require('../models/contacts');

// GET all contacts
router.get('/', async (req, res) => {
  try {
    // Use the Model 'Contact' to find the data
    // Bonus Task: Successfully sorting by newest first
    const contactsList = await Contact.find().sort({ createdAt: -1 });
    res.json(contactsList);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching contacts' });
  }
});

// POST new contact
router.post('/', async (req, res) => {
  try {
    // Requirement: Store contact data in MongoDB
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    res.status(201).json(savedContact); // Status 201 = Created
  } catch (err) {
    res.status(400).json({ error: 'Validation failed. Check required fields.' });
  }
});

// DELETE contact (Bonus Task)
router.delete('/:id', async (req, res) => {
  try {
    // Bonus Requirement: Implement delete functionality
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

router.get('/test-connection', (req, res) => {
  res.status(200).json({ 
    message: "✅ Backend is reachable!",
    timestamp: new Date().toISOString() 
  });
});

module.exports = router;

// Importing modules
const path = require('path');
const express = require('express');
const router = express.Router();

// GET route for serving the notes.html page
// This route will be triggered when the user navigates to the /notes endpoint
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// If no matching route is found (i.e., not /notes), default to the index.html page
// This is a catch-all route to serve the landing page
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Exporting the router so it can be mounted in the server.js file
module.exports = router;

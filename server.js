
// Importing the express module
const express = require('express');
const path = require('path');

// Importing fs module to work with the file system
const fs = require('fs');

// Setting up the Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Importing route modules
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// Use apiRoutes and htmlRoutes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// If no matching route is found, default to the home page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// Starts the server to begin listening
app.listen(PORT, () => {
  console.log(`Note Taker app is listening on PORT: ${PORT}`);
});

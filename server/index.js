// Importing the Modules
require('dotenv').config();
const express = require('express');
const path = require('path');
const router = require('../routes/userApi');
require('../models/db/conn');

// Initializing Express App
const app = express();

// Middleware to recognize incoming data as JSON object
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setting the PORT
const port = process.env.PORT || 3000;

// Using in-built middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

// Using the router from the separate file => User-defined Middleware
app.use('/api/users', router);

// Listening Request at the port
app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server running at PORT ${port}`);
});

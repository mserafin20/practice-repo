const express = require('express');

// Import groceries routes
const groceryRouter = require('./groceries');

const app = express();

// All the routes for groceries are /groceries 
// This is added to the previous /api route in the server.js file
app.use('/groceries', groceryRouter);

module.exports = app;

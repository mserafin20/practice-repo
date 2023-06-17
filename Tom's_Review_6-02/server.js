const express = require('express');
const path = require('path');
// The require is just the routes folder and not a specific file.
// If you just require or import a folder, it defaults to the index.js in that folder
const api = require('./routes');

// process.env.PORT needs to be used for Heroku connection
const PORT = process.env.PORT || 6969;
const app = express();

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// All routes will begin with /api and then you look in the routes/index.js file from there.
app.use('/api', api);

// Serve the public folder to the user
app.use(express.static('public'));

// GET route for homepage
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Wildcard route to direct users to homepage
app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// Starts the server
app.listen(PORT, () => 
    console.log(`App listening at http://localhost:${PORT}`)
);
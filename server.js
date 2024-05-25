const express = require('express');
require('dotenv').config();
const { connectionDB } = require('./database/config');

// Express server
const app = express();

// Port
const port = process.env.PORT || 3000;

// Database connection
connectionDB();

// Read and parse the body of the request
app.use(express.json());

// Routes

// Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port} 🚀`);
});

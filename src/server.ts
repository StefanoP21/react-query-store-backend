import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { connectionDB } from './database/config';

// Dotenv
dotenv.config();

// Express server
const app = express();

// Port
const port = process.env.PORT ?? 3001;

// Database connection
connectionDB();

// CORS
app.use(cors());

// Read and parse the body of the request
app.use(express.json());

// Routes
app.use('/api/products', require('./routes/products'));

// Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port} 🚀`);
});

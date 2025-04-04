import express from 'express';
import cors from 'cors';
import corsOptions from './config/corsConfig';

const app = express();

// Apply CORS middleware globally
app.use(cors(corsOptions));

// Ensure preflight requests are handled
app.options('*', cors(corsOptions));

// Other middleware and routes
app.use(express.json());

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

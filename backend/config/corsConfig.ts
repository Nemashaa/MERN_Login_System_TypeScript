/*import { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
  origin: ['http://localhost:5174'], // Allow requests from the frontend's origin
  credentials: true, // Allow cookies to be sent with requests
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
};

export default corsOptions;*/

import { CorsOptions } from 'cors';

const allowedOrigins = [
  'https://splendorous-longma-229589.netlify.app', // Remove trailing slash
];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies
};

export default corsOptions;
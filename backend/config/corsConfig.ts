import { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
  //origin: ['http://localhost:5174'], // Allow requests from the frontend's origin
  origin: ['https://splendorous-longma-229589.netlify.app'],
  credentials: true, // Allow cookies to be sent with requests
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
};

export default corsOptions;


import { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'https://splendorous-longma-229589.netlify.app', // Main production URL
      /\.netlify\.app$/, // Allow all Netlify preview URLs
    ];

    if (!origin || allowedOrigins.some((allowedOrigin) => origin.match(allowedOrigin))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies to be sent with requests
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
};

export default corsOptions;


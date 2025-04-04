import { CorsOptions } from 'cors';

const allowedOrigins = [
  'https://splendorous-longma-229589.netlify.app',
  'https://67ed09f497fd2a0062f3a8f7--splendorous-longma-229589.netlify.app',
  'https://67ed0f9d97fd2a08c8f3a673--splendorous-longma-229589.netlify.app',
  'https://67ef957afd31f530c5c9ce63--splendorous-longma-229589.netlify.app', // Ensure this origin is added
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
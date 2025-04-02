import { CorsOptions } from 'cors';

const allowedOrigins = [
  'https://splendorous-longma-229589.netlify.app',
  'https://67ed09f497fd2a0062f3a8f7--splendorous-longma-229589.netlify.app',
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

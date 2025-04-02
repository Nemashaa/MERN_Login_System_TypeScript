import { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
  origin: ['http://localhost:5174', 'https://splendorous-longma-229589.netlify.app'], // Allow both local and Netlify origins
  credentials: true, // Allow cookies
};

export default corsOptions;

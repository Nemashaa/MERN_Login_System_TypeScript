import { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
  origin: 'https://splendorous-longma-229589.netlify.app', // Allow both local and Netlify origins
  credentials: true, // Allow cookies
};

export default corsOptions;

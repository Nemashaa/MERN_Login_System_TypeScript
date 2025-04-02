import { CorsOptions } from 'cors';

const corsOptions: CorsOptions = {
  origin: 'http://localhost:5174', // Allow only the frontend running on port 5174
  credentials: true, // Allow cookies
};

export default corsOptions;
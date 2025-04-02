import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import corsOptions from './config/corsConfig';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes';
import postRoutes from './routes/postRoutes';
import errorHandler from './middlewares/errorHandler';
import logger from './utils/logger';
import morganLogger from './utils/morganLogger';

// Load environment variables
dotenv.config();

const app: Application = express();

// Use morganLogger middleware to log HTTP requests
app.use(morganLogger); // This will log all HTTP requests

// Database connection
mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => logger.info('Database Connected'))
  .catch((err) => logger.error(`Database Connection Failed: ${err.message}`));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.options('*', cors(corsOptions)); // Handle preflight requests
app.use(cors(corsOptions)); // Use the updated CORS configuration

// Routes
app.use('/', authRoutes);
app.use('/api', postRoutes); // Add post routes

// Global Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8001; // Backend is running on port 8001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// This is a test message
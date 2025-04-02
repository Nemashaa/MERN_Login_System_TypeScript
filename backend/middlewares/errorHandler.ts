import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger'; // Import the logger

interface CustomError extends Error {
  status?: number;
}

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction): void => {
  // Log the error stack using the logger
  logger.error(`Error occurred: ${err.stack || err}`);

  // Determine the status code and message
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  // Respond with the error
  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
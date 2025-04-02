import morgan, { TokenIndexer } from 'morgan';
import logger from './logger'; // Winston Logger
import { IncomingMessage, ServerResponse } from 'http'; // Use these types

// Create a custom Morgan format that logs via Winston
const morganLogger = morgan((tokens: TokenIndexer<IncomingMessage, ServerResponse>, req: IncomingMessage, res: ServerResponse): string | null => {
  const logMessage = [
    tokens.method(req, res), // Use IncomingMessage and ServerResponse
    tokens.url(req, res),
    tokens.status(req, res),
    tokens['response-time'](req, res) + ' ms', // Response time
  ].join(' ');

  // Log the HTTP request using Winston
  const statusCode = Number(tokens.status(req, res));
  if (statusCode >= 400) {
    logger.error(logMessage); // Log errors in red
  } else {
    logger.info(logMessage); // Log normal requests in green
  }

  return null; // Don't output to the console via Morgan itself
});

export default morganLogger;

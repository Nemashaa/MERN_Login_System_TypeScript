import winston, { Logform } from 'winston'; // Added Logform for type definitions
import colors from 'colors';

class Logger {
  private static instance: Logger;
  private logger: winston.Logger;

  private constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ level, message, timestamp }: Logform.TransformableInfo) => {
          const colorizedTimestamp = colors.cyan(timestamp as string); // Explicitly cast timestamp to string
          const colorizedLevel =
            level === 'info'
              ? colors.green(level.toUpperCase())
              : level === 'warn'
              ? colors.yellow(level.toUpperCase())
              : level === 'error'
              ? colors.red(level.toUpperCase())
              : colors.white(level.toUpperCase());

          return `${colorizedTimestamp} [${colorizedLevel}]: ${message}`;
        })
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/app.log' }) // Save logs to a file
      ],
    });
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public log(level: 'info' | 'warn' | 'error', message: string): void {
    this.logger.log({ level, message });
  }

  public info(message: string): void {
    this.logger.info(message);
  }

  public warn(message: string): void {
    this.logger.warn(message);
  }

  public error(message: string): void {
    this.logger.error(message);
  }
}

export default Logger.getInstance();

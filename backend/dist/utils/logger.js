"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston")); // Added Logform for type definitions
const colors_1 = __importDefault(require("colors"));
class Logger {
    constructor() {
        this.logger = winston_1.default.createLogger({
            level: 'info',
            format: winston_1.default.format.combine(winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.default.format.printf(({ level, message, timestamp }) => {
                const colorizedTimestamp = colors_1.default.cyan(timestamp); // Explicitly cast timestamp to string
                const colorizedLevel = level === 'info'
                    ? colors_1.default.green(level.toUpperCase())
                    : level === 'warn'
                        ? colors_1.default.yellow(level.toUpperCase())
                        : level === 'error'
                            ? colors_1.default.red(level.toUpperCase())
                            : colors_1.default.white(level.toUpperCase());
                return `${colorizedTimestamp} [${colorizedLevel}]: ${message}`;
            })),
            transports: [
                new winston_1.default.transports.Console(),
                new winston_1.default.transports.File({ filename: 'logs/app.log' }) // Save logs to a file
            ],
        });
    }
    static getInstance() {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    log(level, message) {
        this.logger.log({ level, message });
    }
    info(message) {
        this.logger.info(message);
    }
    warn(message) {
        this.logger.warn(message);
    }
    error(message) {
        this.logger.error(message);
    }
}
exports.default = Logger.getInstance();

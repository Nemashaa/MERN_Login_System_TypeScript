"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = __importDefault(require("./logger")); // Winston Logger
// Create a custom Morgan format that logs via Winston
const morganLogger = (0, morgan_1.default)((tokens, req, res) => {
    const logMessage = [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens['response-time'](req, res) + ' ms', // Response time
    ].join(' ');
    // Log the HTTP request using Winston
    const statusCode = Number(tokens.status(req, res));
    if (statusCode >= 400) {
        logger_1.default.error(logMessage); // Log errors in red
    }
    else {
        logger_1.default.info(logMessage); // Log normal requests in green
    }
    return null; // Don't output to the console via Morgan itself
});
exports.default = morganLogger;

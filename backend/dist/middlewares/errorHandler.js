"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../utils/logger")); // Import the logger
const errorHandler = (err, req, res, next) => {
    // Log the error stack using the logger
    logger_1.default.error(`Error occurred: ${err.stack || err}`);
    // Determine the status code and message
    const statusCode = err.status || 500;
    const message = err.message || 'Internal Server Error';
    // Respond with the error
    res.status(statusCode).json({
        success: false,
        message,
    });
};
exports.default = errorHandler;

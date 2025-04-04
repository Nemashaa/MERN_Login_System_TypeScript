"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const corsOptions = {
    origin: ['http://localhost:5174'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
};
exports.default = corsOptions;

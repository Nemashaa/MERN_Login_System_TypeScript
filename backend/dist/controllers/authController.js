"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.refreshAccessToken = exports.getProfile = exports.loginUser = exports.registerUser = exports.test = void 0;
const user_1 = __importDefault(require("../models/user"));
const auth_1 = require("../helpers/auth");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = __importDefault(require("../utils/logger"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
// Test Endpoint
const test = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info('Test endpoint accessed');
    res.json('Test is working');
}));
exports.test = test;
// Register Endpoint
const registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name) {
        logger_1.default.warn('Registration failed: Name is required');
        res.status(400).json({ error: 'Name is required' });
        return;
    }
    if (!password || password.length < 6) {
        logger_1.default.warn('Registration failed: Weak password');
        res.status(400).json({ error: 'Password should be at least 6 characters long' });
        return;
    }
    const exist = yield user_1.default.findOne({ email });
    if (exist) {
        logger_1.default.warn(`Registration failed: Email ${email} already taken`);
        res.status(400).json({ error: 'Email is already taken' });
        return;
    }
    const hashedPassword = yield (0, auth_1.hashPassword)(password);
    const user = yield user_1.default.create({ name, email, password: hashedPassword });
    logger_1.default.info(`New user registered: ${email}`);
    res.status(201).json(user);
}));
exports.registerUser = registerUser;
// Login Endpoint
const loginUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_1.default.findOne({ email });
    if (!user) {
        logger_1.default.warn(`Login failed: No user found with email ${email}`);
        res.status(404).json({ error: 'No user found' });
        return;
    }
    const match = yield (0, auth_1.comparePassword)(password, user.password);
    if (!match) {
        logger_1.default.warn(`Login failed: Incorrect password for email ${email}`);
        res.status(400).json({ error: 'Incorrect password' });
        return;
    }
    const accessToken = (0, auth_1.generateAccessToken)(user);
    const refreshToken = (0, auth_1.generateRefreshToken)(user);
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    });
    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
    });
    logger_1.default.info(`User logged in: ${email}`);
    res.json({ accessToken, user });
}));
exports.loginUser = loginUser;
// Refresh Token Endpoint
const refreshAccessToken = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        res.status(403).json({ error: 'Refresh token not found' });
        return;
    }
    jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
        if (err || !decoded || typeof decoded === 'string') {
            res.status(403).json({ error: 'Invalid refresh token' });
            return;
        }
        const newAccessToken = (0, auth_1.generateAccessToken)(decoded);
        res.json({ accessToken: newAccessToken });
    });
}));
exports.refreshAccessToken = refreshAccessToken;
// Logout Endpoint
const logoutUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    res.cookie('refreshToken', '', { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 0 });
    res.cookie('accessToken', '', { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 0 });
    logger_1.default.info(`User logged out: ${((_a = req.user) === null || _a === void 0 ? void 0 : _a._id) || 'Unknown user'}`);
    res.json({ success: true, message: 'Logged out successfully' });
}));
exports.logoutUser = logoutUser;
// Get Profile Endpoint
const getProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accessToken } = req.cookies;
    if (!accessToken) {
        res.status(401).json({ success: false, message: 'No token provided' });
        return;
    }
    jsonwebtoken_1.default.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err || !decoded || typeof decoded === 'string') {
            if ((err === null || err === void 0 ? void 0 : err.name) === 'TokenExpiredError') {
                logger_1.default.warn('Profile access failed: Access token expired');
                res.status(403).json({ success: false, message: 'Access token expired' });
                return;
            }
            logger_1.default.warn('Profile access failed: Invalid access token');
            res.status(403).json({ success: false, message: 'Invalid token' });
            return;
        }
        logger_1.default.info(`Profile accessed for user ID: ${decoded._id}`);
        res.json(decoded);
    });
}));
exports.getProfile = getProfile;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    var _a;
    const accessToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken;
    if (!accessToken) {
        console.warn('Unauthorized: No token provided');
        res.status(401).json({ success: false, message: 'Unauthorized - No token provided' });
        return;
    }
    jsonwebtoken_1.default.verify(accessToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                console.warn('Access token expired');
                res.status(403).json({ success: false, message: 'Access token expired' });
                return;
            }
            console.warn('Invalid token:', err.message);
            res.status(403).json({ success: false, message: 'Invalid token' });
            return;
        }
        if (typeof decoded === 'string' || !decoded) {
            console.warn('Invalid token payload');
            res.status(403).json({ success: false, message: 'Invalid token payload' });
            return;
        }
        console.log('Token verified for user:', decoded);
        req.user = decoded;
        next();
    });
};
exports.default = authMiddleware;

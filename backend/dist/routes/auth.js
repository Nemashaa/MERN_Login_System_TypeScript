"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/logout', (req, res) => {
    try {
        res.cookie('accessToken', '', { httpOnly: true, sameSite: 'strict', maxAge: 0 });
        res.cookie('refreshToken', '', { httpOnly: true, sameSite: 'strict', maxAge: 0 });
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    }
    catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ error: 'Failed to log out' });
    }
});
exports.default = router;

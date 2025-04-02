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
exports.generateRefreshToken = exports.generateAccessToken = exports.comparePassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Function to hash password
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt_1.default.genSalt(12);
    return bcrypt_1.default.hash(password, salt);
});
exports.hashPassword = hashPassword;
// Function to compare passwords
const comparePassword = (password, hashed) => __awaiter(void 0, void 0, void 0, function* () {
    return bcrypt_1.default.compare(password, hashed);
});
exports.comparePassword = comparePassword;
// Function to generate access token
const generateAccessToken = (user) => {
    const options = {
        expiresIn: typeof process.env.ACCESS_TOKEN_EXPIRY === 'string'
            ? process.env.ACCESS_TOKEN_EXPIRY
            : '60s',
    };
    return jsonwebtoken_1.default.sign({ _id: String(user._id), email: user.email, name: user.name }, // Ensure `_id` is a string
    process.env.JWT_SECRET, options);
};
exports.generateAccessToken = generateAccessToken;
// Function to generate refresh token
const generateRefreshToken = (user) => {
    const options = {
        expiresIn: typeof process.env.REFRESH_TOKEN_EXPIRY === 'string'
            ? process.env.REFRESH_TOKEN_EXPIRY
            : '160m',
    };
    return jsonwebtoken_1.default.sign({ _id: String(user._id) }, // Ensure `_id` is a string
    process.env.JWT_REFRESH_SECRET, options);
};
exports.generateRefreshToken = generateRefreshToken;

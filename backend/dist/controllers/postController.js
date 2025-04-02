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
exports.deletePost = exports.updatePost = exports.getAllPosts = exports.createPost = void 0;
const post_1 = __importDefault(require("../models/post"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
// Create a new post
exports.createPost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, description } = req.body;
    const user = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id; // Use the extended `user` property
    if (!title || !description) {
        res.status(400).json({ error: 'Title and description are required' });
        return;
    }
    const post = yield post_1.default.create({ user, title, description });
    res.status(201).json(post);
}));
// Get all posts for the logged-in user
exports.getAllPosts = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const user = (_b = req.user) === null || _b === void 0 ? void 0 : _b._id; // Use the extended `user` property
    const posts = yield post_1.default.find({ user }).sort({ createdAt: -1 });
    res.status(200).json(posts);
}));
// Update a post
exports.updatePost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { postID } = req.params;
    const { title, description } = req.body;
    const post = yield post_1.default.findOneAndUpdate({ postID, user: (_c = req.user) === null || _c === void 0 ? void 0 : _c._id }, // Use the extended `user` property
    { title, description }, { new: true });
    if (!post) {
        res.status(404).json({ error: 'Post not found' });
        return;
    }
    res.status(200).json(post);
}));
// Delete a post
exports.deletePost = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const { postID } = req.params;
    const post = yield post_1.default.findOneAndDelete({ postID, user: (_d = req.user) === null || _d === void 0 ? void 0 : _d._id }); // Use the extended `user` property
    if (!post) {
        res.status(404).json({ error: 'Post not found' });
        return;
    }
    res.status(200).json({ message: 'Post deleted successfully' });
}));

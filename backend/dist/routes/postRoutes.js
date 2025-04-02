"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = require("../controllers/postController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = express_1.default.Router();
router.post('/create/post', authMiddleware_1.default, postController_1.createPost);
router.get('/posts', authMiddleware_1.default, postController_1.getAllPosts);
router.put('/update/post/:postID', authMiddleware_1.default, postController_1.updatePost);
router.delete('/delete/post/:postID', authMiddleware_1.default, postController_1.deletePost);
exports.default = router;

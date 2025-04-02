import express from 'express';
import { createPost, getAllPosts, updatePost, deletePost } from '../controllers/postController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/create/post', authMiddleware, createPost);
router.get('/posts', authMiddleware, getAllPosts);
router.put('/update/post/:postID', authMiddleware, updatePost);
router.delete('/delete/post/:postID', authMiddleware, deletePost);

export default router;

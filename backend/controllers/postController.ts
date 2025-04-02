import { Request, Response } from 'express';
import Post from '../models/post';
import asyncHandler from 'express-async-handler';

// Extend Request type to include `user`
export type AuthenticatedRequest = Request & {
  user?: { _id: string };
};

// Create a new post
export const createPost = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { title, description } = req.body;
  const user = req.user?._id; // Use the extended `user` property

  if (!title || !description) {
    res.status(400).json({ error: 'Title and description are required' });
    return;
  }

  const post = await Post.create({ user, title, description });
  res.status(201).json(post);
});

// Get all posts for the logged-in user
export const getAllPosts = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const user = req.user?._id; // Use the extended `user` property
  const posts = await Post.find({ user }).sort({ createdAt: -1 });
  res.status(200).json(posts);
});

// Update a post
export const updatePost = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { postID } = req.params;
  const { title, description } = req.body;

  const post = await Post.findOneAndUpdate(
    { postID, user: req.user?._id }, // Use the extended `user` property
    { title, description },
    { new: true }
  );

  if (!post) {
    res.status(404).json({ error: 'Post not found' });
    return;
  }

  res.status(200).json(post);
});

// Delete a post
export const deletePost = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { postID } = req.params;

  const post = await Post.findOneAndDelete({ postID, user: req.user?._id }); // Use the extended `user` property

  if (!post) {
    res.status(404).json({ error: 'Post not found' });
    return;
  }

  res.status(200).json({ message: 'Post deleted successfully' });
});

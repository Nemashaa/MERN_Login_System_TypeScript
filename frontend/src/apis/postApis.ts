import axios from 'axios';
import { Post } from "../interfaces/postsInterfaces";

export const fetchUserPosts = async (): Promise<Post[]> => {
  const { data } = await axios.get('/api/posts', { withCredentials: true });
  return data;
};

export const addPost = async (post: { title: string; description: string }): Promise<Post> => {
  const { data } = await axios.post('/api/create/post', post, { withCredentials: true });
  return data;
};

export const updatePost = async (postID: number, updatedData: { title: string; description: string }): Promise<Post> => {
  const { data } = await axios.put(`/api/update/post/${postID}`, updatedData, { withCredentials: true });
  return data;
};

export const deletePost = async (postID: number): Promise<{ message: string }> => {
  const { data } = await axios.delete(`/api/delete/post/${postID}`, { withCredentials: true });
  return data;
};

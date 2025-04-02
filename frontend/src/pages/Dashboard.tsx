import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import useAuthStore from "../store/authStore";
import { useUserPosts, useAddPost, useUpdatePost, useDeletePost } from '../hooks/usePosts'; // Correct hook
import '../styles/Dashboard.css';

export default function Dashboard() {
  const { user } = useAuthStore();
  const { data: posts, isLoading, isError } = useUserPosts(); // Correct hook for fetching posts
  const addPostMutation = useAddPost();
  const updatePostMutation = useUpdatePost();
  const deletePostMutation = useDeletePost();
  const navigate = useNavigate();

  const [postInput, setPostInput] = useState({ title: '', description: '' });
  const [editPostID, setEditPostID] = useState<number | null>(null); // Track the post being edited

  // Redirect to login if user is null
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleAddOrUpdatePost = () => {
    if (editPostID) {
      // Update post
      updatePostMutation.mutate({
        postID: editPostID,
        updatedData: { title: postInput.title, description: postInput.description },
      });
      setEditPostID(null); // Reset edit state
    } else {
      // Add new post
      addPostMutation.mutate(postInput);
    }
    setPostInput({ title: '', description: '' }); // Clear input fields
  };

  const handleEditPost = (postID: number, title: string, description: string) => {
    setEditPostID(postID); // Set the post ID being edited
    setPostInput({ title, description }); // Populate input fields with current post values
  };

  const handleDeletePost = (postID: number) => {
    deletePostMutation.mutate(postID);
  };

  if (isLoading) {
    return <MainLayout><div>Loading...</div></MainLayout>;
  }

  if (isError) {
    return <MainLayout><div>Error loading data</div></MainLayout>;
  }

  return (
    <MainLayout>
      <div className="dashboard-page">
        <h1>Dashboard</h1>
        {user && <h2>Hi {user.name}!</h2>}

        {/* Input Fields for Adding/Updating Posts */}
        <div className="add-task">
          <input
            className="task-input"
            type="text"
            placeholder="Title"
            value={postInput.title}
            onChange={(e) => setPostInput({ ...postInput, title: e.target.value })}
          />
          <input
            className="task-input"
            type="text"
            placeholder="Description"
            value={postInput.description}
            onChange={(e) => setPostInput({ ...postInput, description: e.target.value })}
          />
          <button className="add-btn" onClick={handleAddOrUpdatePost}>
            {editPostID ? 'Update Post' : 'Add Post'}
          </button>
        </div>

        {/* Posts Table */}
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts?.map((post) => (
              <tr key={post.postID}>
                <td>{post.title}</td>
                <td>{post.description}</td>
                <td>
                  <button
                    className="update-btn"
                    onClick={() => handleEditPost(post.postID, post.title, post.description)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeletePost(post.postID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
}
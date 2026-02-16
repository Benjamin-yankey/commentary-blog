import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./PostList.css";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/posts?page=${page}&limit=10`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch posts");
      }

      setPosts(data.posts);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading posts...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="post-list">
      <h1>All Posts</h1>
      {posts.length === 0 ? (
        <p>No posts yet. Be the first to create one!</p>
      ) : (
        <>
          <div className="posts">
            {posts.map((post) => (
              <div key={post.id} className="post-card">
                <h2>
                  <Link to={`/posts/${post.id}`}>{post.title}</Link>
                </h2>
                <p className="post-meta">
                  By {post.username} •{" "}
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
                <p className="post-excerpt">
                  {post.content.substring(0, 150)}...
                </p>
                <Link to={`/posts/${post.id}`} className="read-more">
                  Read More →
                </Link>
              </div>
            ))}
          </div>
          {pagination.pages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                Previous
              </button>
              <span>
                Page {page} of {pagination.pages}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === pagination.pages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostList;

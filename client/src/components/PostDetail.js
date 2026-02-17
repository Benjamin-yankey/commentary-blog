import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./PostDetail.css";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPost = React.useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5001/api/posts/${id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch post");
      }

      setPost(data.post);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  if (loading) return <div className="loading">Loading post...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!post) return <div className="error">Post not found</div>;

  return (
    <div className="post-detail">
      <Link to="/" className="back-link">
        ← Back to all posts
      </Link>
      <article>
        <h1>{post.title}</h1>
        <div className="post-meta">
          By {post.username} •{" "}
          {new Date(post.created_at).toLocaleDateString()}
        </div>
        <div className="post-content">{post.content}</div>
      </article>
    </div>
  );
};

export default PostDetail;

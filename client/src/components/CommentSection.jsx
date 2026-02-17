import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CommentSection = ({ postId }) => {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const token = localStorage.getItem('token');
  const currentUser = localStorage.getItem('username');

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/api/comments/post/${postId}`);
      setComments(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Fetch comments error:', err);
      setError('Failed to load comments');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      const response = await axios.post(
        `/api/comments/post/${postId}`,
        { content: newComment },
        { 
          headers: { Authorization: `Bearer ${token}` } 
        }
      );

      setComments([...comments, response.data]);
      setNewComment('');
      setSubmitting(false);
    } catch (err) {
      console.error('Post comment error:', err);
      // If 401, maybe token expired or not logged in
      if (err.response && err.response.status === 401) {
          navigate('/login');
      }
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;

    try {
      await axios.delete(`/api/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setComments(comments.filter(c => c.id !== commentId));
    } catch (err) {
      console.error('Delete comment error:', err);
    }
  };

  if (loading) return <div className="py-4 text-center text-[var(--text3)]">Loading comments...</div>;

  return (
    <div className="mt-12">
      <h3 className="text-[24px] mono font-bold text-[var(--text)] mb-6">
        Comments <span className="text-[var(--text3)]">({comments.length})</span>
      </h3>
      
      {/* Comment Input */}
      {token ? (
        <div className="card p-6 mb-8">
          <textarea 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full bg-[var(--bg3)] border border-[var(--border)] rounded-lg px-4 py-3 text-[14px] text-[var(--text)] outline-none focus:border-[var(--accent)] resize-none"
            rows={3}
            disabled={submitting}
          />
          <div className="flex justify-end mt-3">
            <button 
                onClick={handleSubmit} 
                className="btn btn-primary px-6 py-2 text-[13px]"
                disabled={submitting || !newComment.trim()}
            >
              {submitting ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center p-8 border border-[var(--border)] rounded-lg mb-8 bg-[var(--bg2)]">
          <p className="text-[var(--text2)] mb-4">Log in to join the discussion</p>
          <button onClick={() => navigate('/login')} className="btn btn-primary">
            Log In
          </button>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
            <p className="text-[var(--text3)] text-center italic">No comments yet. Be the first!</p>
        ) : (
            comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
                <img 
                  src={comment.avatar_url} 
                  alt={comment.username}
                  className="w-10 h-10 rounded-full border border-[var(--border)] mt-1"
                />
                
                <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-[14px] text-[var(--text)]">{comment.username}</span>
                    <span className="text-[12px] text-[var(--text3)] mono">
                        {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                    {currentUser === comment.username && (
                        <button 
                            onClick={() => handleDelete(comment.id)}
                            className="text-[10px] text-[var(--red)] border border-[var(--red)] px-1 rounded ml-2 hover:bg-[rgba(248,81,73,0.1)]"
                        >
                            DELETE
                        </button>
                    )}
                </div>
                <p className="text-[14px] text-[var(--text2)] mb-3 whitespace-pre-wrap">{comment.content}</p>
                </div>
            </div>
            ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';

const PostView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`/api/posts/${id}`);
      setPost(response.data);
      setLikeCount(Math.floor(Math.random() * 500) + 50);
      setLoading(false);
    } catch (err) {
      console.error('Fetch post error:', err);
      setError('Post not found');
      setLoading(false);
    }
  };

  const toggleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const formatContent = (text) => {
    if (!text) return '';
    
    // Simple markdown-like formatting
    let formatted = text
      .replace(/^## (.+)$/gm, '<h2 class="text-[24px] mono font-bold text-[var(--text)] mt-8 mb-4">$1</h2>')
      .replace(/^### (.+)$/gm, '<h3 class="text-[20px] mono font-bold text-[var(--text)] mt-6 mb-3">$1</h3>')
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-[var(--text)]">$1</strong>')
      .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
      .replace(/`([^`]+)`/g, '<code class="px-2 py-1 bg-[var(--bg3)] border border-[var(--border)] rounded text-[var(--accent)] mono text-[14px]">$1</code>')
      .replace(/```(\w+)?\n([\s\S]+?)```/g, '<pre class="bg-[var(--bg2)] border border-[var(--border)] rounded-lg p-4 overflow-x-auto my-6"><code class="text-[14px] mono text-[var(--text2)]">$2</code></pre>')
      .replace(/\n\n/g, '</p><p class="mb-4">');
    
    return `<p class="mb-4">${formatted}</p>`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
        <div className="text-center">
          <div className="text-[48px] mb-4">😕</div>
          <h2 className="text-[24px] mono font-bold text-[var(--text)] mb-4">Post Not Found</h2>
          <button onClick={() => navigate('/')} className="btn btn-primary">
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  const readTime = Math.max(1, Math.ceil((post.content?.length || 0) / 1000));

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Hero Image */}
      {post.image_url && (
        <div className="w-full h-[400px] relative overflow-hidden border-b border-[var(--border)]">
          <img 
            src={post.image_url} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent"></div>
        </div>
      )}

      {/* Content */}
      <article className="max-w-3xl mx-auto px-6 py-12">
        {/* Back Button */}
        <button onClick={() => navigate('/')} className="btn btn-ghost mb-8 text-[13px]">
          ← Back to Posts
        </button>

        {/* Category Badge */}
        {post.category && (
          <span className="inline-block px-3 py-1 bg-[var(--accent-glow)] border border-[rgba(0,255,157,0.3)] text-[var(--accent)] rounded-md text-[12px] mono font-bold uppercase mb-6">
            {post.category}
          </span>
        )}

        {/* Title */}
        <h1 className="text-[clamp(32px,5vw,56px)] mono font-[800] text-[var(--text)] leading-[1.1] tracking-[-2px] mb-6">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-4 pb-8 mb-8 border-b border-[var(--border)]">
          <img 
            src={post.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(post.username)}`}
            alt={post.username}
            className="w-12 h-12 rounded-full border-2 border-[var(--border)]"
          />
          <div className="flex-1">
            <div className="font-bold text-[16px] text-[var(--text)]">{post.username}</div>
            <div className="flex items-center gap-3 text-[13px] text-[var(--text3)] mono">
              <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              <span>·</span>
              <span>{readTime} min read</span>
              <span>·</span>
              <span>{likeCount} likes</span>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                liked 
                  ? 'bg-[rgba(248,81,73,0.1)] text-[var(--red)] border border-[var(--red)]' 
                  : 'bg-[var(--bg2)] text-[var(--text2)] border border-[var(--border)] hover:border-[var(--accent)]'
              }`}
            >
              <span>{liked ? '♥' : '♡'}</span>
              <span className="mono text-[13px] font-bold">{likeCount}</span>
            </button>
            <button className="btn btn-outline px-4 py-2 text-[13px]">
              💬 Comment
            </button>
          </div>
        </div>

        {/* Content */}
        <div 
          className="prose prose-invert max-w-none text-[17px] text-[var(--text2)] leading-[1.8]"
          dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
        />

        {/* Footer Actions */}
        <div className="mt-16 pt-8 border-t border-[var(--border)] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleLike}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
                liked 
                  ? 'bg-[rgba(248,81,73,0.1)] text-[var(--red)] border border-[var(--red)]' 
                  : 'bg-[var(--bg2)] text-[var(--text2)] border border-[var(--border)] hover:border-[var(--accent)]'
              }`}
            >
              <span className="text-[20px]">{liked ? '♥' : '♡'}</span>
              <span className="mono">{likeCount}</span>
            </button>
            <button className="btn btn-ghost px-6 py-3">
              💬 47 Comments
            </button>
            <button className="btn btn-ghost px-6 py-3">
              🔖 Save
            </button>
          </div>
          <button className="btn btn-ghost px-6 py-3">
            📤 Share
          </button>
        </div>

        {/* Author Card */}
        <div className="mt-12 card p-8">
          <div className="flex items-start gap-6">
            <img 
              src={post.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(post.username)}`}
              alt={post.username}
              className="w-20 h-20 rounded-full border-2 border-[var(--border)]"
            />
            <div className="flex-1">
              <h3 className="text-[20px] font-bold text-[var(--text)] mb-2">{post.username}</h3>
              <p className="text-[14px] text-[var(--text2)] mb-4">
                Developer, writer, and tech enthusiast. Passionate about sharing knowledge and building great software.
              </p>
              <button className="btn btn-outline px-6 py-2 text-[13px]">+ Follow</button>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-12">
          <h3 className="text-[24px] mono font-bold text-[var(--text)] mb-6">
            💬 Comments <span className="text-[var(--text3)]">(47)</span>
          </h3>
          
          {/* Comment Input */}
          <div className="card p-6 mb-8">
            <textarea 
              placeholder="Share your thoughts..."
              className="w-full bg-[var(--bg3)] border border-[var(--border)] rounded-lg px-4 py-3 text-[14px] text-[var(--text)] outline-none focus:border-[var(--accent)] resize-none"
              rows={3}
            />
            <div className="flex justify-end mt-3">
              <button className="btn btn-primary px-6 py-2 text-[13px]">Post Comment</button>
            </div>
          </div>

          {/* Sample Comments */}
          <div className="space-y-6">
            {[
              { author: 'devloop42', avatar: 'D', comment: 'Great article! This really helped me understand async/await better.', time: '2 hours ago', likes: 12 },
              { author: 'css_witch', avatar: 'C', comment: 'The code examples are super clear. Bookmarking this for future reference!', time: '5 hours ago', likes: 8 }
            ].map((comment, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--blue)] flex items-center justify-center font-bold mono text-[var(--bg)]">
                  {comment.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-[14px] text-[var(--text)]">{comment.author}</span>
                    <span className="text-[12px] text-[var(--text3)] mono">{comment.time}</span>
                  </div>
                  <p className="text-[14px] text-[var(--text2)] mb-3">{comment.comment}</p>
                  <div className="flex items-center gap-4 text-[13px]">
                    <button className="text-[var(--text3)] hover:text-[var(--accent)] transition">
                      ♡ {comment.likes}
                    </button>
                    <button className="text-[var(--text3)] hover:text-[var(--accent)] transition">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};

export default PostView;

import React from 'react';
import { Link } from 'react-router-dom';
import ImageWithFallback from './ImageWithFallback';

const PostCard = ({ post }) => {
  const getTagColor = (tag) => {
    if (!tag) return {};
    const lower = tag.toLowerCase();
    if (lower.includes('js') || lower.includes('javascript')) return { bg: 'rgba(227,179,65,0.12)', text: '#e3b341', border: 'rgba(227,179,65,0.2)' };
    if (lower.includes('react')) return { bg: 'rgba(88,166,255,0.12)', text: '#58a6ff', border: 'rgba(88,166,255,0.2)' };
    if (lower.includes('rust')) return { bg: 'rgba(255,166,87,0.1)', text: '#ffa657', border: 'rgba(255,166,87,0.2)' };
    if (lower.includes('python')) return { bg: 'rgba(0,255,157,0.08)', text: '#00ff9d', border: 'rgba(0,255,157,0.2)' };
    if (lower.includes('css')) return { bg: 'rgba(188,140,255,0.1)', text: '#bc8cff', border: 'rgba(188,140,255,0.2)' };
    if (lower.includes('ai')) return { bg: 'rgba(255,126,182,0.1)', text: '#ff7eb6', border: 'rgba(255,126,182,0.2)' };
    if (lower.includes('devops')) return { bg: 'rgba(248,81,73,0.1)', text: '#f85149', border: 'rgba(248,81,73,0.2)' };
    return { bg: 'rgba(110,118,129,0.1)', text: '#6e7681', border: 'rgba(110,118,129,0.2)' };
  };

  const tagStyle = getTagColor(post.category);

  return (
    <article className="card overflow-hidden group">
      {/* Media Overlay */}
      <Link to={`/posts/${post.id}`} className="block relative h-48 overflow-hidden border-b border-[var(--border)]">
        <ImageWithFallback 
          src={post.image_url} 
          alt={post.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
        {post.category && (
          <span 
            className="absolute top-4 left-4 px-3 py-1 rounded-md text-[11px] font-bold mono uppercase border"
            style={{ backgroundColor: tagStyle.bg, color: tagStyle.text, borderColor: tagStyle.border }}
          >
            {post.category}
          </span>
        )}
      </Link>

      <div className="p-6">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-4">
          <img 
            src={post.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(post.username)}`} 
            alt={post.username} 
            className="w-8 h-8 rounded-full border border-[var(--border)]"
          />
          <div className="text-[12px]">
            <span className="font-bold text-[var(--text)]">{post.username}</span>
            <span className="text-[var(--text3)] mx-1">·</span>
            <span className="text-[var(--text3)]">{new Date(post.created_at).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Title */}
        <Link to={`/posts/${post.id}`}>
          <h2 className="text-[18px] font-bold mono text-[var(--text)] mb-3 leading-tight group-hover:text-[var(--accent)] transition-colors">
            {post.title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="text-[14px] text-[var(--text2)] mb-6 line-clamp-2 min-h-[44px]">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-[var(--text3)] hover:text-[var(--red)] transition">
              <span>♡</span>
              <span className="text-[11px] mono">312</span>
            </button>
            <div className="flex items-center space-x-1 text-[var(--text3)]">
              <span>💬</span>
              <span className="text-[11px] mono">47</span>
            </div>
          </div>
          <span className="text-[11px] mono text-[var(--text3)]">8 min read</span>
        </div>
      </div>
    </article>
  );
};

export default PostCard;

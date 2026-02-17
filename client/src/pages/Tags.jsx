import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Tags = () => {
  const [tags, setTags] = useState([]);
  const [followedTags, setFollowedTags] = useState(new Set(['JavaScript', 'React']));
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await axios.get('/api/categories');
      setTags(response.data || []);
    } catch (err) {
      console.error('Failed to fetch tags:', err);
    }
  };

  const toggleFollow = (tagName) => {
    setFollowedTags(prev => {
      const newSet = new Set(prev);
      if (newSet.has(tagName)) {
        newSet.delete(tagName);
      } else {
        newSet.add(tagName);
      }
      return newSet;
    });
  };

  const getTagColor = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes('javascript')) return { color: '#e3b341', shadow: 'rgba(227,179,65,0.2)' };
    if (lower.includes('react')) return { color: '#58a6ff', shadow: 'rgba(88,166,255,0.2)' };
    if (lower.includes('rust')) return { color: '#ffa657', shadow: 'rgba(255,166,87,0.2)' };
    if (lower.includes('python')) return { color: '#00ff9d', shadow: 'rgba(0,255,157,0.2)' };
    if (lower.includes('css')) return { color: '#bc8cff', shadow: 'rgba(188,140,255,0.2)' };
    if (lower.includes('ai')) return { color: '#ff7eb6', shadow: 'rgba(255,126,182,0.2)' };
    if (lower.includes('devops')) return { color: '#f85149', shadow: 'rgba(248,81,73,0.2)' };
    if (lower.includes('typescript')) return { color: '#58a6ff', shadow: 'rgba(88,166,255,0.2)' };
    return { color: '#6e7681', shadow: 'rgba(110,118,129,0.2)' };
  };

  const filteredTags = tags.filter(tag => 
    tag.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header */}
      <div className="relative py-16 px-6 text-center border-b border-[var(--border)]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-radial-gradient from-[var(--accent-glow)] to-transparent opacity-30 z-0"></div>
        <div className="relative z-10">
          <h1 className="text-[40px] mono font-[800] mb-4">
            Browse <span className="text-[var(--accent)]">Tags</span>
          </h1>
          <p className="text-[18px] text-[var(--text2)] mb-8">
            Find posts on the topics you care about.
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tags..."
              className="w-full bg-[var(--bg3)] border border-[var(--border)] rounded-lg px-12 py-3 text-[14px] text-[var(--text)] focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent-glow2)] outline-none transition"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text3)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>

          <div className="mt-4 text-[13px] text-[var(--text3)]">
            <span className="mono text-[var(--accent)]">{followedTags.size}</span> tags followed
          </div>
        </div>
      </div>

      {/* Tags Grid */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTags.map((tag, index) => {
            const tagColor = getTagColor(tag.name);
            const isFollowing = followedTags.has(tag.name);
            
            return (
              <div 
                key={tag.id}
                className="card p-6 hover:shadow-xl transition-all duration-300 animate-up"
                style={{ 
                  animationDelay: `${index * 60}ms`,
                  borderColor: tagColor.color + '40'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 8px 32px ${tagColor.shadow}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <span className="text-[var(--text3)]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </span>
                  <span className="bg-[var(--bg3)] px-2 py-1 rounded text-[11px] mono text-[var(--text3)]">
                    {Math.floor(Math.random() * 5000) + 500} posts
                  </span>
                </div>

                {/* Tag Name */}
                <h3 className="text-[18px] mono font-bold mb-2" style={{ color: tagColor.color }}>
                  #{tag.name}
                </h3>

                {/* Description */}
                <p className="text-[13px] text-[var(--text2)] mb-6 line-clamp-2 min-h-[40px]">
                  {tag.description || `Explore ${tag.name} articles, tutorials, and deep-dives from the community.`}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => toggleFollow(tag.name)}
                    className={`px-4 py-2 rounded-lg text-[13px] font-semibold transition ${
                      isFollowing 
                        ? 'bg-[var(--accent-glow)] text-[var(--accent)] border border-[rgba(0,255,157,0.3)]'
                        : 'bg-[var(--bg3)] text-[var(--text2)] border border-[var(--border)] hover:border-[var(--accent)]'
                    }`}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </button>
                  <span className="text-[11px] text-[var(--text3)]">Trending</span>
                </div>
              </div>
            );
          })}
        </div>

        {filteredTags.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[var(--text3)] text-[16px]">No tags found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tags;

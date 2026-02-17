import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreatePost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [tags, setTags] = useState(['react']);
  const [tagInput, setTagInput] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [allowComments, setAllowComments] = useState(true);
  const [enableReactions, setEnableReactions] = useState(true);
  const [pinToProfile, setPinToProfile] = useState(false);
  const [activeFormats, setActiveFormats] = useState(new Set());
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [error, setError] = useState('');
  
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const contentRef = useRef(null);

  // Auto-resize textareas
  const autoResize = (ref) => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = ref.current.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    autoResize(titleRef);
  }, [title]);

  useEffect(() => {
    autoResize(subtitleRef);
  }, [subtitle]);

  useEffect(() => {
    autoResize(contentRef);
  }, [content]);

  // Auto-save
  useEffect(() => {
    if (title || content) {
      const timer = setTimeout(() => {
        setSaving(true);
        setTimeout(() => {
          setLastSaved(new Date());
          setSaving(false);
        }, 500);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [title, content, subtitle]);

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const handleCoverClick = () => {
    setCoverImage('https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=860&q=80');
  };

  const handleTagKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().toLowerCase().replace(/\s+/g, '-').replace(/^#/, '');
      if (!tags.includes(newTag) && tags.length < 5) {
        setTags([...tags, newTag]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const toggleFormat = (format) => {
    setActiveFormats(prev => {
      const newSet = new Set(prev);
      if (newSet.has(format)) {
        newSet.delete(format);
      } else {
        newSet.add(format);
      }
      return newSet;
    });
  };

  const loadSampleContent = () => {
    setContent(`## Introduction

In this article, we'll explore how modern JavaScript async patterns have evolved from callback hell to elegant async/await syntax.

## Why This Matters

As applications grow in complexity, managing asynchronous operations becomes critical. The evolution from callbacks to Promises to async/await has made our code more readable and maintainable.

\`\`\`javascript
// Old callback style
getData(function(a) {
  getMoreData(a, function(b) {
    getMoreData(b, function(c) {
      console.log(c);
    });
  });
});

// Modern async/await
const a = await getData();
const b = await getMoreData(a);
const c = await getMoreData(b);
console.log(c);
\`\`\`

## Conclusion

The async/await pattern has revolutionized how we write asynchronous JavaScript code.`);
  };

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required');
      return;
    }

    if (content.length < 50) {
      setError('Content must be at least 50 characters');
      return;
    }

    try {
      setSaving(true);
      const token = localStorage.getItem('token');
      
      const response = await axios.post('/api/posts', {
        title: title.trim(),
        content: content.trim(),
        category: tags[0] || 'general',
        image_url: coverImage,
        image_alt: title
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data) {
        navigate('/');
      }
    } catch (err) {
      console.error('Publish error:', err);
      setError(err.response?.data?.error || 'Failed to publish post');
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] pb-20">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="text-[13px] mono text-[var(--text3)]">
            {saving ? (
              <span className="text-[var(--yellow)]">Saving...</span>
            ) : lastSaved ? (
              <span className="text-[var(--accent)]">Draft saved</span>
            ) : (
              <span>Draft · {new Date().toLocaleDateString()}</span>
            )}
            {wordCount > 0 && (
              <span className="ml-3">· {wordCount} words · {readTime} min read</span>
            )}
          </div>
          <div className="flex items-center gap-3">
           <button onClick={() => navigate('/')} className="btn btn-ghost px-4 py-2 text-[13px]">
              Back
            </button>
            <button onClick={handlePublish} disabled={saving} className="btn btn-primary px-6 py-2 text-[13px]">
              Publish Now
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-[rgba(248,81,73,0.1)] border border-[var(--red)] rounded-lg text-[var(--red)] text-[14px]">
            {error}
          </div>
        )}

        {/* Cover Image */}
        <div 
          onClick={handleCoverClick}
          className={`w-full h-[200px] rounded-xl mb-6 cursor-pointer transition ${
            coverImage 
              ? 'border-2 border-[var(--border)]' 
              : 'border-2 border-dashed border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--accent-glow2)]'
          }`}
        >
          {coverImage ? (
            <img src={coverImage} alt="Cover" className="w-full h-full object-cover rounded-xl" />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-[var(--text3)] hover:text-[var(--accent)] transition">
              <span className="mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </span>
              <span className="text-[14px]">Click to add a cover image</span>
              <span className="text-[12px] mt-1">1920×1080 recommended · JPG, PNG, WebP</span>
            </div>
          )}
        </div>

        {/* Title */}
        <textarea
          ref={titleRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Your post title..."
          className="w-full bg-transparent border-0 border-b border-[var(--border)] outline-none resize-none overflow-hidden text-[clamp(24px,4vw,40px)] mono font-[800] text-[var(--text)] leading-[1.2] tracking-[-1px] mb-1 pb-4"
          rows={1}
        />

        {/* Subtitle */}
        <textarea
          ref={subtitleRef}
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
          placeholder="Add a subtitle or hook (optional)..."
          className="w-full bg-transparent border-0 border-b border-[var(--border)] outline-none resize-none overflow-hidden text-[18px] text-[var(--text2)] mb-6 pb-4"
          rows={1}
        />

        {/* Formatting Toolbar */}
        <div className="flex flex-wrap gap-1 p-3 bg-[var(--bg2)] border border-[var(--border)] rounded-lg mb-6">
          {/* Headings */}
          {['H1', 'H2', 'H3'].map(h => (
            <button
              key={h}
              onClick={() => toggleFormat(h)}
              className={`px-3 py-1.5 rounded text-[13px] mono font-bold transition ${
                activeFormats.has(h) 
                  ? 'bg-[var(--accent-glow)] text-[var(--accent)]' 
                  : 'text-[var(--text2)] hover:bg-[var(--bg3)] hover:text-[var(--text)]'
              }`}
            >
              {h}
            </button>
          ))}
          
          <div className="w-px h-5 bg-[var(--border)] self-center mx-1"></div>
          
          {/* Text Style */}
          {[{k:'B',l:'B'}, {k:'I',l:'I'}, {k:'U',l:'U'}, {k:'S',l:'S̶'}].map(({k,l}) => (
            <button
              key={k}
              onClick={() => toggleFormat(k)}
              className={`px-3 py-1.5 rounded text-[13px] mono font-bold transition ${
                activeFormats.has(k) 
                  ? 'bg-[var(--accent-glow)] text-[var(--accent)]' 
                  : 'text-[var(--text2)] hover:bg-[var(--bg3)] hover:text-[var(--text)]'
              }`}
            >
              {l}
            </button>
          ))}

          <div className="w-px h-5 bg-[var(--border)] self-center mx-1"></div>

          {/* Code/Quote */}
          {[{k:'code',l:'</>'}, {k:'quote',l:'""'}].map(({k,l}) => (
            <button
              key={k}
              onClick={() => toggleFormat(k)}
              className={`px-3 py-1.5 rounded text-[13px] mono font-bold transition ${
                activeFormats.has(k) 
                  ? 'bg-[var(--accent-glow)] text-[var(--accent)]' 
                  : 'text-[var(--text2)] hover:bg-[var(--bg3)] hover:text-[var(--text)]'
              }`}
            >
              {l}
            </button>
          ))}

          <div className="w-px h-5 bg-[var(--border)] self-center mx-1"></div>

          {/* Insert */}
          {[{k:'link',l:'Link'}, {k:'img',l:'Image'}, {k:'embed',l:'Embed'}].map(({k,l}) => (
            <button
              key={k}
              onClick={() => toggleFormat(k)}
              className={`px-3 py-1.5 rounded text-[13px] mono font-bold transition ${
                activeFormats.has(k) 
                  ? 'bg-[var(--accent-glow)] text-[var(--accent)]' 
                  : 'text-[var(--text2)] hover:bg-[var(--bg3)] hover:text-[var(--text)]'
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Content */}
        <textarea
          ref={contentRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={`Start writing your post...

Tips:
• Use ## for headings
• Wrap code in \`backticks\`
• Add images with the toolbar above`}
          className="w-full min-h-[400px] bg-transparent border-0 outline-none resize-none text-[16px] text-[var(--text)] leading-[1.8]"
        />

        {content.length === 0 && (
          <button onClick={loadSampleContent} className="btn btn-ghost btn-sm text-[12px] text-[var(--text3)] mt-4">
            Load sample content to preview the editor
          </button>
        )}

        {/* Settings */}
        <div className="mt-12 pt-8 border-t border-[var(--border)] space-y-6">
          {/* Tags */}
          <div>
            <label className="block text-[13px] font-bold text-[var(--text2)] mb-2">
              Tags <span className="font-normal text-[var(--text3)]">(up to 5, press Enter or comma to add)</span>
            </label>
            <div className="flex flex-wrap gap-2 p-3 bg-[var(--bg2)] border border-[var(--border)] rounded-lg min-h-[46px] focus-within:border-[var(--accent)]">
              {tags.map(tag => (
                <span key={tag} className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--accent-glow)] border border-[rgba(0,255,157,0.3)] text-[var(--accent)] rounded text-[12px] mono">
                  {tag}
                  <button onClick={() => removeTag(tag)} className="hover:opacity-70">×</button>
                </span>
              ))}
              {tags.length < 5 && (
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder="Add tag..."
                  className="flex-1 min-w-[120px] bg-transparent border-0 outline-none text-[14px] text-[var(--text)]"
                />
              )}
            </div>
          </div>

          {/* Settings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-bold text-[var(--text2)] mb-2">Visibility</label>
              <select 
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
                className="w-full bg-[var(--bg3)] border border-[var(--border)] rounded-lg px-4 py-2 text-[14px] text-[var(--text)] outline-none focus:border-[var(--accent)]"
              >
                <option value="public">Public</option>
                <option value="unlisted">Unlisted</option>
                <option value="draft">Draft only</option>
              </select>
            </div>
            <div>
              <label className="block text-[13px] font-bold text-[var(--text2)] mb-2">Schedule</label>
              <input 
                type="datetime-local"
                className="w-full bg-[var(--bg3)] border border-[var(--border)] rounded-lg px-4 py-2 text-[14px] text-[var(--text)] outline-none focus:border-[var(--accent)]"
              />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-[13px] text-[var(--text2)] cursor-pointer">
              <input type="checkbox" checked={allowComments} onChange={(e) => setAllowComments(e.target.checked)} className="accent-[var(--accent)]" />
              Allow comments
            </label>
            <label className="flex items-center gap-2 text-[13px] text-[var(--text2)] cursor-pointer">
              <input type="checkbox" checked={enableReactions} onChange={(e) => setEnableReactions(e.target.checked)} className="accent-[var(--accent)]" />
              Enable reactions
            </label>
            <label className="flex items-center gap-2 text-[13px] text-[var(--text2)] cursor-pointer">
              <input type="checkbox" checked={pinToProfile} onChange={(e) => setPinToProfile(e.target.checked)} className="accent-[var(--accent)]" />
              Pin to profile
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;

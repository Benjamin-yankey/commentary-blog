import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [activeFilter, setActiveFilter] = useState('For You');

  const filters = ['For You', 'Trending', 'Latest', 'JavaScript', 'React', 'Python', 'Rust', 'AI/ML'];

  const fetchPosts = useCallback(async (page) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/posts?page=${page}&limit=9`);
      setPosts(response.data.posts);
      setPagination(response.data.pagination);
      setLoading(false);
    } catch (err) {
      console.error('Fetch posts error:', err);
      setError('Failed to load posts');
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage, fetchPosts]);

  if (loading && posts.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--bg)]">
        <Hero />
        <div className="container mx-auto px-6 py-12">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error && posts.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--bg)]">
        <Hero />
        <div className="container mx-auto px-6 py-12">
          <ErrorMessage message={error} onRetry={() => fetchPosts(currentPage)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Hero />

      {/* Filter Bar */}
      <div className="border-b border-[var(--border)] overflow-x-auto">
        <div className="container mx-auto px-6 py-4 flex gap-2 min-w-max">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-[13px] font-semibold transition whitespace-nowrap ${
                activeFilter === filter
                  ? 'bg-[var(--accent-glow)] text-[var(--accent)] border border-[rgba(0,255,157,0.4)]'
                  : 'border border-[var(--border)] text-[var(--text2)] hover:border-[var(--border2)]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          {/* Posts Feed */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 id="posts-section" className="text-[24px] mono font-bold text-[var(--text)]">
                Latest Posts
              </h2>
              <div className="flex items-center gap-2 text-[var(--text3)] text-[13px]">
                <span className="mono text-[var(--accent)]">{pagination?.totalPosts || 0}</span>
                <span>posts</span>
              </div>
            </div>

            {posts.length === 0 ? (
              <div className="card p-12 text-center">
                <div className="text-[48px] mb-4 text-[var(--text2)]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <p className="text-[var(--text2)] text-[16px] mb-4">No posts yet. Be the first to write!</p>
                <a href="/create-post" className="btn btn-primary">Start Writing</a>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
                  {posts.map((post, index) => (
                    <div key={post.id} className="animate-up" style={{ animationDelay: `${index * 80}ms` }}>
                      <PostCard post={post} />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {pagination && pagination.totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="btn btn-ghost px-4 py-2 disabled:opacity-30"
                    >
                      Previous
                    </button>
                    
                    <div className="flex gap-2">
                      {[...Array(Math.min(pagination.totalPages, 5))].map((_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`w-10 h-10 rounded-lg mono font-bold transition ${
                            currentPage === i + 1
                              ? 'bg-[var(--accent)] text-[var(--bg)]'
                              : 'bg-[var(--bg2)] border border-[var(--border)] text-[var(--text2)] hover:border-[var(--accent)]'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.totalPages))}
                      disabled={currentPage === pagination.totalPages}
                      className="btn btn-ghost px-4 py-2 disabled:opacity-30"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Tags */}
            <div className="card p-6">
              <h3 className="text-[13px] mono font-bold text-[var(--text2)] uppercase tracking-widest mb-4">
                Trending Tags
              </h3>
              <div className="space-y-3">
                {['JavaScript', 'React', 'Python', 'Rust', 'AI/ML', 'DevOps'].map((tag, idx) => (
                  <div key={tag} className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0 hover:translate-x-1 transition cursor-pointer">
                    <span className="text-[14px] text-[var(--text)] hover:text-[var(--accent)] transition">
                      #{tag}
                    </span>
                    <span className="text-[12px] mono text-[var(--text3)]">
                      {(Math.random() * 5 + 1).toFixed(1)}k posts
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Who to Follow */}
            <div className="card p-6">
              <h3 className="text-[13px] mono font-bold text-[var(--text2)] uppercase tracking-widest mb-4">
                Who to Follow
              </h3>
              <div className="space-y-4">
                {['0xKira', 'rustacean_dev', 'css_witch', 'mlwhisperer'].map(user => (
                  <div key={user} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--blue)] flex items-center justify-center font-bold mono text-[var(--bg)] text-[12px]">
                      {user[0].toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="text-[14px] font-bold text-[var(--text)]">{user}</div>
                      <div className="text-[12px] mono text-[var(--text3)]">@{user}</div>
                    </div>
                    <button className="btn btn-outline btn-sm px-3 py-1 text-[11px]">Follow</button>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Card */}
            <div className="card p-6 bg-gradient-to-br from-[rgba(0,255,157,0.05)] to-[rgba(88,166,255,0.05)] border-[rgba(0,255,157,0.2)]">
              <h3 className="text-[16px] font-bold text-[var(--accent)] mb-2">Write Your First Post</h3>
              <p className="text-[13px] text-[var(--text2)] mb-4">
                Share your knowledge with thousands of developers worldwide.
              </p>
              <a href="/create-post" className="btn btn-primary w-full">Start Writing</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

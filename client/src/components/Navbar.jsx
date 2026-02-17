import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('username');
    if (token && user) {
      setIsLoggedIn(true);
      setUsername(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    navigate('/');
    window.location.reload();
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full h-[60px] bg-[rgba(8,12,16,0.85)] backdrop-blur-[20px] border-b border-[var(--border)] z-[1000] flex items-center px-6">
      <div className="flex items-center space-x-8 flex-1">
        {/* Logo */}
        <Link to="/" className="flex items-center mono text-[18px] font-extrabold group">
          <span className="text-[var(--accent)] group-hover:scale-110 transition-transform">{"{"}</span>
          <span className="text-[var(--text2)] mx-1">Dev</span>
          <span className="text-[var(--text)]">Log</span>
          <span className="text-[var(--accent)]">{"}"}</span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center space-x-2">
          <Link 
            to="/" 
            className={`px-3 py-1.5 rounded-md text-[13px] font-semibold transition ${isActive('/') ? 'bg-[var(--bg3)] text-[var(--accent)]' : 'text-[var(--text2)] hover:text-[var(--text)]'}`}
          >
            Explore
          </Link>
          <Link 
            to="/tags" 
            className={`px-3 py-1.5 rounded-md text-[13px] font-semibold transition ${isActive('/tags') ? 'bg-[var(--bg3)] text-[var(--accent)]' : 'text-[var(--text2)] hover:text-[var(--text)]'}`}
          >
            Tags
          </Link>
          <Link 
            to="/leaderboard" 
            className={`px-3 py-1.5 rounded-md text-[13px] font-semibold transition ${isActive('/leaderboard') ? 'bg-[var(--bg3)] text-[var(--accent)]' : 'text-[var(--text2)] hover:text-[var(--text)]'}`}
          >
            Leaderboard
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="hidden lg:flex flex-1 justify-center">
        <div className="relative w-[300px]">
          <input 
            type="text" 
            placeholder="Search posts, tags, authors..."
            className="w-full bg-[var(--bg3)] border border-[var(--border)] rounded-lg px-9 py-1.5 text-[13px] text-[var(--text)] focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent-glow2)] outline-none transition"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text3)]">🔍</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end space-x-4 flex-1">
        {isLoggedIn ? (
          <>
            <Link to="/create-post" className="btn btn-primary btn-sm px-4 py-1.5 text-[13px]">
              ✍️ Write
            </Link>
            <div className="relative group">
              <button className="w-8 h-8 rounded-full border border-[var(--border)] flex items-center justify-center font-bold text-[var(--bg)] mono text-xs bg-gradient-to-br from-[var(--accent)] to-[var(--blue)]">
                {username.charAt(0).toUpperCase()}
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-[var(--bg2)] border border-[var(--border)] rounded-md shadow-xl hidden group-hover:block overflow-hidden">
                <div className="px-4 py-2 border-b border-[var(--border)] text-[var(--text2)] text-xs">
                  Signed in as <b>{username}</b>
                </div>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-[var(--red)] hover:bg-[var(--bg3)] transition"
                >
                  Logout
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="text-[var(--text2)] hover:text-[var(--text)] text-[13px] font-semibold">Sign In</Link>
            <Link to="/register" className="btn btn-outline btn-sm px-4 py-1.5 text-[13px]">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

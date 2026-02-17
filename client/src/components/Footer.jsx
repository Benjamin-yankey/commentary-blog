import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  if (location.pathname === '/create-post') return null;

  return (
    <footer className="bg-[var(--bg2)] border-t border-[var(--border)] pt-16 pb-8 mt-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center mono text-[20px] font-extrabold mb-4">
              <span className="text-[var(--accent)]">{"{"}</span>
              <span className="text-[var(--text2)] mx-1">Dev</span>
              <span className="text-[var(--text)]">Log</span>
              <span className="text-[var(--accent)]">{"}"}</span>
            </Link>
            <p className="text-[var(--text3)] text-[13px] max-w-[240px]">
              The publishing platform built for developers, by developers. Share your knowledge with the world.
            </p>
          </div>

          {/* Columns */}
          <div>
            <h4 className="mono text-[12px] font-bold text-[var(--text2)] uppercase tracking-widest mb-6">Platform</h4>
            <ul className="space-y-3 text-[13px]">
              <li><Link to="/explore" className="text-[var(--text3)] hover:text-[var(--accent)] transition">Explore</Link></li>
              <li><Link to="/tags" className="text-[var(--text3)] hover:text-[var(--accent)] transition">Tags</Link></li>
              <li><Link to="/leaderboard" className="text-[var(--text3)] hover:text-[var(--accent)] transition">Leaderboard</Link></li>
              <li><Link to="/create-post" className="text-[var(--text3)] hover:text-[var(--accent)] transition">Write</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mono text-[12px] font-bold text-[var(--text2)] uppercase tracking-widest mb-6">Account</h4>
            <ul className="space-y-3 text-[13px]">
              <li><Link to="/register" className="text-[var(--text3)] hover:text-[var(--accent)] transition">Sign Up</Link></li>
              <li><Link to="/login" className="text-[var(--text3)] hover:text-[var(--accent)] transition">Sign In</Link></li>
              <li><Link to="/profile" className="text-[var(--text3)] hover:text-[var(--accent)] transition">Profile</Link></li>
              <li><Link to="/settings" className="text-[var(--text3)] hover:text-[var(--accent)] transition">Settings</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mono text-[12px] font-bold text-[var(--text2)] uppercase tracking-widest mb-6">Social</h4>
            <ul className="space-y-3 text-[13px]">
              <li><a href="https://github.com" className="text-[var(--text3)] hover:text-[var(--accent)] transition">GitHub</a></li>
              <li><a href="https://twitter.com" className="text-[var(--text3)] hover:text-[var(--accent)] transition">Twitter / X</a></li>
              <li><a href="https://discord.com" className="text-[var(--text3)] hover:text-[var(--accent)] transition">Discord</a></li>
              <li><a href="/rss" className="text-[var(--text3)] hover:text-[var(--accent)] transition">RSS Feed</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center text-[13px] text-[var(--text3)]">
          <p className="mono">© 2026 DevLog · Built with ❤️ for developers</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy" className="hover:text-[var(--text)] transition">Privacy</a>
            <a href="/terms" className="hover:text-[var(--text)] transition">Terms</a>
            <a href="/cookies" className="hover:text-[var(--text)] transition">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

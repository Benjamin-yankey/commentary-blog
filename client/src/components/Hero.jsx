import React from 'react';
import { Link } from 'react-router-dom';

const Hero = ({ stats = {} }) => {
  return (
    <div className="relative pt-24 pb-16 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-radial-gradient from-[var(--accent-glow)] to-transparent opacity-50 z-0"></div>
      <div className="absolute inset-0 hero-grid z-0"></div>

      <div className="relative z-10 flex flex-col items-center px-4">
        {/* Animated Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[var(--accent-glow)] border border-[rgba(0,255,157,0.3)] text-[var(--accent)] mono text-[12px] mb-8 animate-up">
          <span className="animate-pulse">⚡</span>
          <span>The Developer's Publishing Platform</span>
        </div>

        {/* Heading */}
        <h1 className="text-[36px] md:text-[72px] mono font-[800] leading-[1.1] tracking-[-2px] text-center mb-6 max-w-4xl animate-up">
          Where <span className="accent-glow">Code</span> Meets Great Writing
        </h1>

        {/* Subheading */}
        <p className="text-[18px] md:text-[20px] text-[var(--text2)] text-center max-w-2xl mb-10 animate-up [animation-delay:200ms]">
          Read and write technical articles, tutorials, and deep-dives. 
          Built by developers, for developers.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 animate-up [animation-delay:300ms]">
          <Link to="/create-post" className="btn btn-primary px-10 py-4 text-[16px]">
            ✍️ Start Writing
          </Link>
          <button 
            onClick={() => document.getElementById('posts-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn btn-outline px-10 py-4 text-[16px]"
          >
            🔭 Explore Posts
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 animate-up [animation-delay:400ms]">
          <div className="text-center">
            <div className="text-[28px] mono font-[800] text-[var(--accent)]">48K+</div>
            <div className="text-[12px] text-[var(--text3)] uppercase tracking-widest mt-1">Articles</div>
          </div>
          <div className="text-center">
            <div className="text-[28px] mono font-[800] text-[var(--accent)]">12K+</div>
            <div className="text-[12px] text-[var(--text3)] uppercase tracking-widest mt-1">Authors</div>
          </div>
          <div className="text-center">
            <div className="text-[28px] mono font-[800] text-[var(--accent)]">3.2M</div>
            <div className="text-[12px] text-[var(--text3)] uppercase tracking-widest mt-1">Readers</div>
          </div>
          <div className="text-center">
            <div className="text-[28px] mono font-[800] text-[var(--accent)]">180+</div>
            <div className="text-[12px] text-[var(--text3)] uppercase tracking-widest mt-1">Tags</div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-0">
        <svg viewBox="0 0 1440 120" className="w-full h-auto">
          <path fill="var(--bg)" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L0,120Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;

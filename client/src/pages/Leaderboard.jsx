import React, { useState } from 'react';

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('all');

  const leaderboardData = [
    { rank: 1, name: 'Aleksei Volkov', handle: '@0xvolkov', posts: 142, likes: 18420, views: '892K', streak: 87, badge: '🏆 Top Author', avatar: 'A' },
    { rank: 2, name: 'Priya Nair', handle: '@priya_codes', posts: 98, likes: 14231, views: '671K', streak: 61, badge: '⭐ Rising Star', avatar: 'P' },
    { rank: 3, name: 'Marcus Chen', handle: '@mchen_dev', posts: 115, likes: 12980, views: '601K', streak: 45, badge: '💎 Veteran', avatar: 'M' },
    { rank: 4, name: 'Fatima Al-Rashid', handle: '@fatima_builds', posts: 87, likes: 9821, views: '421K', streak: 33, avatar: 'F' },
    { rank: 5, name: 'bytecoder', handle: '@bytecoder', posts: 74, likes: 8654, views: '389K', streak: 28, avatar: 'B' },
    { rank: 6, name: 'rustacean_dev', handle: '@rustacean_dev', posts: 63, likes: 7891, views: '341K', streak: 22, avatar: 'R' },
    { rank: 7, name: 'css_witch', handle: '@css_witch', posts: 91, likes: 7234, views: '298K', streak: 19, avatar: 'C' },
    { rank: 8, name: 'mlwhisperer', handle: '@mlwhisperer', posts: 55, likes: 6812, views: '271K', streak: 15, avatar: 'M' },
    { rank: 9, name: 'devloop42', handle: '@devloop42', posts: 49, likes: 5431, views: '231K', streak: 12, avatar: 'D' },
    { rank: 10, name: '0xKira', handle: '@0xKira', posts: 42, likes: 4912, views: '198K', streak: 9, avatar: 'K' },
  ];

  const podium = [leaderboardData[1], leaderboardData[0], leaderboardData[2]];

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header */}
      <div className="relative py-16 px-6 text-center border-b border-[var(--border)]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-radial-gradient from-[var(--accent-glow)] to-transparent opacity-30 z-0"></div>
        <div className="relative z-10">
          <h1 className="text-[40px] mono font-[800] mb-4">
            🏆 <span className="text-[var(--accent)]">Leaderboard</span>
          </h1>
          <p className="text-[18px] text-[var(--text2)]">
            Top authors by posts, likes, and community impact.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-5xl">
        {/* Tabs */}
        <div className="flex items-center justify-between mb-12">
          <div className="inline-flex bg-[var(--bg2)] border border-[var(--border)] rounded-lg p-1">
            {['all', 'month', 'week'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-md text-[13px] font-semibold transition ${
                  activeTab === tab ? 'bg-[var(--bg4)] text-[var(--text)]' : 'text-[var(--text2)]'
                }`}
              >
                {tab === 'all' ? 'All Time' : tab === 'month' ? 'This Month' : 'This Week'}
              </button>
            ))}
          </div>
          <span className="text-[13px] mono text-[var(--text3)]">Updated daily at 00:00 UTC</span>
        </div>

        {/* Podium */}
        <div className="flex items-end justify-center gap-4 mb-16">
          {podium.map((user, idx) => {
            const heights = ['100px', '140px', '75px'];
            const colors = ['#8c94a2', '#e3b341', '#ffa657'];
            const sizes = ['64px', '72px', '64px'];
            const ranks = ['#2', '#1', '#3'];
            
            return (
              <div key={user.rank} className="flex flex-col items-center gap-3 animate-up" style={{ animationDelay: `${idx * 100}ms` }}>
                {idx === 1 && <span className="text-[24px]">👑</span>}
                <div 
                  className="rounded-full border-4 flex items-center justify-center font-bold mono text-[var(--bg)]"
                  style={{ 
                    width: sizes[idx], 
                    height: sizes[idx],
                    borderColor: colors[idx],
                    background: `linear-gradient(135deg, ${colors[idx]}, ${colors[idx]}dd)`
                  }}
                >
                  {user.avatar}
                </div>
                <div 
                  className="w-[120px] rounded-t-xl flex flex-col items-center justify-end pb-4"
                  style={{ 
                    height: heights[idx],
                    background: `linear-gradient(to top, ${colors[idx]}22, ${colors[idx]}11)`,
                    border: `2px solid ${colors[idx]}`,
                    borderBottom: 'none'
                  }}
                >
                  <div className="text-[24px] mono font-bold" style={{ color: colors[idx] }}>
                    {ranks[idx]}
                  </div>
                  <div className="text-[14px] font-bold text-[var(--text)] mt-2">{user.name}</div>
                  <div className="text-[11px] mono text-[var(--text3)]">{user.likes.toLocaleString()} likes</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ranked List */}
        <div className="space-y-3">
          {leaderboardData.map((user, index) => (
            <div 
              key={user.rank}
              className="card flex items-center gap-4 p-4 hover:border-[var(--border2)] hover:translate-x-1 transition-all animate-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Rank */}
              <div className={`text-[16px] mono font-bold w-8 ${user.rank <= 3 ? 'text-[var(--accent)]' : 'text-[var(--text3)]'}`}>
                #{user.rank}
              </div>

              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--blue)] flex items-center justify-center font-bold mono text-[var(--bg)]">
                {user.avatar}
              </div>

              {/* User Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[15px]">{user.name}</span>
                  {user.badge && (
                    <span className="text-[11px] px-2 py-0.5 rounded bg-[rgba(227,179,65,0.15)] text-[var(--yellow)] border border-[rgba(227,179,65,0.3)] mono">
                      {user.badge}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-[12px] text-[var(--text3)] mono">
                  <span>{user.handle}</span>
                  <span className="text-[var(--red)]">🔥 {user.streak}d</span>
                </div>
              </div>

              {/* Stats */}
              <div className="hidden md:flex items-center gap-8">
                <div className="text-right">
                  <div className="text-[15px] mono font-bold text-[var(--accent)]">{user.likes.toLocaleString()}</div>
                  <div className="text-[11px] text-[var(--text3)] uppercase">Likes</div>
                </div>
                <div className="text-right">
                  <div className="text-[15px] mono font-bold text-[var(--blue)]">{user.views}</div>
                  <div className="text-[11px] text-[var(--text3)] uppercase">Views</div>
                </div>
                <div className="text-right">
                  <div className="text-[15px] mono font-bold text-[var(--text)]">{user.posts}</div>
                  <div className="text-[11px] text-[var(--text3)] uppercase">Posts</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;

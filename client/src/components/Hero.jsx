import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const scrollToPosts = () => {
    const element = document.getElementById('posts-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-[500px] bg-gradient-to-r from-blue-600 to-purple-700 overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{
          backgroundImage: `url('https://loremflickr.com/1920/1080/writing,office')`,
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-center tracking-tight">
          Commentary Blog
        </h1>
        <p className="text-xl md:text-2xl mb-10 text-center max-w-3xl font-light opacity-90">
          Share your thoughts with the world, engage in meaningful discussions, and explore diverse perspectives from our community.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            to="/create-post" 
            className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold hover:bg-gray-100 transition transform hover:scale-105 shadow-lg text-center"
          >
            Start Writing
          </Link>
          <button 
            onClick={scrollToPosts}
            className="border-2 border-white text-white px-10 py-4 rounded-xl font-bold hover:bg-white hover:text-blue-600 transition transform hover:scale-105 shadow-lg"
          >
            Explore Posts
          </button>
        </div>
      </div>

      {/* Decorative Wave Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-auto translate-y-1">
          <path 
            fill="#f9fafb" 
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;

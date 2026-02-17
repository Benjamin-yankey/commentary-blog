import React from 'react';
import { Link } from 'react-router-dom';
import ImageWithFallback from './ImageWithFallback';

const PostCard = ({ post }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Post Image */}
      <Link to={`/posts/${post.id}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <ImageWithFallback
            src={post.image_url}
            alt={post.image_alt || post.title}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
          />
          {/* Optional: Category Badge */}
          {post.category && (
            <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {post.category}
            </span>
          )}
        </div>
      </Link>

      {/* Post Content */}
      <div className="p-6">
        {/* Title */}
        <Link to={`/posts/${post.id}`}>
          <h2 className="text-2xl font-bold text-gray-800 mb-3 hover:text-blue-600 transition-colors">
            {post.title}
          </h2>
        </Link>

        {/* Excerpt */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Author Info */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center">
            {/* Author Avatar */}
            <img
              src={post.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(post.username)}`}
              alt={post.username}
              className="w-10 h-10 rounded-full mr-3 border-2 border-blue-200"
            />
            <div>
              <p className="text-sm font-semibold text-gray-800">{post.username}</p>
              <p className="text-xs text-gray-500">{formatDate(post.created_at)}</p>
            </div>
          </div>

          {/* Read More Link */}
          <Link 
            to={`/posts/${post.id}`}
            className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center"
          >
            Read More
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostCard;

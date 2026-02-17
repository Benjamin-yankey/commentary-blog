import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreatePost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'blog',
    image_url: '',
    image_alt: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [useRandomImage, setUseRandomImage] = useState(true);
  const [previewImage, setPreviewImage] = useState('');

  const categories = [
    { value: 'technology', label: 'Technology', emoji: '💻' },
    { value: 'travel', label: 'Travel', emoji: '✈️' },
    { value: 'food', label: 'Food', emoji: '🍕' },
    { value: 'lifestyle', label: 'Lifestyle', emoji: '🏡' },
    { value: 'opinion', label: 'Opinion', emoji: '💭' },
    { value: 'blog', label: 'General', emoji: '📝' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Update preview when category changes
    if (name === 'category' && useRandomImage) {
      generatePreview(value);
    }
  };

  const generatePreview = (category) => {
    const imageUrl = `https://source.unsplash.com/800x600/?${category}`;
    setPreviewImage(imageUrl);
  };

  const handleImageToggle = (useRandom) => {
    setUseRandomImage(useRandom);
    if (useRandom) {
      setFormData(prev => ({ ...prev, image_url: '' }));
      generatePreview(formData.category);
    } else {
      setPreviewImage(formData.image_url);
    }
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setFormData(prev => ({ ...prev, image_url: url }));
    setPreviewImage(url);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 5) {
      newErrors.title = 'Title must be at least 5 characters';
    } else if (formData.title.length > 200) {
      newErrors.title = 'Title must be less than 200 characters';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.length < 50) {
      newErrors.content = 'Content must be at least 50 characters';
    }

    if (!useRandomImage && !formData.image_url.trim()) {
      newErrors.image_url = 'Please provide an image URL or use auto-generate';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);
      
      const token = localStorage.getItem('token');
      const submitData = { ...formData };
      
      // If using random image, let backend generate it
      if (useRandomImage) {
        submitData.image_url = '';
      }

      await axios.post('http://localhost:5001/api/posts', submitData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      navigate('/');
    } catch (error) {
      console.error('Create post error:', error);
      setErrors({ submit: error.response?.data?.error || 'Failed to create post' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">Create New Post</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Post Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter an engaging title..."
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
              <p className="text-gray-500 text-sm mt-1">
                {formData.title.length}/200 characters
              </p>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map(cat => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, category: cat.value }));
                      if (useRandomImage) generatePreview(cat.value);
                    }}
                    className={`p-4 border-2 rounded-lg transition-all ${
                      formData.category === cat.value
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <span className="text-2xl mb-2 block">{cat.emoji}</span>
                    <span className="font-semibold">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Image Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Post Image
              </label>
              
              <div className="flex gap-4 mb-4">
                <button
                  type="button"
                  onClick={() => handleImageToggle(true)}
                  className={`px-4 py-2 rounded-lg font-semibold ${
                    useRandomImage
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  ✨ Auto-Generate
                </button>
                <button
                  type="button"
                  onClick={() => handleImageToggle(false)}
                  className={`px-4 py-2 rounded-lg font-semibold ${
                    !useRandomImage
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  🔗 Custom URL
                </button>
              </div>

              {!useRandomImage && (
                <div>
                  <input
                    type="url"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleImageUrlChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      errors.image_url ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="https://example.com/image.jpg"
                  />
                  {errors.image_url && (
                    <p className="text-red-500 text-sm mt-1">{errors.image_url}</p>
                  )}
                  <input
                    type="text"
                    name="image_alt"
                    value={formData.image_alt}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg mt-2"
                    placeholder="Image description (alt text)"
                  />
                </div>
              )}

              {/* Image Preview */}
              {(previewImage || useRandomImage) && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Preview:</p>
                  <div className="relative h-64 rounded-lg overflow-hidden border-2 border-gray-200">
                    <img
                      src={previewImage || `https://source.unsplash.com/800x600/?${formData.category}`}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/800x600/E5E7EB/6B7280?text=Image+Preview';
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Content *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows="12"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.content ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Write your post content here..."
              />
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">{errors.content}</p>
              )}
              <p className="text-gray-500 text-sm mt-1">
                {formData.content.length} characters (minimum 50)
              </p>
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {errors.submit}
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                {loading ? 'Publishing...' : '✨ Publish Post'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-8 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';

const API_BASE = 'http://localhost:7000/api';

export default function ReviewForm() {
  const [formData, setFormData] = useState({
    name: '',
    rating: '5',
    comment: ''
  });

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingReviews, setFetchingReviews] = useState(true);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  // Fetch reviews on mount
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setFetchingReviews(true);
      const res = await fetch(`${API_BASE}/reviews`);
      if (res.ok) {
        const data = await res.json();
        setReviews(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.warn("Could not fetch reviews from backend:", err.message);
    } finally {
      setFetchingReviews(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage({ type: '', text: '' });

    if (!formData.name.trim() || !formData.comment.trim()) {
      setStatusMessage({ type: 'error', text: 'Please fill in both your name and comment.' });
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          rating: Number(formData.rating),
          comment: formData.comment.trim()
        })
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage({ type: 'success', text: data.message || 'Review submitted successfully!' });

        // Add to review list immediately
        const newRev = data.review || {
          _id: 'rev-' + Date.now(),
          name: formData.name.trim(),
          rating: Number(formData.rating),
          comment: formData.comment.trim(),
          createdAt: new Date().toISOString()
        };

        setReviews(prev => [newRev, ...prev]);

        // Reset form
        setFormData({
          name: '',
          rating: '5',
          comment: ''
        });
      } else {
        setStatusMessage({ type: 'error', text: data.message || 'Failed to submit review.' });
      }

    } catch (error) {
      console.error("Error submitting review:", error);
      setStatusMessage({ 
        type: 'error', 
        text: 'Cannot reach backend server. Please make sure the backend is running on port 7000.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const count = Math.min(5, Math.max(1, Math.round(rating || 5)));
    for (let i = 0; i < 5; i++) {
      stars.push(i < count ? '★' : '☆');
    }
    return stars.join('');
  };

  return (
    <div className="review-page">
      <Nav />

      <div className="review-container-wrap">
        <div className="review-top-bar">
          <Link to="/home" className="back-link">← Back to Home</Link>
          <Link to="/explore" className="back-link">Explore States →</Link>
        </div>

        {/* Form Card */}
        <div className="review-card-box">
          <div className="review-card-header">
            <h2>Traveler Feedback & Reviews</h2>
            <p>Share your experience exploring incredible tourist destinations across India!</p>
          </div>

          {statusMessage.text && (
            <div className={`status-alert ${statusMessage.type}`}>
              {statusMessage.text}
            </div>
          )}

          <form className="review-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="e.g. Rahul Sharma"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="rating">Experience Rating</label>
              <select
                id="rating"
                name="rating"
                required
                value={formData.rating}
                onChange={handleChange}
              >
                <option value="5">⭐⭐⭐⭐⭐ 5 Stars - Exceptional</option>
                <option value="4">⭐⭐⭐⭐ 4 Stars - Very Good</option>
                <option value="3">⭐⭐⭐ 3 Stars - Good</option>
                <option value="2">⭐⭐ 2 Stars - Fair</option>
                <option value="1">⭐ 1 Star - Poor</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="comment">Your Review / Tips for Travelers</label>
              <textarea
                id="comment"
                name="comment"
                rows="4"
                placeholder="What was the best attraction? Any travel tips or resort recommendations?"
                required
                value={formData.comment}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn-submit-review" disabled={loading}>
              {loading ? "Submitting Review..." : "Submit Review"}
            </button>
          </form>
        </div>

        {/* Reviews List */}
        <div className="recent-reviews-section">
          <h3>Recent Traveler Reviews ({reviews.length})</h3>

          {fetchingReviews ? (
            <p className="loading-text">Loading reviews...</p>
          ) : reviews.length > 0 ? (
            <div className="reviews-grid">
              {reviews.map((rev, idx) => (
                <div key={rev._id || idx} className="review-item-card">
                  <div className="review-item-header">
                    <div className="reviewer-avatar">
                      {rev.name ? rev.name.charAt(0).toUpperCase() : 'T'}
                    </div>
                    <div>
                      <h4 className="reviewer-name">{rev.name}</h4>
                      <span className="star-rating">{renderStars(rev.rating)}</span>
                    </div>
                  </div>
                  <p className="review-comment">"{rev.comment}"</p>
                  {rev.createdAt && (
                    <span className="review-date">
                      {new Date(rev.createdAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="no-reviews-text">No reviews posted yet. Be the first to leave a review!</p>
          )}
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsMenuOpen(false);
    navigate('/login'); 
  };

  // Close sidebar on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <button 
            type="button"
            className="menu-icon-btn" 
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open Navigation Menu"
          >
            ☰
          </button>
          <Link to="/home" className="logo-brand">
            NAMMA OORU <span>TOURISM</span>
          </Link>
        </div>

        <div className="nav-links-desktop">
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/explore" className="nav-link">Explore</Link>
          <Link to="/ReviewForm" className="nav-btn-review">★ Reviews</Link>
        </div>
      </nav>

      {/* Slide-in Sidebar Menu */}
      <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <span className="sidebar-title">Menu</span>
          <button 
            type="button" 
            className="sidebar-close-btn" 
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close Navigation Menu"
          >
            ✕
          </button>
        </div>

        <div className="sidebar-links">
          <Link to="/home" onClick={() => setIsMenuOpen(false)}>🏠 Home</Link>
          <Link to="/explore" onClick={() => setIsMenuOpen(false)}>🧭 Explore States</Link>
          <Link to="/ReviewForm" onClick={() => setIsMenuOpen(false)}>⭐ Traveler Reviews</Link>
          <hr className="sidebar-divider" />
          <button type="button" className="sidebar-logout-btn" onClick={handleLogout}>
            🚪 Log Out
          </button>
        </div>
      </div>

      {/* Dimmed Background Overlay */}
      {isMenuOpen && (
        <div 
          className="overlay" 
          onClick={() => setIsMenuOpen(false)}
          role="presentation"
        />
      )}
    </>
  );
};

export default Nav;
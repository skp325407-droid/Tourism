import React from 'react';
import { Link } from 'react-router-dom';
import Nav from '../component/Nav';
import '../App.css';

function Home() {
  return (
    <div className="home-container">
      <Nav />

      {/* Hero Section */}
      <section className="home-hero">
        <div className="home-hero-overlay">
          <div className="home-hero-content">
            <span className="hero-pill">🇮🇳 Incredible India Tourism</span>
            <h1>TOURISM</h1>
            <p className="hero-tagline">
              Explore the rich cultural heritage, majestic monuments, scenic hill stations, and vibrant traditions across all 28 Indian States.
            </p>

            <div className="hero-cta-buttons">
              <Link to="/explore" className="btn btn-explore-main">
                Start Exploring States ➔
              </Link>
              <Link to="/ReviewForm" className="btn btn-review-outline">
                Traveler Reviews & Tips
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="home-features">
        <div className="features-container">
          <div className="feature-card">
            <div className="feature-icon">🗺️</div>
            <h3>28 States & UTs</h3>
            <p>Comprehensive tourist guides covering heritage, climate, best travel seasons, and local history.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📍</div>
            <h3>Direct Navigation & Maps</h3>
            <p>One-click direct links to Google Maps for effortless route navigation to famous attractions.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🌤️</div>
            <h3>Real-Time Weather</h3>
            <p>Instant access to up-to-date weather reports to plan your visit in the perfect season.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🏨</div>
            <h3>Resorts & Stay</h3>
            <p>Curated hotel and resort recommendations near every major destination for a comfortable stay.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="main-footer">
        <p>© 2026 Tourism App. Crafted for Indian Heritage & Travel Exploration.</p>
      </footer>
    </div>
  );
}

export default Home;
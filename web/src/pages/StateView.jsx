import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { stateData } from '../data/StateData';
import Nav from '../component/Nav';
import Album from '../component/Album';

function StateView() {
  const { stateName } = useParams();
  const decodedStateName = stateName ? decodeURIComponent(stateName).trim() : "";
  const data = stateData[decodedStateName];
  const [activeAlbums, setActiveAlbums] = useState({});

  if (!data) {
    return (
      <div className="travel-portal">
        <Nav />
        <div className="state-not-found">
          <h2>State not found: "{decodedStateName}"</h2>
          <p>Please return to the explore page to select an available state.</p>
          <Link to="/explore" className="btn btn-primary">← Back to Explore</Link>
        </div>
      </div>
    );
  }

  const toggleAlbum = (spotName) => {
    setActiveAlbums(prev => ({
      ...prev,
      [spotName]: !prev[spotName]
    }));
  };

  return (
    <div className="travel-portal">
      <Nav />

      <div className="state-view-top-bar">
        <Link to="/explore" className="back-link">
          ← Back to All States
        </Link>
      </div>

      {/* Hero Banner */}
      <section 
        className="state-hero" 
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.75)), url('${data.heroImage}')` }}
      >
        <div className="hero-content-box">
          <span className="hero-badge">Incredible India</span>
          <h1>{decodedStateName}</h1>
          <p className="hero-subtext">{data.desc}</p>
        </div>
      </section>

      {/* Overview Cards */}
      <section className="state-info-cards">
        {data.history && (
          <div className="info-card">
            <div className="info-icon">🏛️</div>
            <h3>History & Heritage</h3>
            <p>{data.history}</p>
          </div>
        )}
        {data.climate && (
          <div className="info-card">
            <div className="info-icon">🌤️</div>
            <h3>Climate</h3>
            <p>{data.climate}</p>
          </div>
        )}
        {data.bestTime && (
          <div className="info-card">
            <div className="info-icon">📅</div>
            <h3>Best Time to Visit</h3>
            <p>{data.bestTime}</p>
          </div>
        )}
      </section>

      {/* Spots Section */}
      <section className="spots-section">
        <div className="section-title-wrap">
          <h2>Top Tourist Destinations in {decodedStateName}</h2>
          <p>Explore scenic landmarks, culture, and travel resources</p>
        </div>

        <div className="spots-grid">
          {data.spots && data.spots.length > 0 ? (
            data.spots.map((spot, index) => (
              <div key={index} className="spot-card">
                <div className="spot-image-wrap">
                  <img src={spot.image} alt={spot.name} loading="lazy" />
                  <span className="spot-tag">Destination #{index + 1}</span>
                </div>

                <div className="spot-details">
                  <h3>{spot.name}</h3>
                  <p className="spot-desc">{spot.desc}</p>

                  <div className="button-group">
                    <a 
                      href={spot.links?.map} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="btn btn-map"
                      title="View location on Google Maps"
                    >
                      📍 Map
                    </a>
                    <a 
                      href={spot.links?.weather} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="btn btn-weather"
                      title="Check current weather"
                    >
                      🌤️ Weather
                    </a>
                    <a 
                      href={spot.links?.Resort || spot.links?.resort} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="btn btn-resort"
                      title="Find hotels and resorts"
                    >
                      🏨 Resorts
                    </a>
                  </div>

                  {spot.album && spot.album.length > 1 && (
                    <div className="spot-album-action">
                      <button 
                        type="button" 
                        className="btn-album-toggle"
                        onClick={() => toggleAlbum(spot.name)}
                      >
                        {activeAlbums[spot.name] ? "Hide Photo Gallery ▲" : "View Photo Gallery (" + spot.album.length + " Photos) ▼"}
                      </button>

                      {activeAlbums[spot.name] && (
                        <div className="spot-album-container">
                          <Album photos={spot.album} spotName={spot.name} />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No destination spots listed for this state yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default StateView;
import React, { useState } from 'react';
import Nav from '../component/Nav';
import { Link } from 'react-router-dom';

function StateDetails() {
  const [searchTerm, setSearchTerm] = useState("");

  const indiaStates = [
    { id: 1, name: "Andhra Pradesh", image: "/assets/andhra.jpg" },
    { id: 2, name: "Arunachal Pradesh", image: "/assets/arunachal.jpg" },
    { id: 3, name: "Assam", image: "/assets/assam.jpg" },
    { id: 4, name: "Bihar", image: "/assets/bihar.jpg" },
    { id: 5, name: "Chhattisgarh", image: "/assets/chhatisgarh.jpg" },
    { id: 6, name: "Goa", image: "/assets/goa.jpg" },
    { id: 7, name: "Gujarat", image: "/assets/gujarat.jpg" },
    { id: 8, name: "Haryana", image: "/assets/haryana.jpg" },
    { id: 9, name: "Himachal Pradesh", image: "/assets/himachal.jpg" },
    { id: 10, name: "Jharkhand", image: "/assets/jharkhand.jpg" },
    { id: 11, name: "Karnataka", image: "/assets/karnataka.jpg" },
    { id: 12, name: "Kerala", image: "/assets/kerala.jpg" },
    { id: 13, name: "Madhya Pradesh", image: "/assets/madhya.jpg" },
    { id: 14, name: "Maharashtra", image: "/assets/maharahtra.jpg" },
    { id: 15, name: "Manipur", image: "/assets/manipur.jpg" },
    { id: 16, name: "Meghalaya", image: "/assets/meghalaya.jpg" },
    { id: 17, name: "Mizoram", image: "/assets/mizoram.jpg" },
    { id: 18, name: "Nagaland", image: "/assets/nagaland.jpg" },
    { id: 19, name: "Odisha", image: "/assets/odisha.jpg" },
    { id: 20, name: "Punjab", image: "/assets/punjab.jpg" },
    { id: 21, name: "Rajasthan", image: "/assets/rajasthan.jpg" },
    { id: 22, name: "Sikkim", image: "/assets/sikkim.jpg" },
    { id: 23, name: "Tamil Nadu", image: "/assets/thanjavur.jpg" },
    { id: 24, name: "Telungana", image: "/assets/telungana.jpg" },
    { id: 25, name: "Tripura", image: "/assets/tripura.jpg" },
    { id: 26, name: "Uttar Pradesh", image: "/assets/uttar.jpg" },
    { id: 27, name: "Uttarakhand", image: "/assets/uttarkhand.jpg" },
    { id: 28, name: "West Bengal", image: "/assets/west_bengal.jpg" }
  ];

  const filteredStates = indiaStates.filter((state) =>
    state.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="explore-page">
      <Nav />
      
      <div className="explore-header">
        <h1>Explore the Beauty of INDIA</h1>
        <p>Choose a state to dive into its rich culture, heritage, and scenic wonders</p>
      </div>

      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search for a state (e.g., Kerala, Rajasthan, Tamil Nadu)..." 
          className="main-search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button className="clear-search-btn" onClick={() => setSearchTerm("")}>✕</button>
        )}
      </div>

      <div className="state-grid-container">
        {filteredStates.length > 0 ? (
          filteredStates.map((state) => (
            <div key={state.id} className="state-card">
              <div className="card-image-wrapper">
                <img src={state.image} alt={state.name} loading="lazy" />
              </div>
              <div className="card-info">
                <h3>{state.name}</h3>
                <Link to={`/state/${encodeURIComponent(state.name)}`} className="discover-btn">
                  Discover Destination
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <h3>No states found matching "{searchTerm}"</h3>
            <p>Try searching with another keyword or explore the full list.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StateDetails;
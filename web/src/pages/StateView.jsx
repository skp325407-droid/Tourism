import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { stateData } from '../data/StateData';
import Album from '../component/Album';

function StateView() {
  const { stateName } = useParams();
  const data = stateData[stateName?.trim()];
  const [activeAlbums, setActiveAlbums] = useState({});

  if (!data) return <div>State not found.</div>;

  const toggleAlbum = (name) => {
    setActiveAlbums(prev => ({ ...prev, [name]: !prev[name] }));
  };

  return (
     
      
    <div className="travel-portal">
      {}
      <section className="hero" style={{ backgroundImage: `url(${data.heroImage})` }}>
        <h1>{stateName}</h1>
      </section>
         
      {}
      <section className="info-section">
        <h2>About </h2>
        {data.history && <p><strong>History:</strong> {data.history}</p>}
        {data.climate && <p><strong>Climate:</strong> {data.climate}</p>}
        {data.bestTime && <p><strong>Best Time:</strong> {data.bestTime}</p>}
      </section>
      <br></br>
      {}
      <div className="spots-container">
        {data.spots?.map((spot, index) => (
          <div key={index} className="spot-card">
            <img src={spot.image} alt={spot.name} />
            <h3>{spot.name}</h3>
            <p>{spot.desc}</p>

            <div className="button-group">
              {}
              <a href={spot.links?.map} target="_blank" rel="noreferrer" className="btn">Map</a>
              <a href={spot.links?.weather} target="_blank" rel="noreferrer" className="btn">Weather</a>
              <a href={spot.links?.Resort} target="_blank" rel="noreferrer" className="btn">Resort</a>
            </div>
            
            
          </div>
        ))}
      </div>
      </div>
  );
}
export default StateView
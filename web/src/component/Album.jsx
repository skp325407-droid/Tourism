import React from 'react';

export default function Album({ photos, spotName }) {
  if (!photos || photos.length === 0) return null;
  
  return (
    <div className="album-slider-wrapper">
      <h4 className="album-title">📸 Photo Gallery: {spotName}</h4>
      
      <div className="album-slider">
        {photos.map((img, index) => (
          <div key={index} className="album-image-card">
            <img 
              src={img} 
              alt={`${spotName} photo ${index + 1}`} 
              className="slider-img" 
              loading="lazy" 
            />
          </div>
        ))}
      </div>
    </div>
  );
}
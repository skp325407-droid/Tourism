// src/component/Album.jsx
import React from 'react';

export default function Album({ photos, spotName }) {
  if (!photos || photos.length === 0) return null;
  
  return (
    <div className="album-slider-wrapper">
      {}
      <h3 className="album-title">{spotName}</h3>
      
      <div className="album-slider">
        {photos.map((img, index) => (
          <img key={index} src={img} alt={`Slide ${index}`} className="slider-img" />
        ))}
      </div>
    </div>
  );
}
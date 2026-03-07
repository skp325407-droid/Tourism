import React, { useState } from 'react';
import Nav from '../component/Nav';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

function StateDetails() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate=useNavigate();
  const indiaStates = [
    { id: 1, name: "Andhra Pradesh", image: "./src/assets/andhra.jpg" },
    { id: 2, name: "Arunachal Pradesh", image: "./src/assets/arunachal.jpg" },
    { id: 3, name: "Assam", image: "./src/assets/assam.jpg" },
    { id: 4, name: "Bihar", image: "./src/assets/bihar.jpg" },
    { id: 5, name: "Chhattisgarh", image: "./src/assets/chhatisgarh.jpg" },
    { id: 6, name: "Goa", image: "./src/assets/goa.jpg" },
    { id: 7, name: "Gujarat", image: "./src/assets/gujarat.jpg" },
    { id: 8, name: "Haryana", image: "./src/assets/haryana.jpg" },
    { id: 9, name: "Himachal Pradesh", image: "./src/assets/himachal.jpg" },
    { id: 10, name: "Jharkhand", image: "./src/assets/jharkhand.jpg" },
    { id: 11, name: "Karnataka", image: "./src/assets/karnataka.jpg" },
    { id: 12, name: "Kerala", image: "./src/assets/kerala.jpg" },
    { id: 13, name: "Madhya Pradesh", image: "./src/assets/madhya.jpg" },
    { id: 14, name: "Maharashtra", image: "./src/assets/maharahtra.jpg" },
    { id: 15, name: "Manipur", image: "./src/assets/manipur.jpg" },
    { id: 16, name: "Meghalaya", image: "./src/assets/meghalaya.jpg" },
    { id: 17, name: "Mizoram", image: "./src/assets/mizoram.jpg" },
    { id: 18, name: "Nagaland", image: "./src/assets/nagaland.jpg" },
    { id: 19, name: "Odisha", image: "./src/assets/odisha.jpg" }     ,
    { id: 20, name: "Punjab", image: "./src/assets/punjab.jpg" },
    { id: 21, name: "Rajasthan", image: "./src/assets/rajasthan.jpg" },
    { id: 22, name: "Sikkim", image: "./src/assets/sikkim.jpg" },
    { id: 23, name: "Tamil Nadu", image: "./src/assets/thanjavur.jpg" },
    { id: 24, name: "Telungana", image: "./src/assets/telungana.jpg" },
    { id: 25, name: "Tripura", image: "./src/assets/tripura.jpg" },
    { id: 26, name: "Uttar Pradesh", image: "./src/assets/uttar.jpg" },
    { id: 27, name: "Uttarakhand", image: "./src/assets/uttarkhand.jpg" },
    { id: 28, name: "West Bengal", image: "./src/assets/west_bengal.jpg" },
    
  
  ];

  const filteredStates = indiaStates.filter((state) =>
    state.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="explore-page">
       
      <Nav />
        <h1>Explore the Beauty of INDIA</h1>
        <p>Choose a state to dive into it's culture and heritage</p>

      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search for a state..." 
          className="main-search-bar"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="state-grid-container">
        {filteredStates.map((state) => (
          <div key={state.id} className="state-card">
            <img src={state.image} alt={state.name} />
            <div className="card-info">
              <h3>{state.name}</h3><br></br>
            <Link to={`/state/${state.name}`} className="discover-btn">Discover </Link>
            </div>
          </div>
        ))}
        </div>
    </div>
  );
}

export default StateDetails
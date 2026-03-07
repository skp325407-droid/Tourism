/*import React from 'react' 
import { Link} from 'react-router-dom'
  const handleLogout = () => {
    // Logic to log out goes here
    navigate('/'); // Send user back to login page
  };
const Nav = () => {
  return (
    <div>
        <nav className='navbar'>
          <div className='logo'>NAMMA OORU</div>
          <div className='nav-CONTROLS'><Link to="/ReviewForm">< button className='ReviewForm'>Review</button>
          
          </Link>
          </div>
          </nav>
    </div>
  )
}*/
/*import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/'); 
  };

  return (
    <div className='nav-wrapper'>
      <nav className='navbar'>
        {}
        <div className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </div>

        <div className='logo'>NAMMA OORU</div>
        
        <div className='nav-CONTROLS'>
          <Link to="/ReviewForm">
            <button className='ReviewForm'>Review</button>
          </Link>
        </div>
      </nav>

      {}
      <div className={`sidebar-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <button className="close-btn" onClick={() => setIsMenuOpen(false)}>✕</button>
        </div>
        <div className="sidebar-links">
          <Link to="/home" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/explore" onClick={() => setIsMenuOpen(false)}>Explore</Link>
          <Link to="/ReviewForm" onClick={() => setIsMenuOpen(false)}>Reviews</Link>
        </div>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-button">Log Out</button>
        </div>
      </div>

      {}
      {isMenuOpen && <div className="overlay" onClick={() => setIsMenuOpen(false)}></div>}
    </div>
  );
};

export default Nav;*/
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/'); 
  };

  return (
    <>
      <nav className='navbar'>
        {/* Three-line button stays at the top left */}
        <div className="menu-icon" onClick={() => setIsMenuOpen(true)}>
          ☰
        </div>
        <div className='logo'>TOURISM</div>
        <div className='nav-CONTROLS'>
          <Link to="/ReviewForm">
            <button className='ReviewForm'>Review</button>
          </Link>
        </div>
      </nav>

      {/* Sidebar - This will now slide in from the left */}
      <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={() => setIsMenuOpen(false)}>✕</button>
        <div className="sidebar-links">
          <Link to="/home" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/explore" onClick={() => setIsMenuOpen(false)}>Explore</Link>
          <Link to="/ReviewForm" onClick={() => setIsMenuOpen(false)}>Reviews</Link>
          <button className="logout-btn" onClick={handleLogout}>Log Out</button>
        </div>
      </div>

      {/* Background Dimmer (Overlay) */}
      {isMenuOpen && <div className="overlay" onClick={() => setIsMenuOpen(false)}></div>}
    </>
  );
};

export default Nav;
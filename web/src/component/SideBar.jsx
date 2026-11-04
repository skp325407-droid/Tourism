import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Logic to log out goes here
    navigate('/'); // Send user back to login page
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        {/* The "Three Lines" Hamburger Button */}
        <button className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          ☰
        </button>
        <span className="logo-text">TOURISM</span>
      </div>

      {/* The Sidebar Menu */}
      {isMenuOpen && (
        <div className="sidebar-menu">
          <Link to="/home" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/explore" onClick={() => setIsMenuOpen(false)}>Explore</Link>
          <Link to="/ReviewForm" onClick={() => setIsMenuOpen(false)}>Reviews</Link>
          <hr />
          <button className="logout-btn" onClick={handleLogout}>Log Out</button>
        </div>
      )}
    </nav>
  );
}

export default Nav;
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Sign() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic frontend registration demo: redirect to home
    navigate('/home');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">NAMMA OORU <span>TOURISM</span></div>
          <h2>Create an Account</h2>
          <p>Join to discover destinations and share your travel reviews</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="reg-name">Full Name</label>
            <input 
              id="reg-name"
              type="text" 
              placeholder="e.g. Ananya Patel" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>

          <div className="auth-field">
            <label htmlFor="reg-email">Email Address</label>
            <input 
              id="reg-email"
              type="email" 
              placeholder="name@example.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div className="auth-field">
            <label htmlFor="reg-password">Password</label>
            <input 
              id="reg-password"
              type="password" 
              placeholder="Create a secure password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          <button type="submit" className="btn-auth-submit">Create Account ➔</button>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Sign;
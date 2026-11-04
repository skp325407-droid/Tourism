import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Sign() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage({ type: '', text: '' });

    if (!name.trim() || !email.trim() || !password.trim()) {
      setStatusMessage({ type: 'error', text: 'Please fill in all fields.' });
      return;
    }

    try {
      setLoading(true);

      const response = await fetch('http://localhost:7000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password: password
        })
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage({
          type: 'success',
          text: data.message || 'Registration successful! Redirecting to login...'
        });

        // Store user in localStorage for convenient access
        if (data.user) {
          localStorage.setItem('currentUser', JSON.stringify(data.user));
        }

        setTimeout(() => {
          navigate('/login');
        }, 1200);
      } else {
        setStatusMessage({
          type: 'error',
          text: data.message || 'Registration failed. Please try again.'
        });
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setStatusMessage({
        type: 'error',
        text: 'Unable to connect to backend server. Make sure port 7000 is running.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">TOURISM</div>
          <h2>Create an Account</h2>
          <p>Join to discover destinations and share your travel reviews</p>
        </div>

        {statusMessage.text && (
          <div className={`status-alert ${statusMessage.type}`}>
            {statusMessage.text}
          </div>
        )}

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

          <button type="submit" className="btn-auth-submit" disabled={loading}>
            {loading ? 'Registering...' : 'Create Account ➔'}
          </button>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Sign;

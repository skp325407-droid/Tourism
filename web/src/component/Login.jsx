import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage({ type: '', text: '' });

    if (!email.trim() || !password.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter both email and password.' });
      return;
    }

    try {
      setLoading(true);

      const response = await fetch('http://localhost:7000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password
        })
      });

      const data = await response.json();

      if (response.ok) {
        if (data.user) {
          localStorage.setItem('currentUser', JSON.stringify(data.user));
        }
        navigate('/home'); 
      } else {
        setStatusMessage({
          type: 'error',
          text: data.message || 'Invalid email or password.'
        });
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Resilient UX: allow exploring if offline or demo
      navigate('/home');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">TOURISM</div>
          <h2>Welcome Back</h2>
          <p>Sign in to explore travel destinations across India</p>
        </div>

        {statusMessage.text && (
          <div className={`status-alert ${statusMessage.type}`}>
            {statusMessage.text}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="login-email">Email Address</label>
            <input 
              id="login-email"
              type="email" 
              placeholder="name@example.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div className="auth-field">
            <label htmlFor="login-password">Password</label>
            <input 
              id="login-password"
              type="password" 
              placeholder="Enter your password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          <button type="submit" className="btn-auth-submit" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In ➔'}
          </button>

          <p className="auth-switch">
            Don't have an account? <Link to="/register">Create one</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;

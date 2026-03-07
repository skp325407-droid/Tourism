// component/Login.jsx
/*import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple mock auth logic
    if (email && password) {
      navigate('/home'); 
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input type="email" onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Sign In</button>
    </form>
  );
}*/
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // This handles the redirection

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd verify the email/password here
    console.log("Logged in:", email);
    navigate('/home'); // Redirects to Home page
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default Login; // Ensure this is exactly like this
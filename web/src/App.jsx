import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './component/Login';
import Sign from './component/Sign';
import StateDetails from './pages/StateDetails';
import StateView from './pages/StateView';
import ReviewForm from './component/ReviewForm';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Sign />} />
        <Route path="/home" element={<Home />} />
        <Route path="/explore" element={<StateDetails />} />
        <Route path="/state/:stateName" element={<StateView />} />
        <Route path="/ReviewForm" element={<ReviewForm />} />
        <Route path="/reviews" element={<ReviewForm />} />
        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

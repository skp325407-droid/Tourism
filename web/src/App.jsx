/*import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import StateDetails from './pages/StateDetails';
import StateView from './pages/StateView'; // <-- Add this import
import ReviewForm from './component/ReviewForm';
import Login from './component/Login'
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path="/Home" element={<Home />} />
        <Route path="/ReviewForm" element={<ReviewForm />} />
        <Route path="/explore" element={<StateDetails />} />
        <Route path="/state/:stateName" element={<StateView />} />
      </Routes>
    </Router>
  );
}

export default App;*/
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './component/Login';
import StateDetails from './pages/StateDetails';
import StateView from './pages/StateView';
import ReviewForm from './component/ReviewForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/ReviewForm" element={<ReviewForm />} />
        <Route path="/explore" element={<StateDetails />} />
        <Route path="/state/:stateName" element={<StateView />} />
      </Routes>
    </Router>
  );
}

export default App;

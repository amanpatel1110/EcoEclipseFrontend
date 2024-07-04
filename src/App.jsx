import React from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './components/Home';
import Footprint from './components/Footprint';
import Goal from './components/Goal';
import Signup from './components/Signup';
import Login from './components/Login';
import Logout from './components/Logout';
import Suggestion from './components/Suggestion';
import Profile from './components/Profile';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Community from './components/Community';
import EmailVerify from './components/EmailVerify'

function App() {
  const token = localStorage.getItem('token');
  return (
  
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/footprint" element={<Footprint />} />
        <Route path="/goals" element={token ? <Goal /> : <Navigate to="/login"/> } />
        <Route path="/suggestion" element={<Suggestion />} />
        <Route path='/profile' element={token ? <Profile /> : <Navigate to="/login"/> } />
        <Route path="/community" element={<Community />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/verify" element={<EmailVerify/>} />
      </Routes>
    </Router>

  );
}

export default App;


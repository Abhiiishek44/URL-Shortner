import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './pages/registerPage'
import LandingPage from './pages/LandingPage';
import Navbar from './components/navBar';
import LoginPage from './pages/LoginPage'
function App() {

  return (
    <Router>
           <Navbar/>  
      <Routes>
          <Route path="/register" element={ <Register/>}/>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </Router>
  )
}

export default App

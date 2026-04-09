import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import { NavbarDemo } from './components/Navbar'
import Footer from './components/Footer'
import { Routes, Route, useLocation } from 'react-router-dom'
import { CreateAccount } from './pages/CreateAccount'
import Dashboard from './pages/Dashboard'

function App() {
  const location = useLocation()
  const hideLayout = location.pathname === '/create-account' || location.pathname.startsWith('/create-account/')

  return (
    <>
      {!hideLayout && <NavbarDemo />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/create-account" element={<CreateAccount />} />
      </Routes>
      {!hideLayout && <Footer />}
    </>
  )
}

export default App

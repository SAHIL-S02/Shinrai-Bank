import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import { NavbarDemo } from './components/Navbar'
import Footer from './components/Footer'
import { Routes, Route, useLocation } from 'react-router-dom'
import { CreateAccount } from './pages/CreateAccount'
import Dashboard from './pages/Dashboard'
import { Login } from './pages/Login'

function App() {
  const location = useLocation()
  const hideLayout = location.pathname === '/create-account' || location.pathname.startsWith('/create-account/') || location.pathname === '/login' || location.pathname.startsWith('/login/')

  return (
    <>
      {!hideLayout && <NavbarDemo />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
      {!hideLayout && <Footer />}
    </>
  )
}

export default App

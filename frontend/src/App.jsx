import { useContext, useState } from 'react'
import './App.css'
import Home from './pages/Home'
import { NavbarDemo } from './components/Navbar'
import Footer from './components/Footer'
import { Routes, Route, useLocation } from 'react-router-dom'
import { CreateAccount } from './pages/CreateAccount'
import Dashboard from './pages/Dashboard'
import { Login } from './pages/Login'
import Application from './pages/Application'
import { SideBarContextInfo } from './contexts/SideBarContext'
import AccountManagement from './pages/AccountManagement'
import KYC from './pages/KYC'
import CardServices from './pages/CardServices'
import LoanServices from './pages/LoanServices'
import ContactServices from './pages/ContactServices'
import ChequeServices from './pages/ChequeServices'
import InternetBanking from './pages/InternetBanking'
import OtpVerification from './pages/OtpVerification'
import SendMoney from './pages/SendMoney'
import Transactions from './pages/Transactions'
import CheckBalance from './pages/CheckBalance';
import Settings from './pages/Settings'
import Loan from './pages/Loan'
import Contact from './pages/Contact'
import AboutUs from './pages/AboutUs'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Features from './pages/Features'
import TermsAndConditions from './pages/TermsAndConditions'
import UserProfile from './pages/UserProfile'
import { Toaster } from 'react-hot-toast'




function App() {
  const {sideBar, setSideBar} = useContext(SideBarContextInfo);
  const location = useLocation()
  const currentLocation = location.pathname
  setSideBar(currentLocation.slice(1));
  const hideLayout = location.pathname === '/create-account' || location.pathname.startsWith('/create-account/') || location.pathname === '/login' || location.pathname.startsWith('/login/')|| location.pathname === '/otp' || location.pathname.startsWith('/otp/')

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 1000,
        }}
      />
      {!hideLayout && <NavbarDemo />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/send-money" element={<SendMoney/>}/>
        <Route path="/check-balance" element={<CheckBalance/>}/>
        <Route path="/transactions" element={<Transactions/>}/>
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/settings" element={<Settings/>}/>
        <Route path='/about-us' element={<AboutUs/>}/>
        <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
        <Route path='/features' element={<Features/>}/>
        <Route path='/terms-and-conditions' element={<TermsAndConditions/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/loan" element={<Loan/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<OtpVerification />} />
        <Route path="/application" element={<Application/>}/>
        <Route path="/account-management" element={<AccountManagement/>}/>
        <Route path="/kyc-identity" element={<KYC/>}/>
        <Route path='/card-services' element={<CardServices/>}/>
        <Route path='/loan-credit-services' element={<LoanServices/>}/>  
        <Route path='/contact-update' element={<ContactServices/>}/>
        <Route path='/cheque-services' element={<ChequeServices/>}/>
        <Route path='/internet-banking' element={<InternetBanking/>}/>
      </Routes>
      {!hideLayout && <Footer />}
    </>
  )
}

export default App

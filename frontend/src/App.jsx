import { useContext, useEffect, lazy, Suspense } from 'react'
import './App.css'
import { NavbarDemo } from './components/Navbar'
import Footer from './components/Footer'
import { Routes, Route, useLocation } from 'react-router-dom'
import { SideBarContextInfo } from './contexts/SideBarContext'
import { Toaster } from 'react-hot-toast'

// Lazy-loaded pages — only the visited page's JS is downloaded
const Home = lazy(() => import('./pages/Home'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const CreateAccount = lazy(() => import('./pages/CreateAccount').then(m => ({ default: m.CreateAccount })))
const Login = lazy(() => import('./pages/Login').then(m => ({ default: m.Login })))
const Application = lazy(() => import('./pages/Application'))
const AccountManagement = lazy(() => import('./pages/AccountManagement'))
const KYC = lazy(() => import('./pages/KYC'))
const CardServices = lazy(() => import('./pages/CardServices'))
const LoanServices = lazy(() => import('./pages/LoanServices'))
const ContactServices = lazy(() => import('./pages/ContactServices'))
const ChequeServices = lazy(() => import('./pages/ChequeServices'))
const InternetBanking = lazy(() => import('./pages/InternetBanking'))
const OtpVerification = lazy(() => import('./pages/OtpVerification'))
const SendMoney = lazy(() => import('./pages/SendMoney'))
const Transactions = lazy(() => import('./pages/Transactions'))
const CheckBalance = lazy(() => import('./pages/CheckBalance'))
const Settings = lazy(() => import('./pages/Settings'))
const Loan = lazy(() => import('./pages/Loan'))
const Contact = lazy(() => import('./pages/Contact'))
const AboutUs = lazy(() => import('./pages/AboutUs'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const Features = lazy(() => import('./pages/Features'))
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions'))
const UserProfile = lazy(() => import('./pages/UserProfile'))

// Loading spinner shown while a lazy page is being fetched
function PageLoader() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '60vh',
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '4px solid #e5e7eb',
        borderTop: '4px solid #3b82f6',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

function App() {
  const {sideBar, setSideBar} = useContext(SideBarContextInfo);
  const location = useLocation()
  const currentLocation = location.pathname

  // Moved into useEffect to prevent state updates during render
  useEffect(() => {
    setSideBar(currentLocation.slice(1));
  }, [currentLocation, setSideBar]);

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
      <Suspense fallback={<PageLoader />}>
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
      </Suspense>
      {!hideLayout && <Footer />}
    </>
  )
}

export default App


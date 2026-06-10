import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import SideBarContext from './contexts/SideBarContext';
import UserTempContext from './contexts/UserTempContext';
createRoot(document.getElementById('root')).render(
  <UserTempContext>
    <SideBarContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SideBarContext>
  </UserTempContext>,
)

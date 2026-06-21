import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import SideBarContext from './contexts/SideBarContext';
import UserTempContext from './contexts/UserTempContext';
import AccessTokenContext from './contexts/AccessTokenContext';
import UserDataContext from './contexts/UserDataContext';
import TransferToContext from './contexts/TransferToContext';

createRoot(document.getElementById('root')).render(
  <TransferToContext>
    <UserDataContext>
      <AccessTokenContext>
        <UserTempContext>
          <SideBarContext>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </SideBarContext>
        </UserTempContext>
      </AccessTokenContext>
    </UserDataContext>
  </TransferToContext>,
)

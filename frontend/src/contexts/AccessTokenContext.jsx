import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';
import config from '@/config/config';
import { UserDataContextInfo } from './UserDataContext';

export const AccessTokenContextInfo = createContext();

const AccessTokenContext = ({children}) => {
    const [accessToken, setAccessToken] = useState("");
    const [loading, setLoading] = useState(true);
    const {setIsLogedIn} = useContext(UserDataContextInfo);
    useEffect(() => {
    const refresh = async () => {
        try {
            const res = await axios.get(
            `${config.BACKEND_PORT}/api/auth/refresh-token`,
            { withCredentials: true }
            );
            setAccessToken(res.data.newAccessToken);
            setIsLogedIn(true);
        } catch (err) {
            console.log("Not logged in");
        } finally {
            setLoading(false);
        }
    };

    refresh();
  }, []);
    return (
        <AccessTokenContextInfo.Provider value={{accessToken, setAccessToken}}>
            {!loading && children}
        </AccessTokenContextInfo.Provider>
    )
}

export default AccessTokenContext;
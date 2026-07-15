import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios';
import config from '@/config/config';
import { UserDataContextInfo } from './UserDataContext';
import { wireTokenSetter, setMemoryToken } from '@/services/axiosInstance';

export const AccessTokenContextInfo = createContext();

const ACCESS_TOKEN_REFRESH_INTERVAL = 13 * 60 * 1000; // 13 minutes (before the 15-min expiry)

const AccessTokenContext = ({children}) => {
    const [accessToken, setAccessToken] = useState("");
    const [loading, setLoading] = useState(true);
    const {setIsLogedIn} = useContext(UserDataContextInfo);
    const intervalRef = useRef(null);

    // Wire setters into the Axios interceptor so it can update React state
    useEffect(() => {
        wireTokenSetter(setAccessToken, setIsLogedIn);
    }, [setIsLogedIn]);

    // Keep the in-memory token in sync whenever React state changes
    useEffect(() => {
        setMemoryToken(accessToken);
    }, [accessToken]);

    useEffect(() => {
        const refresh = async () => {
            try {
                const res = await axios.get(
                    `${config.BACKEND_PORT}/api/auth/refresh-token`,
                    { withCredentials: true }
                );
                setAccessToken(res.data.newAccessToken);
                setMemoryToken(res.data.newAccessToken);
                if(res.data.success){
                    setIsLogedIn(true);
                }
                return true; // refresh succeeded
            } catch (err) {
                console.log("Not logged in");
                return false; // refresh failed
            } finally {
                setLoading(false);
            }
        };

        // Initial refresh on mount
        refresh().then((success) => {
            if (success) {
                // Set up periodic silent refresh to keep the session alive
                intervalRef.current = setInterval(async () => {
                    try {
                        const res = await axios.get(
                            `${config.BACKEND_PORT}/api/auth/refresh-token`,
                            { withCredentials: true }
                        );
                        setAccessToken(res.data.newAccessToken);
                        setMemoryToken(res.data.newAccessToken);
                    } catch (err) {
                        // Refresh failed — stop trying, user will need to log in again
                        console.log("Silent refresh failed, session expired");
                        setAccessToken("");
                        setMemoryToken("");
                        setIsLogedIn(false);
                        if (intervalRef.current) clearInterval(intervalRef.current);
                    }
                }, ACCESS_TOKEN_REFRESH_INTERVAL);
            }
        });

        // Also refresh when the tab becomes visible again (user returns after being away)
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                refresh().then((success) => {
                    // Restart the periodic refresh if it was stopped
                    if (success && !intervalRef.current) {
                        intervalRef.current = setInterval(async () => {
                            try {
                                const res = await axios.get(
                                    `${config.BACKEND_PORT}/api/auth/refresh-token`,
                                    { withCredentials: true }
                                );
                                setAccessToken(res.data.newAccessToken);
                                setMemoryToken(res.data.newAccessToken);
                            } catch (err) {
                                console.log("Silent refresh failed, session expired");
                                setAccessToken("");
                                setMemoryToken("");
                                setIsLogedIn(false);
                                if (intervalRef.current) clearInterval(intervalRef.current);
                            }
                        }, ACCESS_TOKEN_REFRESH_INTERVAL);
                    }
                });
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    return (
        <AccessTokenContextInfo.Provider value={{accessToken, setAccessToken, loading}}>
            {children}
        </AccessTokenContextInfo.Provider>
    )
}

export default AccessTokenContext;
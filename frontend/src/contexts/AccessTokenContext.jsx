import React, { createContext, useEffect, useState } from 'react'
import config from '@/config/config';
export const AccessTokenContextInfo = createContext();

const AccessTokenContext = ({children}) => {
    const [accessToken, setAccessToken] = useState("");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
    const refresh = async () => {
        try {
            const res = await axios.get(
            `${config.BACKEND_PORT}/refresh-token`,
            {},
            { withCredentials: true }
            );
            setAccessToken(res.data.newAccessToken);
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
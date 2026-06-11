import React, { Children, useState } from 'react'
import { createContext } from 'react';

export const UserTempContextInfo = createContext();

const UserTempContext = ({children}) => {
    const[userTemp, setUserTemp] = useState({
        name:"",
        email:"",
        otp:0,
    })
    return (
        <UserTempContextInfo.Provider value={{userTemp, setUserTemp}}>
            {children}
        </UserTempContextInfo.Provider>
    )
}

export default UserTempContext;
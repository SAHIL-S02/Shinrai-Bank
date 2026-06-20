import React, { createContext, useState } from 'react'

export const UserDataContextInfo = createContext();

const UserDataContext = ({children}) => {
    const [isLogedIn, setIsLogedIn] = useState(false);
    const [userData, setUserData] = useState({
        name:"",
        nickName:"",
        email:"",
        aadharNumber:"",
        userId:"",
        phoneNumber:"",
        address:"",
        verified:false,
        dob:null,
        nickName:"",
        branchCode:"",
        ifscCode:"",
        accountNumber:"",
        cardType:"",
        cardNumber:"",
        cardValid:null,
        cardCVV:"",
        status:"",
        bankBalance:0,
        kycVerified:false,
        transactions:[],
    })
    return (
        <UserDataContextInfo.Provider value={{userData, setUserData, isLogedIn, setIsLogedIn}}>
            {children}
        </UserDataContextInfo.Provider>
    )
}

export default UserDataContext
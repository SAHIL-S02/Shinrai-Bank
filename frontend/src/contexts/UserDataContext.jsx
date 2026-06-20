import React, { createContext, useState } from 'react'

export const UserDataContextInfo = createContext();

const UserDataContext = ({children}) => {
    const [userData, setUserData] = useState({
        name:"",
        email:"",
        aadharNumber:"",
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
        <UserDataContextInfo.Provider value={{userData, setUserData}}>
            {children}
        </UserDataContextInfo.Provider>
    )
}

export default UserDataContext
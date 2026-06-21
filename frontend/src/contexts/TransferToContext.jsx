import React, { createContext, useState } from 'react'


export const TransferToContextInfo = createContext();

const TransferToContext = ({children}) => {
    const [transferTo, setTransferTo] = useState("");
    return (
        <TransferToContextInfo.Provider value={{transferTo, setTransferTo}}>
            {children}
        </TransferToContextInfo.Provider>
    )
}

export default TransferToContext
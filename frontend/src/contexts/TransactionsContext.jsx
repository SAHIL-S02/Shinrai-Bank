import React, { createContext, useState } from 'react'
export const TransactionsContextInfo = createContext();
const TransactionsContext = ({children}) => {
    const [transactions, setTransactions] = useState([]);
    return (
        <TransactionsContextInfo.Provider value={{transactions, setTransactions}}>
            {children}
        </TransactionsContextInfo.Provider>
    )
}

export default TransactionsContext;
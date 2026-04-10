import React, { useState } from 'react'
import { useContext } from 'react'
import { SideBarContextInfo } from '@/contexts/SideBarContext'
import { useEffect } from "react";

const SideBar = () => {
    const {sideBar, setSideBar} = useContext(SideBarContextInfo);
    useEffect(() => {
    console.log(sideBar);
    }, [sideBar]);
    return (
    <div className='sideBar w-16 lg:min-h-[800px] lg:max-h-[900px] bg-red flex flex-col bg-[#FFFFFF]'>
        <div className='upperSide'>
            <div className={`dashboardIconDiv drop-shadow-lg   mt-5 mb-5 ${sideBar == "dashboard"? "active" : "de-active"}`} onClick={() => setSideBar("dashboard")}>
                <img className='rounded-md' src="/icons/dashboard.png" alt="Dashboard" />
            </div>
            <div className={`walletIconDiv drop-shadow-lg  mt-5 mb-5 ${sideBar == "wallet"? "active" : "de-active"}`} onClick={() => {setSideBar("wallet")}}>
                <img className='rounded-md' src="/icons/wallet.png" alt="Wallet" />
            </div>
            <div className={`historyIconDiv drop-shadow-lg  mt-5 mb-5 ${sideBar == "history"? "active" : "de-active"}`} onClick={() => {setSideBar("history")}}>
                <img className='rounded-md' src="/icons/history.png" alt="History" />
            </div>
            <div className={`loanIconDiv drop-shadow-lg w-[1.8rem] mt-5 mb-5 ${sideBar == "loan"? "active" : "de-active"}`} onClick={() => {setSideBar("loan")}}>
                <img className='rounded-md' src="/icons/loan.png" alt="Loan" />
            </div>
            <div className={`investmentIconDiv drop-shadow-lg  mt-5 mb-5 ${sideBar == "investment"? "active" : "de-active"}`} onClick={() => {setSideBar("investment")}}>
                <img className='rounded-md' src="/icons/investment.png" alt="Investment" />
            </div>
        </div>
        <div className='lowerSide'>
            <div className='settingIconDiv w-[1.7rem] mt-5 mb-5 active'>
                <img className='rounded-md' src="/icons/settings.png" alt="setting" />
            </div>
            <div className='logoutIconDiv w-[1.7rem] mt-5 mb-5 active'>
                <img className='rounded-md' src="/icons/logout.png" alt="logout" />
            </div>
        </div>
    </div>
    )
}

export default SideBar
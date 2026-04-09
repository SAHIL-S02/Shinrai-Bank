import React, { useState } from 'react'
import { useContext } from 'react'
import { SideBarContextInfo } from '@/contexts/SideBarContext'
import { useEffect } from "react";

useEffect(() => {
    console.log(sideBar);
}, [sideBar]);

const SideBar = () => {
    const {sideBar, setSideBar} = useContext(SideBarContextInfo);
    return (
    <div className='sideBar w-16 lg:min-h-[800px] lg:max-h-[900px] bg-red flex flex-col bg-[#FFFFFF]'>
        <div className='upperSide'>
            <div className={`dashboardIconDiv shadow-lg   mt-5 mb-5 ${sideBar == "dashboard"? "active" : "de-ative"}`} onClick={() => setSideBar("dashboard")}>
                <img className='rounded-md' src="/icons/dashboard.png" alt="Dashboard" />
            </div>
            <div className={`walletIconDiv shadow-lg  mt-5 mb-5 ${sideBar == "wallet"? "active" : "de-ative"}`} onClick={() => {setSideBar("wallet"); console.log(sideBar)}}>
                <img className='rounded-md' src="/icons/wallet.png" alt="Wallet" />
            </div>
            <div className='historyIconDiv shadow-lg  mt-5 mb-5 de-active'>
                <img className='rounded-md' src="/icons/history.png" alt="History" onClick={setSideBar("dashboard")}/>
            </div>
            <div className='loanIconDiv shadow-lg w-[1.8rem] mt-5 mb-5 de-active' onClick={setSideBar("dashboard")}>
                <img className='rounded-md' src="/icons/loan.png" alt="Loan" />
            </div>
            <div className='investmentIconDiv shadow-lg  mt-5 mb-5 de-active' onClick={setSideBar("dashboard")}>
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
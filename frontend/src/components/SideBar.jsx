import React, { useState } from 'react'
import { useContext } from 'react'
import { SideBarContextInfo } from '@/contexts/SideBarContext'
import { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPenToSquare, faClockRotateLeft, faPercent, faFileInvoice} from '@fortawesome/free-solid-svg-icons'
import { faF } from '@fortawesome/free-solid-svg-icons/faF';
import { Navigate, useNavigate } from 'react-router-dom';

const SideBar = () => {
    const navigate = useNavigate();
    const {sideBar, setSideBar} = useContext(SideBarContextInfo);
    useEffect(() => {
    // console.log(sideBar);
    }, [sideBar]);
    return (
    <div className='sideBar w-16 lg:min-h-[800px] lg:max-h-[900px] bg-red flex flex-col bg-[#FFFFFF]'>
        <div className='upperSide'>
            <div className={`dashboardIconDiv cursor-pointer drop-shadow-lg flex flex-col justify-center items-center   mt-5 mb-5 ${sideBar == "dashboard"? "activeB" : "de-activeB"}`} onClick={() => {setSideBar("dashboard"); navigate("/dashboard")}}>
                <img className='rounded-md' src="/icons/dashboard.png" alt="Dashboard" />
                <p className='text-[9px] cursor-pointer'>Dashboard</p>
            </div>
            <div className={`applicationIconDiv cursor-pointer flex flex-col justify-center items-center drop-shadow-lg  mt-5 mb-5 ${sideBar == "application"? "activeB" : "de-activeB"}`} onClick={() => {setSideBar("application"); navigate("/application"); console.log("Application")}}>
                <FontAwesomeIcon icon={faPenToSquare} className={`text-[#C55EDA]  ${sideBar == "application"? "text-2xl" : "text-xl"}`}></FontAwesomeIcon>
                <p className='text-[9px] cursor-pointer'>Application</p>
            </div>
            <div className={`historyIconDiv cursor-pointer flex flex-col justify-center items-center drop-shadow-lg  mt-5 mb-5 ${sideBar == "history"? "activeB" : "de-activeB"}`} onClick={() => {setSideBar("history"); navigate("/history")}}>
                <FontAwesomeIcon icon={faClockRotateLeft} className={`text-[#C55EDA]  ${sideBar == "history"? "text-2xl" : "text-xl"}`}></FontAwesomeIcon>
                <p className='text-[9px] cursor-pointer'>History</p>
            </div>
            <div className={`loanIconDiv cursor-pointer flex flex-col justify-center items-center drop-shadow-lg w-[1.8rem] mt-5 mb-5 ${sideBar == "loan"? "activeB" : "de-activeB"}`} onClick={() => {setSideBar("loan"); navigate("/loan")}}>
                <FontAwesomeIcon icon={faPercent} className={`text-[#C55EDA]  ${sideBar == "loan"? "text-2xl" : "text-xl"}`}></FontAwesomeIcon> 
                <p className='text-[9px] cursor-pointer'>Loan</p>
            </div>
            <div className={`investmentIconDiv cursor-pointer flex flex-col justify-center items-center drop-shadow-lg  mt-5 mb-5 ${sideBar == "investment"? "activeB" : "de-activeB"}`} onClick={() => {setSideBar("investment"); navigate("/investment")}}>
                <FontAwesomeIcon icon={faFileInvoice} className={`text-[#C55EDA]  ${sideBar == "investment"? "text-2xl" : "text-xl"}`}></FontAwesomeIcon> 
                <p className='text-[9px] cursor-pointer'>Statement</p>
            </div>
        </div>
        <div className='lowerSide'>
            <div className='settingIconDiv w-[1.7rem] mt-5 mb-5 activeB'>
                <img className='rounded-md' src="/icons/settings.png" alt="setting" />
            </div>
            <div className='logoutIconDiv w-[1.7rem] mt-5 mb-5 activeB'>
                <img className='rounded-md' src="/icons/logout.png" alt="logout" />
            </div>
        </div>
    </div>
    )
}

export default SideBar
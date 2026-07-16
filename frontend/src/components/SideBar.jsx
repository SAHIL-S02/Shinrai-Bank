import React, { useState } from 'react'
import { useContext } from 'react'
import { SideBarContextInfo } from '@/contexts/SideBarContext'
import { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPenToSquare, faClockRotateLeft, faPercent, faFileInvoice} from '@fortawesome/free-solid-svg-icons'
import { faF } from '@fortawesome/free-solid-svg-icons/faF';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserDataContextInfo } from '@/contexts/UserDataContext';

const SideBar = () => {
    const {setIsLogedIn} = useContext(UserDataContextInfo);
    const {setUserData} = useContext(UserDataContextInfo);
    const navigate = useNavigate();
    const {sideBar, setSideBar} = useContext(SideBarContextInfo);
    const reset = ()=>{
        navigate("/");
        setIsLogedIn(false);
        setUserData({
        name:"",
        nickName:"",
        email:"",
        aadharNumber:"",
        userId:"",
        phoneNumber:"",
        address:"",
        verified:false,
        dob:null,
        branchCode:"",
        ifscCode:"",
        accountNumber:"",
        cardType:"",
        cardNumber:"",
        cardValid:null,
        cardCVV:"",
        status:"",
        bankBalance:0,
        kycVerified:true,
        transactions:[],
    })
    
    }
    useEffect(() => {
    // console.log(sideBar);
    }, [sideBar]);
    return (
    <>
      {/* Mobile: horizontal bottom bar */}
      <div className='sideBar lg:hidden flex flex-row items-center justify-around bg-[#FFFFFF] w-full py-2 px-1 border-t border-gray-200 overflow-x-auto'>
        <div className={`cursor-pointer flex flex-col justify-center items-center px-2 ${sideBar == "dashboard"? "activeB" : "de-activeB"}`} onClick={() => {setSideBar("dashboard"); navigate("/dashboard")}}>
            <img className='rounded-md w-5 h-5' src="/icons/dashboard.png" alt="Dashboard" />
            <p className='text-[8px] cursor-pointer mt-0.5'>Dashboard</p>
        </div>
        <div className={`cursor-pointer flex flex-col justify-center items-center px-2 ${(sideBar == "application" || sideBar == "account-management" || sideBar == "kyc-identity" || sideBar == "card-services" || sideBar == "loan-credit-services" || sideBar == "contact-update" || sideBar == "cheque-services" || sideBar == "internet-banking")? "activeB" : "de-activeB"}`} onClick={() => {setSideBar("application"); navigate("/application")}}>
            <FontAwesomeIcon icon={faPenToSquare} className={`text-[#C55EDA] ${(sideBar == "application" || sideBar == "account-management" || sideBar == "kyc-identity" || sideBar == "card-services" || sideBar == "loan-credit-services" || sideBar == "contact-update" || sideBar == "cheque-services" || sideBar == "internet-banking")? "text-lg" : "text-base"}`}></FontAwesomeIcon>
            <p className='text-[8px] cursor-pointer mt-0.5'>Application</p>
        </div>
        <div className={`cursor-pointer flex flex-col justify-center items-center px-2 ${sideBar == "history"? "activeB" : "de-activeB"}`} onClick={() => {setSideBar("history"); navigate("/transactions")}}>
            <FontAwesomeIcon icon={faClockRotateLeft} className={`text-[#C55EDA] ${sideBar == "history"? "text-lg" : "text-base"}`}></FontAwesomeIcon>
            <p className='text-[8px] cursor-pointer mt-0.5'>History</p>
        </div>
        <div className={`cursor-pointer flex flex-col justify-center items-center px-2 ${sideBar == "loan"? "activeB" : "de-activeB"}`} onClick={() => {setSideBar("loan"); navigate("/loan")}}>
            <FontAwesomeIcon icon={faPercent} className={`text-[#C55EDA] ${(sideBar == "loan")? "text-lg" : "text-base"}`}></FontAwesomeIcon>
            <p className='text-[8px] cursor-pointer mt-0.5'>Loan</p>
        </div>
        <div className='cursor-pointer flex flex-col justify-center items-center px-2' onClick={()=>{navigate("/settings")}}>
            <img className='rounded-md w-5 h-5' src="/icons/settings.png" alt="setting" />
            <p className='text-[8px] cursor-pointer mt-0.5'>Settings</p>
        </div>
        <div className='cursor-pointer flex flex-col justify-center items-center px-2' onClick={()=>{reset()}}>
            <img className='rounded-md w-5 h-5' src="/icons/logout.png" alt="logout" />
            <p className='text-[8px] cursor-pointer mt-0.5'>Logout</p>
        </div>
      </div>

      {/* Desktop: vertical sidebar */}
      <div className='sideBar hidden lg:flex w-16 lg:min-h-[800px] lg:max-h-[900px] bg-red flex-col bg-[#FFFFFF]'>
        <div className='upperSide'>
            <div className={`dashboardIconDiv cursor-pointer drop-shadow-lg flex flex-col justify-center items-center   mt-5 mb-5 ${sideBar == "dashboard"? "activeB" : "de-activeB"}`} onClick={() => {setSideBar("dashboard"); navigate("/dashboard")}}>
                <img className='rounded-md' src="/icons/dashboard.png" alt="Dashboard" />
                <p className='text-[9px] cursor-pointer'>Dashboard</p>
            </div>
            <div className={`applicationIconDiv cursor-pointer flex flex-col justify-center items-center drop-shadow-lg  mt-5 mb-5 ${(sideBar == "application" || sideBar == "account-management" || sideBar == "kyc-identity" || sideBar == "card-services" || sideBar == "loan-credit-services" || sideBar == "contact-update" || sideBar == "cheque-services" || sideBar == "internet-banking")? "activeB" : "de-activeB"}`} onClick={() => {setSideBar("application"); navigate("/application"); console.log("Application")}}>
                <FontAwesomeIcon icon={faPenToSquare} className={`text-[#C55EDA]  ${(sideBar == "application" || sideBar == "account-management" || sideBar == "kyc-identity" || sideBar == "card-services" || sideBar == "loan-credit-services" || sideBar == "contact-update" || sideBar == "cheque-services" || sideBar == "internet-banking")? "text-2xl" : "text-xl"}`}></FontAwesomeIcon>
                <p className='text-[9px] cursor-pointer'>Application</p>
            </div>
            <div className={`historyIconDiv cursor-pointer flex flex-col justify-center items-center drop-shadow-lg  mt-5 mb-5 ${sideBar == "history"? "activeB" : "de-activeB"}`} onClick={() => {setSideBar("history"); navigate("/transactions")}}>
                <FontAwesomeIcon icon={faClockRotateLeft} className={`text-[#C55EDA]  ${sideBar == "history"? "text-2xl" : "text-xl"}`}></FontAwesomeIcon>
                <p className='text-[9px] cursor-pointer'>History</p>
            </div>
            <div className={`loanIconDiv cursor-pointer flex flex-col justify-center items-center drop-shadow-lg w-[1.8rem] mt-5 mb-5 ${sideBar == "loan"? "activeB" : "de-activeB"}`} onClick={() => {setSideBar("loan"); navigate("/loan")}}>
                <FontAwesomeIcon icon={faPercent} className={`text-[#C55EDA]  ${(sideBar == "loan")? "text-2xl" : "text-xl"}`}></FontAwesomeIcon> 
                <p className='text-[9px] cursor-pointer'>Loan</p>
            </div>
        </div>
        <div className='lowerSide'>
            <div className='settingIconDiv w-[1.7rem] mt-5 mb-5 activeB cursor-pointer' onClick={()=>{navigate("/settings")}}>
                <img className='rounded-md' src="/icons/settings.png" alt="setting" />
            </div>
            <div className='logoutIconDiv w-[1.7rem] mt-5 mb-5 activeB cursor-pointer' onClick={()=>{reset()}}>
                <img className='rounded-md' src="/icons/logout.png" alt="logout" />
            </div>
        </div>
      </div>
    </>
    )
}

export default SideBar
import React from 'react'
import SideBar from '@/components/SideBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {QRCode} from "react-qr-code";
import {faHouseSignal, faSatelliteDish, faFireBurner, faCreditCard, faLightbulb, faMobile, faShare, faTurnUp, faTurnDown, faPaperPlane, faAddressBook, faBuildingColumns, faWallet } from '@fortawesome/free-solid-svg-icons'
const Dashboard = () => {
  console.log("QRCode =", QRCode);
  return (
    <div className=''>
        <section className='lg:min-h-[600px] lg:max-h-[800px] bg-[#E5EDF9] flex' >
            <SideBar/>
            <div className='mainDashboard w-full flex flex-col m-9'>
              <div className='mb-2'>
                <h1 className='font-bold text-xl mb-1'>
                  Overview
                </h1>
                <h3 className='ml-3'>
                  Welcome back, SK SAHIL 
                </h3>
              </div>
              <div className='cardsAndOffers flex-1 flex justify-around pr-3 flex-wrap'>
                <div className='debitCard md:w-1/4 md:h-[200px] m-2 shadow-2xl bg-gradient-to-b from-[#F2757B] to-[#90A4FC] rounded-2xl p-3 pl-5 pr-5 text-white'>
                  <div className='flex justify-between'>
                    <div>
                      <p className='text-sm'>Card Number</p>
                      <p className='ml-2 font-bold'>6789 5577 3445 6789</p>
                      <br />
                      <p className='ml-2 font-bold'>SK SAHIL UDDIN</p>
                    </div>
                    <div className='w-1/6 flex flex-col justify-between'>
                      <img  src="/icons/card.png" alt="" />
                      <img src="/icons/chip.png" alt="" />
                    </div>
                  </div>
                  <div className='flex w-full justify-between pr-5 pl-5 pt-3'>
                    <div>
                      <p className='text-sm'>
                        Valid Thru
                      </p>
                      <p className='font-bold'>
                        09/29
                      </p>
                    </div>
                    <div>
                      <p className='text-sm'>
                        CVV
                      </p>
                      <p  className='font-bold'>
                        994
                      </p>
                    </div>
                  </div>
                </div>
                <div className='offers w-[70%] m-2  bg-[#FFFFFF] md:h-[200px] rounded-xl p-7 shadow-2xl'>
                  <div className='  bg-white flex'>
                      <div>
                        <h2 className='text-4xl font-bold text-[#2A2F47]'>Cashback up to 60% 🎁</h2>
                        <br />
                        <p className='w-[90%]'>
                          Redesign concept for online bank mBank. This is online service that allows you to pay bills for a variety of goods and services using your personal device.
                        </p>
                      </div>
                      <div className='w-[20%]'>
                        <img src="/offer.png" alt="" />
                      </div>
                  </div>
                </div>
              </div>
              <div className='transactionsAndTransfers grid grid-cols-10 grid-rows-10 gap-4 w-full h-[450px] mt-3'>
                <div className='transactions col-span-3 row-span-5 bg-white rounded-2xl p-4 shadow-2xl'>
                  <h4 className='font-semibold mb-3'>
                    Transactions
                  </h4>
                  <div className='ml-3 flex justify-between mb-3'>
                    <div className='flex bg-[#F1F3F6] w-8 h-8 justify-center items-center rounded-full'>
                      <FontAwesomeIcon icon={faTurnUp} className="text-red-500" />
                    </div>
                    <div className=''>
                      <p className='text-xs font-bold'>
                        Starbucks Howrah
                      </p>
                      <p className='text-xs font-normal'>
                        19.04.2026 12:34
                      </p>
                    </div>
                    <div className='text-red-600'>
                      -₹690
                    </div>
                  </div>
                  <div className='ml-3 flex justify-between mb-3'>
                    <div className='flex bg-[#F1F3F6] w-8 h-8 justify-center items-center rounded-full'>
                      <FontAwesomeIcon icon={faTurnUp} className="text-red-500" />
                    </div>
                    <div className=''>
                      <p className='text-xs font-bold'>
                        Wallmart Kolkata
                      </p>
                      <p className='text-xs font-normal'>
                        18.04.2026 10:28
                      </p>
                    </div>
                    <div className='text-red-600'>
                      -₹690
                    </div>
                  </div>
                  <div className='ml-3 flex justify-between'>
                    <div className='flex bg-[#F1F3F6] w-8 h-8 justify-center items-center rounded-full'>
                      <FontAwesomeIcon icon={faTurnDown} className="text-green-500" />
                    </div>
                    <div className=''>
                      <p className='text-xs font-bold'>
                        Salary Office Kolkata
                      </p>
                      <p className='text-xs font-normal'>
                        01.04.2026 01:23
                      </p>
                    </div>
                    <div className='text-green-600'>
                      +₹80,000
                    </div>
                  </div>
                </div>
                <div className='transfer col-span-3 row-span-4 bg-white rounded-2xl p-4 shadow-2xl'>
                  <div className='flex items-center mb-5'>
                    <FontAwesomeIcon icon={faPaperPlane} className='text-[#7763EA] ml-1 mr-1'></FontAwesomeIcon>
                  <h2 className='ml-1 mr-2 font-semibold'>
                    Transfer
                  </h2>
                  </div>
                  <div className='flex justify-between'>
                    <div className='flex flex-col justify-center flex-wrap items-center'>
                      <div>
                        <FontAwesomeIcon icon={faAddressBook} className='text-[#D383A3] text-2xl p-1 pt-2 pb-2 text-center rounded-full bg-[#F1F3F6] shadow-md'></FontAwesomeIcon>
                      </div>
                      <p className='text-xs text-center'>
                        Pay Number
                      </p>
                    </div>
                    <div className='flex flex-col justify-center flex-wrap items-center'>
                      <div>
                        <FontAwesomeIcon icon={faBuildingColumns} className='text-[#D383A3] text-2xl p-1 pt-2 pb-2 text-center rounded-full bg-[#F1F3F6] shadow-md'></FontAwesomeIcon>
                      </div>
                      <p className='text-xs text-center'>
                        Pay to Bank
                      </p>
                    </div>
                    <div className='flex flex-col justify-center flex-wrap items-center'>
                      <div className=''>
                        <img src="/icons/upi.png" alt="" className='w-9 bg-[#F1F3F6] rounded-full p-1 mt-1 mb-1 shadow-md'/>
                      </div>
                      <p className='text-xs text-center'>
                        Pay to UPI
                      </p>
                    </div>
                    <div className='flex flex-col justify-center flex-wrap items-center'>
                      <div>
                        <FontAwesomeIcon icon={faWallet} className='text-[#D383A3] text-2xl p-1 pt-2 pb-2 text-center rounded-full bg-[#F1F3F6] shadow-md'></FontAwesomeIcon>
                      </div>
                      <p className='text-xs text-center'>
                        Check Balance
                      </p>
                    </div>
                  </div>
                </div>
                <div className='userDetails col-span-4 row-span-4 bg-white rounded-2xl p-6 shadow-2xl flex justify-between'>
                  <div className='flex flex-col'>
                    <h2 className='font-bold text-gray-800 [text-shadow:0_1px_2px_rgba(0,0,0,0.25)]'>
                      SK SAHIL UDDIN
                    </h2>
                    <p className='text-sm ml-3 mt-1'>+91 96473 97722</p>
                    <p className='text-sm ml-3 mt-1'>Account Number: 9647397722</p>
                    <p className='text-sm ml-3 mt-1'>
                      UPI ID: 9647397722@shinrai
                    </p>
                    <hr />
                  </div>
                  <div className='flex flex-col justify-center items-stretch'>
                    <QRCode
                      value="upi://pay?pa=9647397722@shinrai&pn=SK SAHIL UDDIN"
                      size={120}
                    />
                    <p className='text-xs mt-2'>9647397722@shinrai</p>
                  </div>
                </div>
                <div className='col-span-3 row-span-4 row-start-6 bg-white rounded-2xl p-4 shadow-2xll'>
                  <h4 className='font-semibold mb-3'>
                    Quick Transfer 
                  </h4>
                  <div className='flex items-center'>
                    <input type="text" className='bg-white border-[#D1D3D4] border-2 shadow-md w-[70%] pl-3 pt-1 pb-1 rounded-md text-sm'  placeholder='UPI / Mobile Number'/>
                    <div>
                      <FontAwesomeIcon icon={faShare} className='text-[#7763E9] pl-2'></FontAwesomeIcon>
                    </div>
                  </div>
                  <div className='shortCuts '>
                    <div className='flex justify-around w-[70%] mt-4'>
                      <div className='w-8 h-8 rounded-full bg-[#EF7780]  flex justify-center items-center text-xl font-bold'>
                        P
                      </div>
                      <div className='w-8 h-8 rounded-full bg-[#D683A0] flex justify-center items-center text-xl font-bold'>
                        S
                      </div>
                      <div className='w-8 h-8 rounded-full bg-[#AB97D9]  flex justify-center items-center text-xl font-bold'>
                        A
                      </div>
                      <div className='w-8 h-8 rounded-full bg-[#94A3F8] flex justify-center items-center text-xl font-bold'>
                        J
                      </div>
                      <div className='w-8 h-8 rounded-full border-2 border-black-900 border-dashed bg-transparent flex justify-center items-center text-xl font-bold'>
                        +
                      </div>
                    </div>
                  </div>
                  
                </div>
                <div className='bills flex flex-col justify-around pl-6 col-span-7 row-span-5 row-start-5  bg-white rounded-2xl p-4 shadow-2xll'>
                  <div className='mb-2'>
                    <h4 className='font-semibold mb-3'>
                      Bill Payments
                    </h4>
                    {/* <hr /> */}
                  </div>
                  <div className='flex justify-around mb-4'>
                    <div className='flex flex-col justify-center items-center'>
                      <FontAwesomeIcon icon={faMobile} className='text-[#9A8CFF] text-2xl p-1 pt-2 pb-2 bg-slate-200 rounded-full'></FontAwesomeIcon>
                      <p className='text-center text-xs mt-1'>Mobile Recharge</p>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                      <FontAwesomeIcon icon={faLightbulb} className='text-[#9A8CFF] text-2xl p-1 pt-2 pb-2 bg-slate-200 rounded-full'></FontAwesomeIcon>
                      <p className='text-center text-xs mt-1'>Electricity Bill</p>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                      <FontAwesomeIcon icon={faCreditCard} className='text-[#9A8CFF] text-2xl p-1 pt-2 pb-2 bg-slate-200 rounded-full'></FontAwesomeIcon>
                      <p className='text-center text-xs mt-1'>Credit Card</p>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                      <FontAwesomeIcon icon={faFireBurner} className='text-[#9A8CFF] text-2xl p-1 pt-2 pb-2 bg-slate-200 rounded-full'></FontAwesomeIcon>
                      <p className='text-center text-xs mt-1'>LPG Cylinder</p>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                      <FontAwesomeIcon icon={faSatelliteDish} className='text-[#9A8CFF] text-2xl p-1 pt-2 pb-2 bg-slate-200 rounded-full'></FontAwesomeIcon>
                      <p className='text-center text-xs mt-1'>DTH Recharge</p>
                    </div>
                    <div className='flex flex-col justify-center items-center'>
                      <FontAwesomeIcon icon={faHouseSignal} className='text-[#9A8CFF] text-2xl p-1 pt-2 pb-2 bg-slate-200 rounded-full'></FontAwesomeIcon>
                      <p className='text-center text-xs mt-1'>Broadband Bill</p>
                    </div>
                    
                  </div>
                  
                </div>
              </div>
            </div>
        </section>
        
    </div>
  )
}

export default Dashboard
import React from 'react'
import SideBar from '@/components/SideBar'
import { useNavigate } from 'react-router-dom'

const Application = () => {
  const navigate = useNavigate();
  return (
    <div>
        <section className='lg:min-h-[600px] lg:max-h-[800px] bg-[#E5EDF9] flex' >
            <SideBar/>
            <div className='mainDashboard w-full m-9 grid grid-cols-12 grid-rows-10 gap-4' >
                <div onClick={() => {navigate("/account-managemnet")}} className='cursor-pointer col-span-3 row-span-5 p-3 bg-gradient-to-b from-[#9A8CFF] to-[#F2757B] rounded-2xl m-6  shadow-lg flex justify-center items-center hover:mt-0 hover:mb-8 hover:ml-2 hover:mr-2 hover:from-[#7763EA] hover:to-[#F7A6A9] hover:pl-7 hover:pr-7 transition-all duration-300 ease-in-out' >
                  <div className='flex flex-col h-[95%] p-3 bg-white justify-around items-center rounded-2xl shadow-2xl'>
                    <img src="/application/am.png" alt=""  className='w-[50%]'/>
                    <hr className='text-black font-bold w-full m-2' />
                    <h1 className='text-center text-lg font-bold'>
                      Account Management Requests
                    </h1>
                  </div>
                </div>
                <div onClick={() => {navigate("/kyc-identity")}} className='cursor-pointer col-span-3 row-span-5 p-3 bg-gradient-to-b from-[#9A8CFF] to-[#F2757B] rounded-2xl m-6  shadow-lg flex justify-center items-center hover:mt-0 hover:mb-8 hover:ml-2 hover:mr-2 hover:from-[#7763EA] hover:to-[#F7A6A9] hover:pl-7 hover:pr-7 transition-all duration-300 ease-in-out' >
                  <div className='flex flex-col h-[95%] p-3 bg-white justify-around items-center rounded-2xl shadow-2xl'>
                    <img src="/application/kyc.png" alt=""  className='w-[50%]'/>
                    <hr className='text-black font-bold w-full m-2' />
                    <h1 className='text-center text-lg font-bold'>
                      KYC & Identity Services
                    </h1>
                  </div>
                </div>
                <div onClick={() => {navigate("/card-services")}} className='cursor-pointer col-span-3 row-span-5 p-3 bg-gradient-to-b from-[#9A8CFF] to-[#F2757B] rounded-2xl m-6  shadow-lg flex justify-center items-center hover:mt-0 hover:mb-8 hover:ml-2 hover:mr-2 hover:from-[#7763EA] hover:to-[#F7A6A9] hover:pl-7 hover:pr-7 transition-all duration-300 ease-in-out' >
                  <div className='flex flex-col h-[95%] p-3 bg-white justify-around items-center rounded-2xl shadow-2xl'>
                    <img src="/application/card.png" alt=""  className='w-[50%]'/>
                    <hr className='text-black font-bold w-full m-2' />
                    <div className='flex items-center justify-center'>
                      <h1 className='text-center text-lg font-bold'>
                      Card Services
                    </h1>
                    </div>
                  </div>
                </div>
                <div onClick={() => {navigate("/loan-credit-services")}} className='cursor-pointer col-span-3 row-span-5 p-3 bg-gradient-to-b from-[#9A8CFF] to-[#F2757B] rounded-2xl m-6  shadow-lg flex justify-center items-center hover:mt-0 hover:mb-8 hover:ml-2 hover:mr-2 hover:from-[#7763EA] hover:to-[#F7A6A9] hover:pl-7 hover:pr-7 transition-all duration-300 ease-in-out' >
                  <div className='flex flex-col h-[95%] p-3 bg-white justify-around items-center rounded-2xl shadow-2xl'>
                    <img src="/application/loan.png" alt=""  className='w-[50%]'/>
                    <hr className='text-black font-bold w-full m-2' />
                    <h1 className='text-center text-lg font-bold'>
                      Loan & Credit Services
                    </h1>
                  </div>
                </div>
                <div onClick={() => {navigate("/contact-update")}} className='cursor-pointer col-span-3 row-span-5 p-3 bg-gradient-to-b from-[#9A8CFF] to-[#F2757B] rounded-2xl m-6  shadow-lg flex justify-center items-center hover:mt-0 hover:mb-8 hover:ml-2 hover:mr-2 hover:from-[#7763EA] hover:to-[#F7A6A9] hover:pl-7 hover:pr-7 transition-all duration-300 ease-in-out' >
                  <div className='flex flex-col h-[95%] p-3 bg-white justify-around items-center rounded-2xl shadow-2xl'>
                    <img src="/application/contact.png" alt=""  className='w-[50%]'/>
                    <hr className='text-black font-bold w-full m-2' />
                    <h1 className='text-center text-lg font-bold'>
                      Contact & Communication Updates
                    </h1>
                  </div>
                </div>
                <div onClick={() => {navigate("/cheque-services")}} className='cursor-pointer col-span-3 row-span-5 p-3 bg-gradient-to-b from-[#9A8CFF] to-[#F2757B] rounded-2xl m-6  shadow-lg flex justify-center items-center hover:mt-0 hover:mb-8 hover:ml-2 hover:mr-2 hover:from-[#7763EA] hover:to-[#F7A6A9] hover:pl-7 hover:pr-7 transition-all duration-300 ease-in-out' >
                  <div className='flex flex-col h-[95%] p-3 bg-white justify-around items-center rounded-2xl shadow-2xl'>
                    <img src="/application/cheque.png" alt=""  className='w-[50%]'/>
                    <hr className='text-black font-bold w-full m-2' />
                    <h1 className='text-center text-lg font-bold'>
                      Cheque & Payment Services
                    </h1>
                  </div>
                </div>
                <div onClick={() => {navigate("/internet-banking")}} className='cursor-pointer col-span-3 row-span-5 p-3 bg-gradient-to-b from-[#9A8CFF] to-[#F2757B] rounded-2xl m-6  shadow-lg flex justify-center items-center hover:mt-0 hover:mb-8 hover:ml-2 hover:mr-2 hover:from-[#7763EA] hover:to-[#F7A6A9] hover:pl-7 hover:pr-7 transition-all duration-300 ease-in-out' >
                  <div className='flex flex-col h-[95%] p-3 bg-white justify-around items-center rounded-2xl shadow-2xl'>
                    <img src="/application/internet.png" alt=""  className='w-[50%]'/>
                    <hr className='text-black font-bold w-full m-2' />
                    <div className='flex items-center justify-center'>
                      <h1 className='text-center text-lg font-bold'>
                      Internet Banking & Security
                    </h1>
                    </div>
                  </div>
                </div>
                
            </div>
        </section>
    </div>
  )
}

export default Application
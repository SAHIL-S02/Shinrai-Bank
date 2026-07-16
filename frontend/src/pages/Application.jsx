import React from 'react'
import SideBar from '@/components/SideBar'
import { useNavigate } from 'react-router-dom'

const Application = () => {
  const navigate = useNavigate();
  return (
    <div>
        <section className='min-h-[400px] lg:min-h-[600px] lg:max-h-[800px] bg-[#E5EDF9] flex flex-col lg:flex-row' >
            <div className='order-2 lg:order-1'>
              <SideBar/>
            </div>
            <div className='order-1 lg:order-2 mainDashboard w-full p-4 md:p-6 lg:m-9 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-auto' >
                <div onClick={() => {navigate("/account-management")}} className='cursor-pointer p-2 md:p-3 bg-gradient-to-b from-[#9A8CFF] to-[#F2757B] rounded-2xl shadow-lg flex justify-center items-center hover:scale-[1.03] hover:from-[#7763EA] hover:to-[#F7A6A9] transition-all duration-300 ease-in-out' >
                  <div className='flex flex-col h-full w-full p-2 md:p-3 bg-white justify-around items-center rounded-2xl shadow-2xl'>
                    <img src="/application/am.webp" alt=""  className='w-[50%] max-w-[120px]'/>
                    <hr className='text-black font-bold w-full m-2' />
                    <h1 className='text-center text-sm md:text-lg font-bold'>
                      Account Management Requests
                    </h1>
                  </div>
                </div>
                <div onClick={() => {navigate("/kyc-identity")}} className='cursor-pointer p-2 md:p-3 bg-gradient-to-b from-[#9A8CFF] to-[#F2757B] rounded-2xl shadow-lg flex justify-center items-center hover:scale-[1.03] hover:from-[#7763EA] hover:to-[#F7A6A9] transition-all duration-300 ease-in-out' >
                  <div className='flex flex-col h-full w-full p-2 md:p-3 bg-white justify-around items-center rounded-2xl shadow-2xl'>
                    <img src="/application/kyc.webp" alt=""  className='w-[50%] max-w-[120px]'/>
                    <hr className='text-black font-bold w-full m-2' />
                    <h1 className='text-center text-sm md:text-lg font-bold'>
                      KYC & Identity Services
                    </h1>
                  </div>
                </div>
                <div onClick={() => {navigate("/card-services")}} className='cursor-pointer p-2 md:p-3 bg-gradient-to-b from-[#9A8CFF] to-[#F2757B] rounded-2xl shadow-lg flex justify-center items-center hover:scale-[1.03] hover:from-[#7763EA] hover:to-[#F7A6A9] transition-all duration-300 ease-in-out' >
                  <div className='flex flex-col h-full w-full p-2 md:p-3 bg-white justify-around items-center rounded-2xl shadow-2xl'>
                    <img src="/application/card.png" alt=""  className='w-[50%] max-w-[120px]'/>
                    <hr className='text-black font-bold w-full m-2' />
                    <div className='flex items-center justify-center'>
                      <h1 className='text-center text-sm md:text-lg font-bold'>
                      Card Services
                    </h1>
                    </div>
                  </div>
                </div>
                <div onClick={() => {navigate("/loan-credit-services")}} className='cursor-pointer p-2 md:p-3 bg-gradient-to-b from-[#9A8CFF] to-[#F2757B] rounded-2xl shadow-lg flex justify-center items-center hover:scale-[1.03] hover:from-[#7763EA] hover:to-[#F7A6A9] transition-all duration-300 ease-in-out' >
                  <div className='flex flex-col h-full w-full p-2 md:p-3 bg-white justify-around items-center rounded-2xl shadow-2xl'>
                    <img src="/application/loan.png" alt=""  className='w-[50%] max-w-[120px]'/>
                    <hr className='text-black font-bold w-full m-2' />
                    <h1 className='text-center text-sm md:text-lg font-bold'>
                      Loan & Credit Services
                    </h1>
                  </div>
                </div>
                <div onClick={() => {navigate("/contact-update")}} className='cursor-pointer p-2 md:p-3 bg-gradient-to-b from-[#9A8CFF] to-[#F2757B] rounded-2xl shadow-lg flex justify-center items-center hover:scale-[1.03] hover:from-[#7763EA] hover:to-[#F7A6A9] transition-all duration-300 ease-in-out' >
                  <div className='flex flex-col h-full w-full p-2 md:p-3 bg-white justify-around items-center rounded-2xl shadow-2xl'>
                    <img src="/application/contact.png" alt=""  className='w-[50%] max-w-[120px]'/>
                    <hr className='text-black font-bold w-full m-2' />
                    <h1 className='text-center text-sm md:text-lg font-bold'>
                      Contact & Communication Updates
                    </h1>
                  </div>
                </div>
                <div onClick={() => {navigate("/cheque-services")}} className='cursor-pointer p-2 md:p-3 bg-gradient-to-b from-[#9A8CFF] to-[#F2757B] rounded-2xl shadow-lg flex justify-center items-center hover:scale-[1.03] hover:from-[#7763EA] hover:to-[#F7A6A9] transition-all duration-300 ease-in-out' >
                  <div className='flex flex-col h-full w-full p-2 md:p-3 bg-white justify-around items-center rounded-2xl shadow-2xl'>
                    <img src="/application/cheque.webp" alt=""  className='w-[50%] max-w-[120px]'/>
                    <hr className='text-black font-bold w-full m-2' />
                    <h1 className='text-center text-sm md:text-lg font-bold'>
                      Cheque & Payment Services
                    </h1>
                  </div>
                </div>
                <div onClick={() => {navigate("/internet-banking")}} className='cursor-pointer p-2 md:p-3 bg-gradient-to-b from-[#9A8CFF] to-[#F2757B] rounded-2xl shadow-lg flex justify-center items-center hover:scale-[1.03] hover:from-[#7763EA] hover:to-[#F7A6A9] transition-all duration-300 ease-in-out' >
                  <div className='flex flex-col h-full w-full p-2 md:p-3 bg-white justify-around items-center rounded-2xl shadow-2xl'>
                    <img src="/application/internet.png" alt=""  className='w-[50%] max-w-[120px]'/>
                    <hr className='text-black font-bold w-full m-2' />
                    <div className='flex items-center justify-center'>
                      <h1 className='text-center text-sm md:text-lg font-bold'>
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
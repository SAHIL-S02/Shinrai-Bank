import React from 'react'
import SideBar from '@/components/SideBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp, faArrowDown, faTurnUp, faTurnDown } from '@fortawesome/free-solid-svg-icons'
const Dashboard = () => {
  return (
    <div className=''>
        <section className='lg:min-h-[600px] lg:max-h-[800px] bg-[#E5EDF9] flex' >
            <SideBar/>
            <div className='mainDashboard w-full flex flex-col m-9'>
              <div className='mb-4'>
                <h1 className='font-bold text-xl'>
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
              <div className='transactionsAndTransfers grid grid-cols-10 grid-rows-10 gap-2 w-full h-[450px] mt-3'>
                <div className='transactions col-span-3 row-span-5 bg-white rounded-2xl p-4 shadow-2xl'>
                  <h4 className='font-semibold text-lg mb-3'>
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
              </div>
            </div>
        </section>
        
    </div>
  )
}

export default Dashboard
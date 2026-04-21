import React from 'react'
import SideBar from '@/components/SideBar'

const Dashboard = () => {
  return (
    <div className=''>
        <section className='lg:min-h-[600px] lg:max-h-[800px] bg-[#E5EDF9] flex' >
            <SideBar/>
            <div className='mainDashboard w-full flex flex-col m-9'>
              <div className='cardsAndOffers flex-1 flex gap-9 pr-3 '>
                <div className='debitCard md:w-1/4 md:h-[200px] m-2 bg-gradient-to-b from-[#F2757B] to-[#90A4FC] rounded-2xl p-3 pl-5 pr-5 text-white'>
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
                <div className='offers w-[70%] bg-[#FFFFFF] mr-4 h-[30%] rounded-2xl p-7'>
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
            </div>
        </section>
        
    </div>
  )
}

export default Dashboard
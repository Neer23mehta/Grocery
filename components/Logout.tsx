'use client'
import React, { useState } from 'react'
import { assets } from '@/assests/assets'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Logout = () => {
  const [logout, setLogout] = useState(true)
  const route = useRouter();
  const handleLogout = () => {
    route.push("/")
    // localStorage.removeItem("token")
    // localStorage.removeItem("usertoken")
    // localStorage.removeItem("renderedSections")
  }

  const handleLogoutPage = () => {
    setLogout(!logout)
  }

  return (
    <div>
      <div className='flex flex-col justify-center items-center'>
        <form className='flex flex-col bg-white mt-1 py-1 px-4 lg:w-[450px] md:w-auto sm:w-auto justify-center items-center' >
          <div className='flex justify-end items-end '>
            <Image onClick={handleLogoutPage} src={assets.can} alt='remove' className='ml-95' />
          </div>
          <h1 className='text-2xl font-bold mb-1  '>Logout</h1>
          <div className='flex flex-col justify-start mt-10 space-y-5'>
            <div className='flex flex-col text-center justify-center items-center '>
              <p className='text-gray-400'>Are you sure you want to
                <br /> logout ? </p>
            </div>
          </div>
          <div className='flex justify-center items-center mt-5'>
            <button className='px-28 py-2 bg-amber-400 font-bold mb-3' type='submit' onClick={handleLogout}>Logout</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Logout
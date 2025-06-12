'use client'
import React, { useEffect } from 'react'
import { assets } from '@/assests/assets'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Home = () => {
  const router = useRouter()
  
  const handleSectionClick = () => {
    router.push("/admin/homemanage/addhomemanagement")
  }

  useEffect(() => {
    document.title = "Admin Homemanagement"
  },[])
  return (
    <div className='flex flex-col justify-center items-center px-7 py-5 mt-15'>
      <div className='flex flex-col justify-center items-center bg-white shadow-md px-10 py-7'>
      <div>
        <h1 className='lg:text-3xl text-md md:text-xl font-bold'>Home Management</h1>
      </div>
      <div className='hidden md:block flex-row justify-center md:px-5 md:py-2'>
        <p className='text-gray-400 md:ml-3'>Dashboard <span className='ml-2'>{`>`}</span><span className='md:ml-2 text-black'> Home Management</span></p>
      </div>
      <div className='py-4 px-2'>
        <Image src={assets.basket} alt='Basket-img' className='grayscale-100'/>
      </div>
      <div className='py-3'>
        <button onClick={handleSectionClick} className='bg-amber-400 md:px-9 px-4 py-2 md:py-3 font-bold mt-2 cursor-pointer'>Add Section</button>
      </div>
      </div>
    </div>
  )
}

export default Home
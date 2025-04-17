import React from 'react'
import { assets } from '@/assests/assets'
import Image from 'next/image'
import { MdEdit } from "react-icons/md";

const Shopbybrand = () => {
  return (
    <div>
       <div className='flex flex-col mt-5 px-4 bg-white shadow:md scroll-smooth overflow-scroll'>
              <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-row'>
                  <h1 className='mt-5 font-bold text-xl'>Brands</h1>
                  <button className='text-gray-500 ml-3 mt-5'><MdEdit size={20} /></button>
                </div>
                <Image src={assets.del} alt='delete' className='mt-5 flex justify-end' width={17} height={25} />
              </div>
              <div className='flex flex-row justify-start items-center mb-5 mt-3 space-x-2 gap-5'>
                <Image src={assets.simg} alt='banner' className='border bg-contain ' />
                <Image src={assets.add} alt='banner' className='border-1' />
                <Image src={assets.add} alt='banner' />
                {/* <Image src={assets.add} alt='banner'/> */}
                {/* <Image src={assets.add} alt='banner'/> */}
                {/* <Image src={assets.add} alt='banner'/> */}
                {/* <Image src={assets.add} alt='banner'/> */}
                {/* <Image src={assets.add} alt='banner'/> */}
                {/* <Image src={assets.add} alt='banner'/> */}
                <ul>
                  {
      
                  }
                </ul>
              </div>
            </div>
    </div>
  )
}

export default Shopbybrand
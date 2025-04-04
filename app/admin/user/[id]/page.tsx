'use client'
import { assets } from '../../../../assests/assets';
import { TextField } from '@mui/material'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";

const page = () => {
    const [input,setinput] = useState("")
    const [adds,setadds] = useState(0)

    useEffect(()=>{
        for(let i = 0; i <= 10; i++){
            const add = i;
            setadds(add)
            console.log("i",add)
        }
    },[])

{/* <Image src={assets.ud} alt='up' height={7} width={5}/> */}

  return (
    <div className=''>
        <div className='flex flex-row justify-between items-center'>
        <div className='flex flex-col px-2'>
            <h1 className='text-3xl font-bold'>Users Details</h1>
            <p className='text-gray-500 mt-2'>Dashboard <span className='text-gray-500 ml-5'>Users</span> <span className='text-black ml-5'>Users Details</span></p>
        </div>
        </div>
        <div className='flex flex-row items-center justify-between shadow-lg'>
            <div>
                <Image src={assets.use} alt='user' height={170} width={150}/>
            </div>
            <div className='flex flex-col'>
                <h1 className='text-black font-bold text-2xl md:mr-60 lg:mr-130 mb-3'>Virat Kohli{}</h1>
                <div className='flex flex-row items-center'>
                <Image src={assets.mobile} alt='mobile' height={8} width={18} className='mb-2'/> <p className='ml-2 mb-2'>9090909090</p>
                <Image src={assets.mails} alt='mail' height={8} width={18} className='mb-2 ml-10'/> <p className='ml-2 mb-2'>abc123@gmail.com{}</p>
                </div>
                <div className='flex flex-row items-center'>
                <Image src={assets.location} alt='address' height={8} width={18} className='mb-2'/><p className='ml-2 mb-2'>Temporary{}</p>
                </div>
            </div>
            <div className='flex flex-row mr-15 ml-25 mb-20'>
                <p className='text-gray-400 '>Total Order:{}</p>
                <p className='text-gray-400 ml-7'>Status{}</p>
            </div>
        </div>
        <div>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mt-5">
        <thead className="">
        <tr className=''>
                        <th className="py-3 px-4 text-left text-md font-semibold text-black">Order No.</th>
                        <th className="py-3 px-4 text-left text-md font-semibold text-black">Date</th>
                        <th className="py-3 px-4 text-left text-md font-semibold text-black">User Details</th>
                        <th className="py-3 px-4 text-left text-md font-semibold text-black">Amount</th>
                        <th className="py-3 px-4 text-left text-md font-semibold text-black">Payment Type</th>
                        <th className="py-3 px-4 text-left text-md font-semibold text-black">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        
                    }
                </tbody>
            </table>
            <div className='flex justify-end bottom-0 top-100'>
                    {/* {
                        adds.map((curval:any,index:any)=>{
                            return (
                                <button key={index}>
                                    {curval.i}
                                </button>
                            )
                        })
                    }     */}
            </div>
        </div>
    </div>

  )
}

export default page
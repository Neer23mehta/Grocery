'use client'
import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";

const Page = () => {
    const [input,setInput] = useState("")
    const [adds,setAdds] = useState(0)

    useEffect(()=>{
        for(let i = 0; i <= 10; i++){
            const add = i;
            setAdds(add)
        }
    },[])

  return (
    <div className=''>
        <div className='flex flex-row justify-between items-center'>
        <div className='flex flex-col px-2'>
            <h1 className='text-3xl font-bold'>Orders</h1>
            <p className='text-gray-500 mt-2'>Dashboard <span className='text-black ml-5'>Orders</span> </p>
        </div>
        </div>
        <div>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mt-5">
        <thead className="">
        <tr>
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

export default Page
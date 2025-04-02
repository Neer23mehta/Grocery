'use client'
import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";

const page = () => {
    const [input,setinput] = useState("")
  return (
    <div className=''>
        <div className='flex flex-row justify-between items-center'>
        <div className='flex flex-col px-2'>
            <h1 className='text-3xl font-bold'>Users</h1>
            <p className='text-gray-500 mt-2'>Dashboard <span className='text-black ml-5'>Users</span> </p>
        </div>
        <TextField id="outlined-basic" label="Search Users" variant="outlined" value={input} onChange={(e)=>setinput(e.target.value)} />
        </div>
        <div>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="">
        <tr>
                        <th className="py-3 px-4 text-left text-md font-semibold text-black">User ID</th>
                        <th className="py-3 px-4 text-left text-md font-semibold text-black">Name</th>
                        <th className="py-3 px-4 text-left text-md font-semibold text-black">Mobile Number</th>
                        <th className="py-3 px-4 text-left text-md font-semibold text-black">Email</th>
                        <th className="py-3 px-4 text-left text-md font-semibold text-black">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        
                    }
                </tbody>
            </table>
        </div>
    </div>

  )
}

export default page
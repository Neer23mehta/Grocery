'use client'
import { assets } from '@/assests/assets';
import commonGetApis from '@/commonapi/Commonapi';
import { Pagination, Stack, TextField } from '@mui/material'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";

interface Users {
  No:number; 
  Coupon_Name:string 
  Min_Purchase:number
  Discount_Price:number
  Coupon_Code:string
  Date:string
  Status:number
}

const Page = () => {
    const [input, setInput] = useState("")
    const [adds, setAdds] = useState(0)
    const [users,setUsers] = useState<Users[]>([])
    const [submit, setSubmit] = useState(false)

    const fetchGet = async () => {
        try {
            const res = await commonGetApis("get_coupons?pageNumber=1&pageLimit=1")
            setUsers(res.data.result || [])
        } catch (error) {
            console.log("error",error)
        }
    }

    useEffect(() => {
      fetchGet();
    }, [])

    const handleAddSubmit = () => {
        setSubmit(!submit)
    }

    const handleSubmitRemove = () => {
        setSubmit(!submit)
    }
    return (
        <div className=''>
            <div className={`flex flex-row justify-between items-center ${submit ? "opacity-30" : "opacity-100"}`}>
                <div className='flex flex-col px-2'>
                    <h1 className='text-3xl font-bold'>Coupon Management</h1>
                    <p className='text-gray-500 mt-2'>Dashboard <span className='text-black ml-5'>Coupon Management</span> </p>
                </div>
                <button onClick={handleAddSubmit} className='py-2 px-7 bg-amber-300 font-bold'>Add Coupon</button>
            </div>
            <div>
                <table className={`min-w-full bg-white shadow-md rounded-lg overflow-hidden mt-5 ${submit ? "opacity-30":"opacity-100"}`}>
                    <thead className="">
                        <tr>
                            <th className="py-3 px-4 text-left text-md font-semibold text-black">No.</th>
                            <th className="py-3 px-4 text-left text-md font-semibold text-black">Coupon Name</th>
                            <th className="py-3 px-4 text-left text-md font-semibold text-black">Min Purchase</th>
                            <th className="py-3 px-4 text-left text-md font-semibold text-black">Discount Price</th>
                            <th className="py-3 px-4 text-left text-md font-semibold text-black">Coupon Code</th>
                            <th className="py-3 px-4 text-left text-md font-semibold text-black">Date</th>
                            <th className="py-3 px-4 text-left text-md font-semibold text-black">Status</th>
                            <th className="py-3 px-4 text-left text-md font-semibold text-black">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                          users.map((curval) => {
                            const {No, Coupon_Name, Min_Purchase,Discount_Price,Coupon_Code,Date,Status} = curval;
                            return (
                              <tr key={No}>
                                <td className='px-4 py-2'>{No}</td>
                                <td className='px-4'>{Coupon_Name}</td>
                                <td className='px-4'>{Min_Purchase}</td>
                                <td className='px-4'>{Discount_Price}</td>
                                <td className='px-4'>{Coupon_Code}</td>
                                <td className='px-4'>{Date}</td>
                                <td>{}</td>
                                <td>{}</td>
                              </tr>
                            )
                          })
                        }
                    </tbody>
                </table>
                <div className='flex justify-end bottom-0 mt-5 h-[20px] items-center'>
                    <Stack spacing={0}>
                        <Pagination count={10} variant='outlined' shape='rounded' />
                    </Stack>
                </div>
                {
                    submit ? (
                        <div className='flex flex-col justify-center items-center relative'>
                        <form  className='flex flex-col bg-white mt-10 py-1 px-10 justify-center items-center' >
                          <div className='flex justify-end items-end '>
                          <Image src={assets.can} alt='remove' className='ml-75' onClick={handleSubmitRemove}/>
                          </div>
                          <h1 className='text-2xl font-bold mb-1'>Add Coupon</h1>
                          <div className='flex flex-col justify-start mt-5 space-y-5'>
                            <div className='flex flex-col space-x-5 justify-start '>
                  
                              <label className='text-gray-400 mt-6'>Coupon Name</label>
                              <input type='text' name='product' placeholder='Name' className='font-bold border-1 border-gray-200 mt-2 py-2 px-3 text-black' />
                            </div>
                            <div className='flex flex-col space-x-5 justify-start '>
                              <label className='text-gray-400'>Minimum Purchase</label>
                              <input type='text' name='product' placeholder='Minimum Purchase' className='font-bold border-1 border-gray-200 mt-2 py-2 px-3 text-black' />
                            </div>
                            <div className='flex flex-col space-x-5 justify-start '>
                              <label className='text-gray-400'>Discount Price</label>
                              <input type='text' name='product' placeholder='Discount Price' className='font-bold border-1 border-gray-200 mt-2 py-2 px-3 text-black' />
                            </div>
                            <div className='flex flex-col space-x-5 justify-start '>
                  
                              <label className='text-gray-400'>Date</label>
                              <input type='date' name='date' placeholder='From - to' className='font-bold border-1 border-gray-200 mt-2 py-2 px-3 text-gray-400' />
                            </div>
                            <div className='flex flex-col space-x-5 justify-start '>
                  
                              <label className='text-gray-400'>Coupon Code</label>
                              <input type='text' name='offer' placeholder='Coupon Code' className='font-bold border-1 border-gray-200 mt-2 py-2 px-3 text-black' />
                            </div>
                          </div>
                          <div className='flex justify-center items-center mt-5'>
                            <button className='px-28 py-2 bg-amber-400 font-bold'>Submit</button>
                          </div>
                        </form>
                      </div>   
                        ) : null
                }
            </div>
        </div>

    )
}

export default Page
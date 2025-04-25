'use client'
import { assets } from '@/assests/assets';
import commonGetApis from '@/commonapi/Commonapi';
import { Pagination, Stack, TextField } from '@mui/material'
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import { toast } from 'react-toastify';

interface Users {
    fullname: string,
    user_email: string,
    user_id: number,
    user_status: number,
    user_mobile_no: string
}

const User = () => {
    const [input, setInput] = useState("")
    const [adds, setAdds] = useState(0)
    const [page, setPage] = useState(1)
    const [totalCount, setTotalCount] = useState(0)
    const [users, setUsers] = useState<Users[]>([])

    const fetchGet = async () => {
        try {
            const res = await commonGetApis(`getusers?pageNumber=${page}&pageLimit=5`)
            setTotalCount(res?.data?.Total_Count)
            setUsers(res?.data?.result)
        } catch (error) {
            console.log("error", error)
        }
    }

    const handleStatusChange = async (id:number, currentStatus:number) => {
        const token = localStorage.getItem("token");
        const refreshToken = localStorage.getItem("usertoken");
    
        if (!token || !refreshToken) {
          toast.error("Missing authentication tokens.");
          return;
        }
    
        const newStatus = currentStatus === 1 ? 0 : 1;
    
        const formData = new URLSearchParams();
        formData.append("id", String(id));
        formData.append("status", String(newStatus));
    
        try {
          const res = await axios.post(
            "http://192.168.2.181:3000/admin/updateuserstatus",
            formData,
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorizations": token,
                "language": "en",
                "refresh_token": refreshToken,
              },
            }
          );
    
          if (res.data) {
            toast.success("Status updated successfully");
            fetchGet();
          } else {
            toast.error("Failed to update status");
          }
        } catch (error) {
          console.error("Status change error:", error);
          toast.error("Something went wrong");
        }
      };

    useEffect(() => {
        fetchGet();
    }, [page])

    useEffect(() => {
        document.title = "Admin User";
    }, []);
    
    const count = Math.ceil(Number(totalCount) / 1)
    console.log("users123", users)
    return (
        <div className=''>
            <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-col px-2'>
                    <h1 className='text-3xl font-bold'>Users</h1>
                    <p className='text-gray-500 mt-2'>Dashboard <span className='text-black ml-5'>Users</span> </p>
                </div>
                <TextField id="outlined-basic" label="Search Users" variant="outlined" value={input} onChange={(e) => setInput(e.target.value)} />
            </div>
            <div>
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mt-5">
                    <thead className="">
                        <tr>
                            <th className="py-3 px-4 text-left text-md font-semibold text-black">User ID</th>
                            <th className="py-3 px-4 text-left text-md font-semibold text-black">Name</th>
                            <th className="py-3 px-4 text-left text-md font-semibold text-black">Mobile Number</th>
                            <th className="py-3 px-4 text-left text-md font-semibold text-black">Email</th>
                            <th className="py-3 px-4 text-left text-md font-semibold text-black">Status</th>
                        </tr>
                    </thead>
                    <tbody className='space-y-2.5'>
                        {
                            users?.filter(item => input == "" || item.fullname.toLowerCase().includes(input.toLowerCase())).map((curval, index) => {
                                const { fullname, user_email, user_id, user_status, user_mobile_no } = curval;
                                return (
                                    <tr key={user_id} className='space-y-2 px-2 py-2'>
                                        <td className='px-4 py-3'>{user_id}</td>
                                        <td className='px-4 py-3'><Link href={`/admin/user/${user_id}`}>{fullname}</Link></td>
                                        <td className='px-4 py-3'>{user_mobile_no}</td>
                                        <td className='px-4 py-3'>{user_email}</td>
                                        <td onClick={() => handleStatusChange(user_id, user_status)} className='px-2 py-2'>
                                            {
                                                user_status == 1 ? <span><Image src={assets.scrollon} alt='ON' /></span> : <span><Image src={assets.scrolloff} alt='OFF' /></span>
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <div className='flex justify-end bottom-0 mt-5 h-[20px] items-center'>
                    <Stack spacing={0}>
                        <Pagination page={page}
                            onChange={(e, page) => setPage(page)}
                            variant='outlined' shape='rounded'
                            count={count} />
                    </Stack>
                </div>
            </div>
        </div>

    )
}

export default User
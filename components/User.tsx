'use client'
import { assets } from '@/assests/assets';
import commonGetApis, { commonPostApis } from '@/commonapi/Commonapi';
import { InputAdornment, Pagination, Stack, TextField } from '@mui/material'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { IoSearchSharp } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import orderBy from 'lodash/orderBy';

interface Users {
    FullName: string,
    Email: string,
    User_id: number,
    Status: number,
    Mobile_no: string
}

const User = () => {
    const [input, setInput] = useState("")
    const [page, setPage] = useState(1)
    const [totalCount, setTotalCount] = useState(0)
    const [users, setUsers] = useState<Users[]>([])
    const [sortField, setSortField] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const route = useRouter();

    useEffect(() => {
        const refreshToken = localStorage.getItem("usertoken");
        if (!refreshToken) {
            route.replace('/');
        }
    }, []);

    const fetchGet = async () => {
        try {
            const res = await commonGetApis(`getusers?pageNumber=${page}&pageLimit=5&search=${input}`)
            setTotalCount(res?.data?.Total_Count)
            setUsers(res?.data?.result)
        } catch (error) {
            console.log("error", error)
        }
    }

    const handleStatusChange = async (id: number, currentStatus: number) => {

        const newStatus = currentStatus === 1 ? 0 : 1;

        const formData = new URLSearchParams();
        formData.append("id", String(id));
        formData.append("status", String(newStatus));

        try {
            const res = await commonPostApis("updateuserstatus", formData,);

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
    const setExportData = () => {
        if (!users.length) {
            toast.warning("No data to export");
            return;
        }

        const headers = ["User_id", "Email", "Status", "Mobile_no", "FullName"];
        const rows = users.map(item => [
            item.User_id,
            item.Email,
            item.Mobile_no,
            item.FullName,
            item.Status === 1 ? "Active" : "Inactive"
        ]);

        const csvContent =
            "data:text/csv;charset=utf-8," +
            [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "brands_export.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleSortItems = (field: keyof Users) => {
        const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        const sortedData = orderBy([...users], [field], [newOrder]);
        setUsers(sortedData);
        setSortField(field);
        setSortOrder(newOrder);
        toast.info(`${newOrder.toLocaleUpperCase()}ENDING ORDER`, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    };

    useEffect(() => {
        fetchGet();
        document.title = "Admin User";
    }, [input, page])

    const count = Math.ceil(Number(totalCount) / 10)
    return (
        <div className=''>
            <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-col px-2'>
                    <h1 className='text-3xl font-bold'>Users</h1>
                    <p className='text-gray-500 mt-2'><Link href={`/admin/dashboard`}>Dashboard</Link> <span className='ml-2.5'>{`>`}</span><span className='text-black ml-2.5'>Users</span> </p>
                </div>
                <div>
                    <TextField
                        id="outlined-basic"
                        label="Search User"
                        variant="outlined"
                        value={input}
                        onChange={(e) => setInput(e.target.value.trim())}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IoSearchSharp size={20} />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <button
                        className="px-4 py-4 bg-green-700 ml-5 w-20 font-bold text-md cursor-pointer"
                        onClick={() => setExportData()}
                    >
                        Export
                    </button>
                </div>
            </div>
            <div>
                <table className="min-w-full bg-white shadow-md overflow-hidden mt-5">
                    <thead className="">
                        <tr>
                            <th className="py-3 px-7 text-left text-md font-semibold text-black">
                                <div className='flex items-center'>
                                    User ID
                                    <Image src={assets.sort} alt="sort" height={13} width={13} className="ml-1" onClick={() => handleSortItems("User_id")} />
                                </div>
                            </th>
                            <th className="py-3 px-4 text-left text-md font-semibold text-black">
                                <div className='flex items-center'>
                                    Name
                                    <Image src={assets.sort} alt="sort" height={13} width={13} className="ml-1" onClick={() => handleSortItems("FullName")} />
                                </div>
                            </th>
                            <th className="py-3 px-5 text-left text-md font-semibold text-black">Mobile Number</th>
                            <th className="py-3 px-6 text-left text-md font-semibold text-black">Email</th>
                            <th className="py-3 px-4 text-left text-md font-semibold text-black">Status</th>
                        </tr>
                    </thead>
                    <tbody className='space-y-2.5'>
                        {
                            users?.filter(item => input == "" || item.FullName.toLowerCase().includes(input.toLowerCase())).map((curval, index) => {
                                const { User_id, Email, Status, Mobile_no, FullName } = curval;
                                return (
                                    <tr key={index} className='space-y-2 px-2 py-2'>
                                        <td className='px-7 py-3'>{User_id}</td>
                                        <td className='px-4 py-3'><Link href={`/admin/user/${User_id}`}>{FullName}</Link></td>
                                        <td className='px-6 py-3'>{Mobile_no}</td>
                                        <td className='px-4 py-3'>{Email}</td>
                                        <td onClick={() => handleStatusChange(User_id, Status)} className='px-4 py-2 cursor-pointer'>
                                            {
                                                Status == 1 ? <span><Image src={assets.scrollon} alt='ON' /></span> : <span><Image src={assets.scrolloff} alt='OFF' /></span>
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
                            count={count}
                            hideNextButton={!!input}
                            hidePrevButton={!!input}
                        />
                    </Stack>
                </div>
            </div>
        </div>

    )
}

export default User
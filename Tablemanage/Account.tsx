'use client'
import React from 'react'
import { images } from '@/newimg/images';
import Image from 'next/image';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';

const Account = () => {
    const tableItems = [
        { no: '01', label: "Jenil", contact: '1234567890', status: 'Completed', date: "10 Feb 2025", points: "200", statustrack: "Follow Up", action: images.d1 },
        { no: '02', label: "Neer", contact: '1234567890', status: 'Completed', date: "10 Feb 2025", points: "200", statustrack: "Follow Up", action: images.d1 },
        { no: '03', label: "Neer", contact: '1234567890', status: 'Cancelled', date: "10 Feb 2025", points: "200", statustrack: "Vaccine", action: images.d1 },
        { no: '04', label: "Neer", contact: '1234567890', status: 'Pending', date: "10 Feb 2025", points: "200", statustrack: "Vaccine", action: images.d1 },
        { no: '05', label: "Neer", contact: '1234567890', status: 'Completed', date: "10 Feb 2025", points: "200", statustrack: "Follow Up", action: images.d1 }
    ];

    const statusStyles = {
        Completed: 'bg-green-100 text-green-500',
        Cancelled: 'bg-red-200 text-red-500',
        Pending: 'bg-orange-100 text-orange-500',
    };

    const trackStyles = {
        'Follow Up': 'text-red-500',
        Vaccine: 'text-green-500',
    };

    return (
        <div className="w-full px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 gap-4 pb-4">
                <div className="flex flex-row items-center gap-4">
                    <Image
                        src={images.b1}
                        alt='User icon'
                        width={55}
                        height={55}
                        className="w-12 h-12 md:w-[55px] md:h-[55px]"
                    />
                    <h1 className="text-lg md:text-xl">
                        Total Credits
                        <br />
                        <span className="text-xl md:text-2xl text-cyan-500 font-bold">1000</span>
                    </h1>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center w-full sm:w-auto">
                    <FormControl sx={{
                        width: '100%',
                        '@media (min-width: 640px)': { width: 'auto' }
                    }}>
                        <Select
                            value="sms"
                            sx={{
                                height: 45,
                                paddingLeft: '8px',
                                borderColor: 'rgb(209, 213, 219)',
                                borderRadius: '6px',
                            }}>
                            <MenuItem value="sms">SMS Purchase</MenuItem>
                        </Select>
                    </FormControl>
                    <button className="bg-blue-600 text-white flex flex-row items-center px-3 h-[45px] rounded-md w-full sm:w-auto">
                        <Image
                            src={images.b2}
                            alt='Purchase icon'
                            height={20}
                            width={20}
                            className="mr-2"
                        />
                        Purchase
                    </button>
                </div>
            </div>
            <div className="mt-6">
                <h1 className="text-xl font-bold">Credits Used</h1>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 mt-4 p-4 rounded-md gap-4">
                    <input
                        type="text"
                        placeholder="Search name, contact numbers..."
                        className="w-full sm:w-[380px] h-[45px] px-4 border border-gray-300 rounded-md"
                    />
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                        <p className="text-gray-700">Filter by</p>
                        <TextField
                            type="date"
                            variant="outlined"
                            fullWidth
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    height: 45,
                                    width: { xs: '100%', sm: 150 },
                                    borderRadius: '6px',
                                },
                                '& .MuiOutlinedInput-input': {
                                    padding: '10px 14px',
                                    '&::placeholder': {
                                        color: 'text.disabled',
                                        opacity: 1,
                                    }
                                },
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            placeholder="Date"
                        />
                        <div className="relative w-full sm:w-[150px]">
                            <FormControl sx={{ width: '100%', '@media (min-width: 640px)': { width: 150 } }}>
                                <InputLabel id="status-label">Status</InputLabel>
                                <Select
                                    labelId="status-label"
                                    label="Status"
                                    defaultValue=""
                                    sx={{
                                        height: 45,
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'rgb(209, 213, 219)',
                                        },
                                        '&:hover .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'rgb(156, 163, 175)',
                                        },
                                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                            borderColor: '#3b82f6',
                                            borderWidth: 2,
                                        },
                                        borderRadius: '0.375rem',
                                    }}
                                >
                                    <MenuItem value="">None</MenuItem>
                                    <MenuItem value="active">Active</MenuItem>
                                    <MenuItem value="inactive">Inactive</MenuItem>
                                    <MenuItem value="pending">Pending</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 overflow-x-auto">
                <table className="min-w-[800px] w-full bg-white text-sm md:text-base shadow-md rounded-md">
                    <thead className="border-b border-gray-200 bg-gray-100">
                        <tr>
                            <th className="py-3 px-4 text-left font-semibold text-black">No</th>
                            <th className="py-3 px-4 text-left font-semibold text-black">Patient's Name</th>
                            <th className="py-3 px-4 text-left font-semibold text-black">Contact No.</th>
                            <th className="py-3 px-4 text-left font-semibold text-black">
                                <div className="flex items-center">
                                    Status
                                    <Image src={images.c1} alt="Sort icon" height={17} width={15} className="ml-1 mt-1" />
                                </div>
                            </th>
                            <th className="py-3 px-4 text-left font-semibold text-black">Date</th>
                            <th className="py-3 px-4 text-left font-semibold text-black">Used Points</th>
                            <th className="py-3 px-4 text-left font-semibold text-black">Status Track</th>
                            <th className="py-3 px-4 text-center font-semibold text-black">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableItems.map(({ no, label, contact, status, date, points, statustrack, action }) => (
                            <tr key={no} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="px-4 py-3">{no}</td>
                                <td className="px-4 py-3 text-indigo-700">{label}</td>
                                <td className="px-4 py-3">{contact}</td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 rounded-md ${statusStyles[status] || ''}`}>{status}</span>
                                </td>
                                <td className="px-4 py-3">{date}</td>
                                <td className="px-4 py-3">{points}</td>
                                <td className={`px-4 py-3 ${trackStyles[statustrack] || ''}`}>{statustrack}</td>
                                <td className="px-4 py-3 text-center">
                                    <Image src={action} alt="View action" height={20} width={20} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Account;

'use client'
import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import { FaSortDown } from "react-icons/fa";
import Image from 'next/image';
import { assets } from '@/assests/assets';
import commonGetApis from '@/commonapi/Commonapi';
import Link from 'next/link';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

interface Orderdetail {
    Total: number;
    Variation: number;
    order_product_Id: number;
    product_id: number
    product_name: string;
    product_price: number;
    product_quantity: number;
}

interface Order {
    order_no: number;
    order_status: number;
    order_type: number;
    payment_type: number;
}

interface All {
    shipping_charge: number;
    total: number;
    total_tax: number;
}

interface Status {
    order_status: number;
}

interface Address {
    address_line1: string;
    address_line2: string;
}
interface User {
    firstname: string;
    lastname: string;
    mobile_no: string;
    email: string;
}

const Orderid = ({ id }: any) => {
    const [input, setinput] = useState("")
    const [adds, setadds] = useState<Orderdetail[]>([])
    const [grandTotal, setGrandTotal] = useState("")
    const [all, setAll] = useState<All | null>(null)
    const [order, setOrder] = useState<Order | null>(null)
    const [user, setUser] = useState<User | null>(null);
    const [status, setStatus] = useState<number>(0); 
    const [address, setAddress] = useState<Address | null>(null);
    const [currentStatus, setCurrentStatus] = useState('');

    const steps = [
        { label: "New Order", icon: assets.ordernew, key: "new" },
        { label: "Preparing", icon: assets.prepares, key: "preparing" },
        { label: "Ready", icon: assets.ready, key: "ready" },
        { label: "Pickup", icon: assets.timer, key: "pickup" },
        { label: "Completed", icon: assets.done, key: "completed" }
    ];

    const fetchDetails = async () => {
        try {
            const res = await commonGetApis(`get_order_products_details?id=${id}`)

            if (res.data) {
                setadds(res?.data?.getData || [])
                setGrandTotal(res?.data?.Grand_Total || [])
                setOrder(res?.data?.getDataById || null);
                setUser(res?.data?.getDataById?.user || null);
                setStatus(res?.data?.getDataById?.order_status || 0);
                setAddress(res?.data?.getDataById?.address || null);                
                setAll(res?.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    console.log("123", all)

    useEffect(() => {
        document.title = "Admin Orderdetails"
        fetchDetails();
    }, []);

    const handlePrint = () => {
        window.print();
    }

    return (
        <div className=''>
            <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-col px-2'>
                    <h1 className='text-3xl font-bold'>Order Details</h1>
                    <p className='text-gray-500 mt-2'><Link href={`/admin/dashboard`}>Dashboard</Link> <span className='ml-2.5'>{`>`}</span><span className='text-gray-500 ml-2.5'><Link href={`/admin/orders`}>Orders</Link></span><span className='ml-2.5'>{`>`}</span> <span className='ml-2.5 text-black'>Order Details</span> </p>
                </div>
                <div className='flex flex-row space-x-5'>
                    <button
                        className='bg-amber-300 py-2 px-5'
                        onClick={handlePrint}
                    >
                        Print
                    </button>
                    <div className='flex flex-row items-center'>
                        <button className='bg-black py-2 px-5 text-white mr-3'>Action </button>
                    </div>
                </div>
            </div>
            <div className='flex mt-5 ml-1 flex-row'>
                <div className='flex flex-col'>
                    <div className='bg-white shadow-md w-[330px] h-[181px] mt-5 flex flex-col '>
                        <h1 className='px-8 mt-5 text-2xl font-bold ml-20'>{order?.order_no}</h1>
                        <div className='flex flex-row justify-between items-center mt-8 '>
                            <p className='ml-5 text-gray-400'>Order Type</p> <p className='mr-2'>{order?.order_type == 0 ? "Delivery" : "Selfservice"}</p>
                        </div>
                        <div className='flex flex-row justify-between mt-5 '>
                            <p className='ml-5 text-gray-400'>Payment Type</p> <p className='mr-2'>{order?.payment_type == 0 ? "Cash" : "Online"}</p>
                        </div>
                    </div>
                    <div className='flex flex-col bg-white shadow-md w-[330px] h-auto mt-5'>
                        <div className='flex flex-row items-center'>
                            <Image src={assets.dp} alt='User' height={100} width={100} />
                            <h1 className='text-xl font-bold'>{`${user?.firstname || ""} ${user?.lastname || ""}`}</h1>
                            </div>
                        <div className='flex flex-row ml-5 space-x-3 mt-3'>
                            <Image src={assets.mobile} alt='mobile' height={10} width={19} />
                            <p>{user?.mobile_no}</p>
                            </div>
                        <div className='flex flex-row ml-5 space-x-3 mt-5'>
                            <Image src={assets.mails} alt='mobile' height={10} width={19} />
                            <p>{user?.email}</p>
                        </div>
                        <div className='flex flex-row ml-5 space-x-3 mb-5 mt-5'>
                            <Image src={assets.location} alt='mobile' height={10} width={19} />
                            <p>{`${address?.address_line1 || ""} ${address?.address_line2 || ""}`}</p>
                            </div>
                    </div>
                </div>
                <div className='flex flex-col w-full'>
                    <div className='bg-white shadow-md px-8 py-2 ml-7 mt-5 h-[140px] w-auto flex justify-center items-center'>
                        <div className="flex items-start justify-between w-full px-10">
                            {steps.map((step, index) => {
                                const isActive = index === status - 1;
                                const isCompleted = index < status - 1;
                                const isLast = index === steps.length - 1;

                                return (
                                    <React.Fragment key={step.key}>
                                        <div className="flex flex-col items-center relative">
                                            <div className="z-10">
                                                <Image
                                                    src={step.icon}
                                                    alt={step.label}
                                                    width={50}
                                                    height={50}
                                                    className={`${isActive || isCompleted ? 'text-green-700' : 'grayscale'}`}
                                                />
                                            </div>

                                            <p className={`mt-2 text-sm font-semibold text-center ${isActive || isCompleted ? 'text-green-700' : 'text-gray-400'}`}>
                                                {step.label}
                                            </p>
                                        </div>

                                        {!isLast && (
                                            <div className="flex items-center flex-1 h-full relative top-[25px]">
                                                <div
                                                    className={`h-1 w-full ${isCompleted ? 'bg-green-700' : 'bg-gray-300'}`}
                                                ></div>
                                            </div>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    </div>
                    <div className='bg-white shadow-md w-auto h-auto mt-5 ml-7'>
                        <table className="min-w-full bg-white rounded-lg overflow-hidden  mt-1">
                            <thead className="">
                                <tr>
                                    <th className="py-3 px-4 text-left text-md font-semibold text-black">No.</th>
                                    <th className="py-3 px-4 text-left text-md font-semibold text-black">Product Name</th>
                                    <th className="py-3 px-4 text-left text-md font-semibold text-black">Variation</th>
                                    <th className="py-3 px-4 text-left text-md font-semibold text-black">Price</th>
                                    <th className="py-3 px-4 text-left text-md font-semibold text-black">Qty</th>
                                    <th className="py-3 px-4 text-left text-md font-semibold text-black">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    adds.map((curval, idx) => {
                                        return (
                                            <tr key={idx} className='py-3 px-4 border-b border-gray-100'>
                                                <td className='py-3 px-4'>{idx + 1}</td>
                                                <td className='py-3 px-4'>{curval.product_name}</td>
                                                <td className='py-3 px-4'>{curval.Variation}</td>
                                                <td className='py-3 px-4'>{curval.product_price}</td>
                                                <td className='py-3 px-4'>{curval.product_quantity}</td>
                                                <td className='py-3 px-4'>{curval.Total}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <div className="flex flex-col gap-4 mt-4 p-4 rounded-lg lg:w-auto md:w-auto sm:w-auto ml-25">
                            <div className="flex justify-between items-center">
                                <p className="text-lg font-semibold text-black">Total</p>
                                <p className="text-lg font-medium text-black">{all?.total}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-lg font-semibold text-green-600">Shipping Charge</p>
                                <p className="text-lg font-medium text-green-600">{all?.shipping_charge}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-lg font-semibold text-black">Tax</p>
                                <p className="text-lg font-medium text-black">{all?.total_tax}</p>
                            </div>
                            <div className=" pt-4 flex justify-between items-center">
                                <p className="text-xl font-bold text-black">Grand Total</p>
                                <p className="text-xl font-bold text-black">{grandTotal}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Orderid

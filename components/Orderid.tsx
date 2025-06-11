'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { assets } from '@/assests/assets';
import commonGetApis from '@/commonapi/Commonapi';
import Link from 'next/link';
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
interface OrderidProps {
    id: number;
}
const Orderid = ({ id }: OrderidProps) => {
    const [adds, setadds] = useState<Orderdetail[]>([])
    const [grandTotal, setGrandTotal] = useState("")
    const [all, setAll] = useState<All | null>(null)
    const [order, setOrder] = useState<Order | null>(null)
    const [user, setUser] = useState<User | null>(null);
    const [status, setStatus] = useState<number>(0);
    const [address, setAddress] = useState<Address | null>(null);
    const steps = [
        { label: "New Order", icon: assets.ordernew, icona: assets.ordernew1, key: "new" },
        { label: "Preparing", icon: assets.prepares, icona: assets.prepares, key: "preparing" },
        { label: "Ready", icon: assets.ready, icona: assets.ready1, key: "ready" },
        { label: "Pickup", icon: assets.timer, icona: assets.timer1, key: "pickup" },
        { label: "Completed", icon: assets.done, icona: assets.done1, key: "completed" },
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
    useEffect(() => {
        fetchDetails();
    }, []);
    const handlePrint = () => {
        window.print();
    }
    return (
        <div className='md:h-full h-146 overflow-y-auto w-full'>
            <div className='flex flex-row justify-between items-center'>
                <div className='flex flex-col px-2'>
                    <h1 className='lg:text-3xl md:text-2xl text-xl font-bold'>Order Details</h1>
                    <p className='text-gray-500 mt-2 md:text-xl text-sm'><Link href={`/admin/dashboard`}>Dashboard</Link> <span className='md:ml-2.5 ml-1'>{`>`}</span><span className='text-gray-500 md:ml-2.5 ml-1'><Link href={`/admin/orders`}>Orders</Link></span><span className='md:ml-2.5 ml-1'>{`>`}</span> <span className='md:ml-2.5 ml-1 text-black'>Order Details</span> </p>
                </div>
                <div className='flex flex-row md:space-x-5 space-x-2'>
                    <button
                        className='bg-amber-300 md:py-2 md:px-5 px-1 py-2 md:text-md text-sm'
                        onClick={handlePrint}
                    >
                        Print
                    </button>
                    <div className='flex flex-row items-center'>
                        <button className='bg-black md:py-2 md:px-5 px-1 text-white mr-3 md:text-md text-sm py-2'>Action </button>
                    </div>
                </div>
            </div>
            <div className='flex mt-5 ml-1 md:flex-row flex-col'>
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
                <div className="flex flex-col w-full">
                    <div className="bg-white shadow-md px-4 sm:px-8 py-4 mt-5 mx-2 sm:ml-7 sm:mr-7 rounded-md">
                        <div className="flex flex-col sm:flex-row sm:justify-between items-center sm:items-start w-full gap-6 sm:gap-0">
                            {steps.map((step, index) => {
                                const isActive = index === status - 1;
                                const isCompleted = index < status - 1;
                                const isLast = index === steps.length - 1;
                                return (
                                    <React.Fragment key={step.key}>
                                        <div className="flex flex-col items-center relative w-full sm:w-auto">
                                            <div className="z-10">
                                                <Image
                                                    src={isActive || isCompleted ? step.icona : step.icon}
                                                    alt={step.label}
                                                    width={40}
                                                    height={40}
                                                    className={`${isActive || isCompleted ? 'border border-green-700 rounded-full' : 'grayscale'}`} />
                                            </div>
                                            <p className={`mt-2 text-xs sm:text-sm font-semibold text-center ${isActive || isCompleted ? 'text-green-700' : 'text-gray-400'}`}>
                                                {step.label}
                                            </p>
                                        </div>
                                        {!isLast && (
                                            <div className="hidden sm:flex items-center flex-1 h-full relative top-[22px] mx-2">
                                                <div className={`h-1 w-full ${isCompleted ? 'bg-green-700' : 'bg-gray-300'}`}>
                                                </div>
                                            </div>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    </div>
                    <div className="bg-white shadow-md w-full mt-5 mx-2 sm:ml-7 rounded-md overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white rounded-lg mt-1">
                                <thead>
                                    <tr>
                                        <th className="py-3 px-4 text-left text-sm sm:text-md font-semibold text-black">No.</th>
                                        <th className="py-3 px-4 text-left text-sm sm:text-md font-semibold text-black">Product Name</th>
                                        <th className="py-3 px-4 text-left text-sm sm:text-md font-semibold text-black">Variation</th>
                                        <th className="py-3 px-4 text-left text-sm sm:text-md font-semibold text-black">Price</th>
                                        <th className="py-3 px-4 text-left text-sm sm:text-md font-semibold text-black">Qty</th>
                                        <th className="py-3 px-4 text-left text-sm sm:text-md font-semibold text-black">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {adds.map((curval, idx) => (
                                        <tr key={idx} className="border-b border-gray-100">
                                            <td className="py-3 px-4 text-sm">{idx + 1}</td>
                                            <td className="py-3 px-4 text-sm">{curval.product_name}</td>
                                            <td className="py-3 px-4 text-sm">{curval.Variation}</td>
                                            <td className="py-3 px-4 text-sm">{curval.product_price}</td>
                                            <td className="py-3 px-4 text-sm">{curval.product_quantity}</td>
                                            <td className="py-3 px-4 text-sm">{curval.Total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex flex-col gap-4 mt-6 p-2 md:p-4 sm:p-6 bg-gray-50 rounded-lg w-full sm:w-[300px] md:w-3xl mx-auto">
                            <div className="flex justify-between">
                                <p className="text-base sm:text-lg font-semibold text-black">Total</p>
                                <p className="text-base sm:text-lg font-medium text-black">{all?.total}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-base sm:text-lg font-semibold text-green-600">Shipping Charge</p>
                                <p className="text-base sm:text-lg font-medium text-green-600">{all?.shipping_charge}</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-base sm:text-lg font-semibold text-black">Tax</p>
                                <p className="text-base sm:text-lg font-medium text-black">{all?.total_tax}</p>
                            </div>
                            <div className="pt-4 flex justify-between items-center border-t border-gray-200">
                                <p className="text-lg sm:text-xl font-bold text-black">Grand Total</p>
                                <p className="text-lg sm:text-xl font-bold text-black">{grandTotal}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Orderid

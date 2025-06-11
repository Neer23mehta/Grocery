'use client'
import { assets } from '@/assests/assets';
import commonGetApis from '@/commonapi/Commonapi'
import Image from 'next/image';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import orderBy from 'lodash/orderBy';
import { toast } from 'react-toastify';
interface Orders {
  Date: string;
  Firstname: string;
  Lastname: string;
  Order_no: number;
  Payment_type: number;
  Status: number;
  Total_Amount: number;
  Order_id: number;
}
const Orders = () => {
  const [adds, setAdds] = useState<Orders[]>([])
  const [sortField, setSortField] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const fetchOrders = async () => {
    try {
      const res = await commonGetApis("get_orders");
      if (res.data) {
        setAdds(res?.data?.result)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleSortItems = (field: keyof Orders) => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    const sortedData = orderBy([...adds], [field], [newOrder]);
    setAdds(sortedData);
    setSortField(field);
    setSortOrder(newOrder);
    toast.info(`${newOrder.toLocaleUpperCase()}ENDING ORDER`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  useEffect(() => {
    fetchOrders();
  }, [])
  const getStatusText = (status: number) => {
    switch (status) {
      case 2:
        return { text: "Reject", class: "text-red-700" };
      case 3:
        return { text: "Completed", class: "text-green-500" };
      default:
        return { text: "Preparing", class: "text-orange-500" };
    }
  }
  return (
    <div className='w-full md:h-full overflow-x-hidden overflow-y-auto'>
      <div className='flex flex-row justify-between items-center'>
        <div className='flex flex-col px-2'>
          <h1 className='md:text-3xl text-xl font-bold'>Orders</h1>
          <p className='text-gray-500 mt-2 md:text-xl text-md'><Link href={`/admin/dashboard`}>Dashboard</Link> <span className='ml-2.5'>{`>`}</span><span className='text-black ml-2.5'>Orders</span> </p>
        </div>
      </div>
      <div>
        <div className='w-full overflow-x-auto'>
          <table className="min-w-full bg-white shadow-md overflow-hidden mt-5">
            <thead className="">
              <tr>
                <th className="py-4 px-7 text-left text-md font-semibold text-black">
                  <div className='flex flex-row items-center md:text-[17px] text-[13px]'>
                    Order No.
                    <Image src={assets.sort} alt="sort" height={13} width={13} className="ml-1" onClick={() => handleSortItems("Order_no")} />
                  </div>
                </th>
                <th className="py-4 px-7 text-left text-md font-semibold text-black">
                <div className='flex flex-row items-center md:text-[17px] text-[13px]'>
                Date
                    <Image src={assets.sort} alt="sort" height={13} width={13} className="ml-1" onClick={() => handleSortItems("Date")} />
                  </div>
                </th>
                <th className="py-4 px-5 text-left md:text-[17px] text-[13px] font-semibold text-black">User Details</th>
                <th className="py-4 px-4 text-left md:text-[17px] text-[13px] font-semibold text-black">Amount</th>
                <th className="py-4 px-4 text-left md:text-[17px] text-[13px] font-semibold text-black">Payment Type</th>
                <th className="py-4 px-4 text-left md:text-[17px] text-[13px] font-semibold text-black">
                  <div className='flex items-center'>
                    Status
                    <Image src={assets.sort} alt="sort" height={13} width={13} className="ml-1" onClick={() => handleSortItems("Status")} />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {
                adds.map((curVal, index) => {
                  const { Date, Firstname, Lastname, Order_no, Payment_type, Status, Total_Amount, Order_id } = curVal;
                  const { text, class: statusClass } = getStatusText(Status);
                  return (
                    <tr key={index}>
                      <td className='px-7 py-3 md:text-[17px] text-[13px]'><Link href={`/admin/orders/${Order_id}`}>{Order_no}</Link></td>
                      <td className='px-4 py-3 md:text-[17px] text-[13px]'>{Date.slice(0, 10)}</td>
                      <td className='px-4 py-3 md:text-[17px] text-[13px]'>{`${Firstname} ${Lastname}`}</td>
                      <td className='px-4 py-3 md:text-[17px] text-[13px]'>{Total_Amount}</td>
                      <td className='px-4 py-5 md:text-[17px] text-[13px]'>{Payment_type === 0 ? "Cash" : "Card"}</td>
                      <td className={`px-4 py-3 md:text-[17px] text-[13px] ${statusClass}`}>{text}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
        {adds.length === 0 && (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">No Orders found</p>
        </div>
      )}
      </div>
    </div>
  )
}
export default Orders

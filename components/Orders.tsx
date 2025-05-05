'use client'
import commonGetApis from '@/commonapi/Commonapi'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

interface Orders {
  Date: string;
  Firstname: string;
  Lastname: string;
  Order_no: number;
  Payment_type: number;
  Status: number;
  Total_Amount: number;
  Order_id:number;
}

const Orders = () => {
  const [adds, setAdds] = useState<Orders[]>([])

  const fetchOrders = async () => {
    try {
      const res = await commonGetApis("get_orders");

      if (res.data) {
        setAdds(res?.data?.result)
      }
    } catch (error) {
      console.log(error)
      // toast.error("Something went Wrong")
    }
  }

  console.log("ads121",adds)
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

  useEffect(() => {
    document.title="Admin Orders"
  },[])

  return (
    <div className=''>
      <div className='flex flex-row justify-between items-center'>
        <div className='flex flex-col px-2'>
          <h1 className='text-3xl font-bold'>Orders</h1>
          <p className='text-gray-500 mt-2'><Link href={`/admin/dashboard`}>Dashboard</Link> <span className='ml-2.5'>{`>`}</span><span className='text-black ml-2.5'>Orders</span> </p>
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
              adds.map((curVal, index) => {
                const { Date, Firstname, Lastname, Order_no, Payment_type, Status, Total_Amount,Order_id } = curVal;
                const { text, class: statusClass } = getStatusText(Status);

                return (
                  <tr key={index}>
                    <td className='px-4 py-3'><Link href={`/admin/orders/${Order_id}`}>{Order_no}</Link></td>
                    <td className='px-4 py-3'>{Date.slice(0, 10)}</td>
                    <td className='px-4 py-3'>{`${Firstname} ${Lastname}`}</td>
                    <td className='px-4 py-3'>{Total_Amount}</td>
                    <td className='px-4 py-3'>{Payment_type === 0 ? "Cash" : "Card"}</td>
                    <td className={`px-4 py-3 ${statusClass}`}>{text}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Orders

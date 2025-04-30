'use client'
import React, { useEffect, useState } from 'react'
import commonGetApis from '@/commonapi/Commonapi'
// import IndiaMap from "@/Grocery/India"
import { toast } from 'react-toastify'
import Link from 'next/link'
import CountUp from 'react-countup';
import { Doughnut } from 'react-chartjs-2'
import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);
  

interface Alldetails {
  brands_count:number;
  category_count:number;
  coupon_count:number;
  product_count:number;
  sub_category_count:number;
  user_count:number;
  order_count:number;
}

const Dashboard = () => {
  const [orders, setOrders] = useState<number>(0);
  const [dashboard, setDashboard] = useState<Alldetails>({
    brands_count: 0,
    category_count: 0,
    coupon_count: 0,
    product_count: 0,
    sub_category_count: 0,
    user_count: 0,
    order_count: 0,
    });

   
    const fetchDashboard = async () => {
      try {
        const res = await commonGetApis("get_dashboard_detail")
        if(res?.data){
          setDashboard(res?.data)
        }
        else {
          toast.error("Data is Not Available")
        }
      } catch (error) {
        console.log(error)
        toast.error("Something went Wrong")
      }
    }

    console.log("dash12",dashboard)
    useEffect(() => {
      fetchDashboard();
    },[])

      useEffect(() => {
                document.title = "Admin Dashboard";
          }, []);

  return (
<div className="flex flex-col items-center px-4 py-8 bg-gray-100 w-full h-full">
  <h1 className="text-4xl font-bold mb-10 text-center text-black">Dashboard</h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-7xl">
    {[
      { title: 'Users', value: dashboard.user_count , name:'user' , image:"👤" },
      { title: 'Brands', value: dashboard.brands_count, name:'brands', image:"🏷️" },
      { title: 'Products', value: dashboard.product_count, name:'products', image:"📦" },
      { title: 'Categories', value: dashboard.category_count, name:'category/categories', image:"🗂️" },
      { title: 'Sub-Categories', value: dashboard.sub_category_count, name:'category/subcategories', image:"📁" },
      { title: 'Orders', value: dashboard.order_count, name:'orders', image:"🧾" },
      { title: 'Coupon', value: dashboard.coupon_count, name:'couponmanage', image:"🎟️" }
        ].map((item, index) => (
        <Link href={`/admin/${item.name}`} key={index}>
      <div
        key={index}
        className="bg-white text-black shadow-lg rounded-lg p-6 flex flex-col justify-center hover:scale-105 transition-transform duration-300"
      >
        <div className='flex flex-row justify-between items-center'>
        <h2 className="text-2xl font-semibold">{item.title}</h2>
        <h2 className='text-3xl'>{item.image}</h2>
        </div>
        <p className="mt-2 text-lg font-bold">Total: <CountUp end={item.value} /></p>
      </div>
      </Link>
    ))}
  </div>
  <div>
    {/* <IndiaMap/> */}
  </div>
  <div className='flex flex-row justify-center items-center space-x-7'>
  <div className="w-full min-w-2xl mt-20 bg-white p-6 rounded-lg shadow-lg">
  <h2 className="text-2xl font-bold mb-4 text-black">Overview Chart</h2>
  <Bar
    data={{
      labels: ['Users', 'Brands', 'Products', 'Categories', 'Sub-Categories', 'Orders', 'Coupons'],
      datasets: [
        {
          label: 'Total Count',
          data: [dashboard.user_count, dashboard.brands_count, dashboard.product_count, dashboard.category_count, dashboard.sub_category_count, dashboard.order_count, dashboard.coupon_count],
          backgroundColor: [
            '#3b82f6', '#facc15', '#10b981', '#f97316', '#a855f7', '#ef4444', '#0ea5e9'
          ],
        },
      ],
    }}
    options={{
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
        },
      },
    }}
  />
</div>
<div className="w-full max-w-3xl mt-18 bg-white p-6 rounded-lg shadow-lg">
  <h2 className="text-2xl font-bold mb-4 text-black">Data Distribution</h2>
  <Doughnut
    data={{
      labels: ['Users', 'Brands', 'Products', 'Categories', 'Sub-Categories', 'Orders', 'Coupons'],
      datasets: [
        {
          label: 'Total Count',
          data: [dashboard.user_count, dashboard.brands_count, dashboard.product_count, dashboard.category_count, dashboard.sub_category_count, dashboard.order_count, dashboard.coupon_count],
          backgroundColor: [
            '#3b82f6', '#facc15', '#10b981', '#f97316', '#a855f7', '#ef4444', '#0ea5e9'
          ],
          borderWidth: 1
        }
      ]
    }}
    options={{
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        },
        tooltip: {
          callbacks: {
            label: context => `${context.label}: ${context.raw}`
          }
        }
      }
    }}
  />
</div>

</div>
</div>
  )
}

export default Dashboard
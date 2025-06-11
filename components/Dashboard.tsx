'use client'
import React, { useEffect, useState } from 'react'
import commonGetApis from '@/commonapi/Commonapi'
import { toast } from 'react-toastify'
import Link from 'next/link'
import CountUp from 'react-countup';
import { Doughnut } from 'react-chartjs-2'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend, } from 'chart.js';
import { Skeleton } from '@mui/material'
import { LineElement, PointElement, LineController } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useRouter } from 'next/navigation'
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LineController
);
interface Alldetails {
  brands_count: number;
  category_count: number;
  coupon_count: number;
  product_count: number;
  sub_category_count: number;
  user_count: number;
  order_count: number;
}
const Dashboard = () => {
  const [dashboard, setDashboard] = useState<Alldetails>({
    brands_count: 0,
    category_count: 0,
    coupon_count: 0,
    product_count: 0,
    sub_category_count: 0,
    user_count: 0,
    order_count: 0,
  });
  const router = useRouter();
  const fetchDashboard = async () => {
    try {
      const res = await commonGetApis("get_dashboard_detail")
      if (res?.data) {
        setDashboard(res?.data)
      }
      else {
        toast.error(`${res.data.message}`)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchDashboard();
  }, [])
  return (
    <div className="flex flex-col items-start md:px-4 py-1 md:py-8 bg-gray-100 w-full h-146 md:h-full overflow-y-auto">
      <h1 className="text-4xl font-bold mb-10 text-center text-black">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-7xl">
        {[
          { title: 'Users', value: dashboard.user_count, name: 'user', image: "👤" },
          { title: 'Brands', value: dashboard.brands_count, name: 'brands', image: "🏷️" },
          { title: 'Products', value: dashboard.product_count, name: 'products', image: "📦" },
          { title: 'Categories', value: dashboard.category_count, name: 'category/categories', image: "🗂️" },
          { title: 'Sub-Categories', value: dashboard.sub_category_count, name: 'category/subcategories', image: "📁" },
          { title: 'Orders', value: dashboard.order_count, name: 'orders', image: "🧾" },
          { title: 'Coupon', value: dashboard.coupon_count, name: 'couponmanage', image: "🎟️" },
          { title: 'Admin-Monitor', value: 1, name: '', image: "🧑" }
        ].map((item, index) => (
          <Link href={`/admin/${item.name}`} key={index}>
            <div
              className="bg-white text-black shadow-lg rounded-lg p-6 flex flex-col justify-center hover:scale-105 transition-transform duration-300">
              <div className='flex flex-row justify-between items-center'>
                <h2 className="text-2xl font-semibold">
                  {dashboard.user_count === 0 && dashboard.order_count === 0 ? (
                    <Skeleton width={100} />
                  ) : (
                    item.title
                  )}
                </h2>
                <h2 className='text-3xl'>{item.image}</h2>
              </div>
              <p className="mt-2 text-lg font-bold">
                Total: {dashboard.user_count === 0 && dashboard.order_count === 0 ? (
                  <Skeleton width={50} />
                ) : (
                  <CountUp end={item.value} />
                )}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-stretch gap-6 mt-12 w-full max-w-7xl">
        <div className="w-full lg:w-1/2 bg-white p-4 md:p-6 rounded-lg shadow-lg">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-black">Overview Chart</h2>
          <Bar
            data={{
              labels: ['Users', 'Brands', 'Products', 'Categories', 'Sub-Categories', 'Orders', 'Coupons'],
              datasets: [
                {
                  label: 'Total Count',
                  data: [dashboard.user_count, dashboard.brands_count, dashboard.product_count, dashboard.category_count, dashboard.sub_category_count, dashboard.order_count, dashboard.coupon_count],
                  backgroundColor: ['#3b82f6', '#facc15', '#10b981', '#f97316', '#a855f7', '#ef4444', '#0ea5e9'],
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
              },
            }}
          />
        </div>

        <div className="w-full lg:w-1/2 bg-white p-4 md:p-6 rounded-lg shadow-lg">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-black">Data Distribution</h2>
          <Doughnut
            data={{
              labels: ['Users', 'Brands', 'Products', 'Categories', 'Sub-Categories', 'Orders', 'Coupons'],
              datasets: [
                {
                  label: 'Total Count',
                  data: [dashboard.user_count, dashboard.brands_count, dashboard.product_count, dashboard.category_count, dashboard.sub_category_count, dashboard.order_count, dashboard.coupon_count],
                  backgroundColor: ['#3b82f6', '#facc15', '#10b981', '#f97316', '#a855f7', '#ef4444', '#0ea5e9'],
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: { position: 'bottom' },
              },
            }}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-start w-full max-w-7xl gap-6 mt-20">
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-black">Trends per Module</h2>
          <Line
            data={{
              labels: ['Users', 'Brands', 'Products', 'Categories', 'Sub-categories', 'Orders', 'Coupons'],
              datasets: [
                {
                  label: 'Orders Trend',
                  data: [dashboard.user_count, dashboard.brands_count, dashboard.product_count, dashboard.category_count, dashboard.sub_category_count, dashboard.order_count, dashboard.coupon_count],
                  borderColor: '#3b82f6',
                  backgroundColor: 'rgba(59, 130, 246, 0.2)',
                  tension: 0.3,
                  fill: true,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: true,
                  position: 'top',
                },
                title: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }} />
        </div>
        <div className="w-full md:w-1/2 h-[400px] bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-black">Map</h2>
          <div className="h-[calc(100%-2rem)] w-full">
            <MapContainer
              center={[22.9734, 78.6569]}
              zoom={5}
              style={{ height: '100%', width: '100%' }}
              className="rounded-md overflow-hidden">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Dashboard

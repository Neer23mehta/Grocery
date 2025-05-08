'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import commonGetApis from '@/commonapi/Commonapi';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [userCount, setUserCount] = useState<number>(0);
  const [orderCount, setOrderCount] = useState<number>(0);
  const [productCount, setProductCount] = useState<number>(0);

  const router = useRouter();

  useEffect(() => {
    const refreshToken = localStorage.getItem("usertoken");
    if (!refreshToken) {
      router.replace('/'); 
    }
  }, []);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await commonGetApis("get_dashboard_detail");
        if (res?.data) {
          setUserCount(res.data.user_count || 0);
          setOrderCount(res.data.order_count || 0);
          setProductCount(res.data.product_count || 0);
        } else {
          toast.error("Dashboard data unavailable");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load dashboard data");
      }
    };

    fetchDashboard();
  }, []);

  const adminLinks = [
    { label: 'Dashboard', href: '/admin/dashboard', color: 'bg-blue-500' },
    { label: 'Users', href: '/admin/user', color: 'bg-green-500' },
    { label: 'Products', href: '/admin/products', color: 'bg-purple-500' },
    { label: 'Orders', href: '/admin/orders', color: 'bg-yellow-500' },
    { label: 'Categories', href: '/admin/category/categories', color: 'bg-pink-500' },
    { label: 'Subcategories', href: '/admin/category/subcategories', color: 'bg-indigo-500' },
    { label: 'Brands', href: '/admin/brands', color: 'bg-rose-500' },
    { label: 'Coupon Management', href: '/admin/couponmanage', color: 'bg-orange-500' },
    { label: 'Home Management', href: '/admin/homemanage', color: 'bg-teal-500' },
    { label: 'Pages', href: '/admin/pages', color: 'bg-cyan-500' },
    { label: 'FAQ', href: '/admin/faq', color: 'bg-lime-500' },
    // { label: 'Admin', href: '/admin', color: 'bg-sky-700' },
    { label: 'Login', href: '/', color: 'bg-pink-700' },
    // { label: 'Change-Password', href: '/changepassword', color: 'bg-rose-700' },
    // { label: 'Forget-Password', href: '/forget', color: 'bg-purple-700' },
    // { label: 'Verify', href: '/verify', color: 'bg-violet-700' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
        <p className="text-gray-600 mb-10">Manage everything from this control panel.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-gray-700">Users</h2>
            <p className="text-2xl font-bold text-blue-600 mt-2">{userCount}</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-gray-700">Orders</h2>
            <p className="text-2xl font-bold text-green-600 mt-2">{orderCount}</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-gray-700">Products</h2>
            <p className="text-2xl font-bold text-purple-600 mt-2">{productCount}</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-gray-700">Revenue</h2>
            <p className="text-2xl font-bold text-amber-500 mt-2">{"$ 1 Billion"}</p>
          </div>
        </div>

        {/* Colored Admin Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminLinks.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className={`${item.color} text-white p-6 rounded-xl shadow text-center font-semibold hover:opacity-90 transition`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;

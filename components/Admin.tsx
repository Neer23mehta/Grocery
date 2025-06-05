'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import commonGetApis from '@/commonapi/Commonapi';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

const Admin = () => {
  const router = useRouter();

  useEffect(() => {
    const refreshToken = localStorage.getItem("usertoken");
    // if (!refreshToken) {
    //   router.replace('/'); 
    // }
  }, []);

  const {data} = useQuery({
    queryKey:["user"],
    queryFn: async () => {
      const res = await commonGetApis("get_dashboard_detail")
      return res.data;
    },
    staleTime: 10000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: false,
  })

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
    { label: 'Login', href: '/', color: 'bg-pink-700' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
        <p className="text-gray-600 mb-10">Manage everything from this control panel.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-gray-700">Users</h2>
            <p className="text-2xl font-bold text-blue-600 mt-2">{data?.user_count}</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-gray-700">Orders</h2>
            <p className="text-2xl font-bold text-green-600 mt-2">{data?.order_count}</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-gray-700">Products</h2>
            <p className="text-2xl font-bold text-purple-600 mt-2">{data?.product_count}</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition">
            <h2 className="text-lg font-semibold text-gray-700">Revenue</h2>
            <p className="text-2xl font-bold text-amber-500 mt-2">{"$ 1 Billion"}</p>
          </div>
        </div>

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

export default Admin;

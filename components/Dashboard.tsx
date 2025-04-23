'use client'
import React, { useEffect, useState } from 'react'
import commonGetApis from '@/commonapi/Commonapi'
import { toast } from 'react-toastify'

const Dashboard = () => {
    const [brands, setBrands] = useState([]);
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [users, setUsers] = useState([]);
    const [coupons, setCoupons] = useState([]);
    const fetchOrderApis = async () => {
        try {
            const res = await commonGetApis("")
        } catch (error) {
            console.log(error)
            toast.error("Something went Wrong")
        }
    }

    const fetchUserApis = async () => {
        try {
            const res = await commonGetApis("getusers?pageNumber=1&pageLimit=5")

            if(res?.data){
                setUsers(res?.data?.Total_Count)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went Wrong")
        }
    }
    const fetchProductApis = async () => {
        try {
            const res = await commonGetApis("get_products?pageNumber=1&pageLimit=10")

            if(res?.data){
                setProducts(res?.data?.Total_Count)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went Wrong")
        }
    }
    const fetchCategoryApis = async () => {
        try {
            const res = await commonGetApis("getcategories?pageNumber=1&pageLimit=10")

            if(res?.data){
                setCategory(res?.data?.Total_Count)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went Wrong")
        }
    }
    const fetchSubCategoryApis = async () => {
        try {
            const res = await commonGetApis("get_subcategories?pageNumber=1&pageLimit=10")

            if(res?.data){
                setSubCategory(res?.data?.Total_Count)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went Wrong")
        }
    }
    const fetchBrandApis = async () => {
        try {
            const res = await commonGetApis("get_brands?pageNumber=1&pageLimit=10")  
            
            if(res?.data){
                setBrands(res?.data?.Total_Count)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went Wrong")
        }
    }
    const fetchCouponApi = async () => {
        try {
            const res = await commonGetApis("get_coupons?pageNumber=1&pageLimit=10");

            if(res?.data){
                setCoupons(res?.data?.Total_Count);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went Wrong")
        }
    }

    useEffect(() => {
        fetchUserApis();
        fetchProductApis();
        fetchCategoryApis();
        fetchSubCategoryApis();
        fetchBrandApis();
        fetchCouponApi();
    },[])
  return (
<div className="flex flex-col items-center px-4 py-8">
  <h1 className="text-4xl font-bold mb-10 text-center">Dashboard</h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-7xl">
    {[
      { title: 'Users', value: users },
      { title: 'Brands', value: brands },
      { title: 'Products', value: products },
      { title: 'Categories', value: category },
      { title: 'Sub-Categories', value: subCategory },
      { title: 'Orders', value: orders },
      { title: 'Coupon', value: coupons},
    ].map((item, index) => (
      <div
        key={index}
        className="bg-amber-500 text-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300"
      >
        <h2 className="text-2xl font-semibold">{item.title}</h2>
        <p className="mt-2 text-lg font-bold">Total: ({item.value})</p>
      </div>
    ))}
  </div>
</div>
  )
}

export default Dashboard
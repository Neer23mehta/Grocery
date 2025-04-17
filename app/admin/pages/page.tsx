'use client'
import React, { useEffect } from 'react'
import axios from 'axios'

const Page = () => {

    const fetchTandC = async () => {
        try {
            // const res = axios.get("http://192.168.2.181:3000/admin/terms_and_condition")
            // console.log("res123",res)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchTandC();
    },[])
  return (
    <div>
        <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col px-2">
                  <h1 className="text-3xl font-bold">Pages</h1>
                  <p className="text-gray-500 mt-2">Dashboard
                    <span className="text-black ml-5">Pages</span></p>
                </div>
                <div>
                  <button className="px-3 font-bold py-2 bg-amber-300 ml-5 w-auto h-13 ">Add Pages</button>
                </div>
              </div>
    </div>
  )
}

export default Page


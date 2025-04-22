'use client'
import React, { useEffect, useState } from 'react'
import commonGetApis from '@/commonapi/Commonapi';

const Brandid = ({id}:any) => {
    const [add,setAdd] = useState("");

    const fetchGets = async () => {
        try {
            const res = await commonGetApis(`get_brand?id=${id}`)
            setAdd(res?.data?.result || [])
        } catch (error) {
            console.log("error",error)
        }
    }

    useEffect(()=>{
        fetchGets();
    },[])
  return (
    <div>page</div>
  )
}

export default Brandid
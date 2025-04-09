'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const page = ({params}:any) => {
    const [add,setAdd] = useState("");
    const id = params.id
    console.log("id",id)

    const fetchGets = async () => {
        const refreshtoken = localStorage.getItem("usertoken");
        const token = localStorage.getItem("token");
        try {
            const res = await axios.get(`http://192.168.2.181:3000/admin/get_brand?id=${id}`,{
                headers:{
                    Authorizations: token,
                    language: "en",
                    refresh_token: refreshtoken,
                }
            })
            setAdd(res?.data?.data || [])
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

export default page
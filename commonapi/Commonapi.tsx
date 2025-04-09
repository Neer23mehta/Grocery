import axios from 'axios';
import React from 'react'

export default async function commonGetApis(Params:any) {
    const refreshtoken = localStorage.getItem("usertoken");
    const token = localStorage.getItem("token");    
    try {
        const res = await axios.get(`http://192.168.2.181:3000/admin/${Params}`,{
            headers:{
                Authorizations:token,
                language:"en",
                refresh_token:refreshtoken
            }
        })
        return res.data
    } catch (error) {
        
    }
}

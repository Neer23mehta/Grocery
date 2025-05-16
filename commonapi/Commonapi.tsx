'use client'
import axios from 'axios';

const commonGetApis = async (params: string) => {
  const refreshtoken = typeof window !== "undefined" ? localStorage.getItem("usertoken") : null;
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  if(!refreshtoken && !token) {
    return { status: 401, message: "Unauthorized" };
  }

  try {
    const res = await axios.get(`http://192.168.2.163:3001/admin/${params}`, {
      headers: {
        Authorizations: token,
        language: "en",
        refresh_token: refreshtoken
      }
    });
    return res.data;
  } catch (error) {
    console.error("API GET Error:", error);
    throw error;
  }

};

export const deleteApi = async (params: string) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const refreshtoken = typeof window !== "undefined" ? localStorage.getItem("usertoken") : null;

  try {
    const res = await axios.delete(`http://192.168.2.163:3001/admin/${params}`, {
      headers: {
        Authorizations: token,
        language: "en",
        refresh_token: refreshtoken
      }
    });
    return res.data;
  } catch (error) {
    console.error("API GET Error:", error);
    throw error;
  }
}

export const commonPostApis = async (params: string, formdata: URLSearchParams|FormData) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const refreshtoken = typeof window !== "undefined" ? localStorage.getItem("usertoken") : null;

  try {
    const res = await axios.post(`http://192.168.2.163:3001/admin/${params}`,formdata,{
      headers: {
        Authorizations: token,
        language: "en",
        refresh_token: refreshtoken
      }
    });
    return res.data
  } catch (error) {
    console.error("Add Api is not Working");
    throw error;
  }
}

export default commonGetApis;

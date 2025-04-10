import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import axios from 'axios';
import commonGetApis from '@/utils/commonGetApis'; 

const Any = () => {
  const [showPassword, setShowPassword] = useState(false);
  const route = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmits = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://192.168.2.181:3000/admin/login", {
        email,
        password,
      });

      if (res.status === 200) {
        toast.success("Login Successfully");
        localStorage.setItem("usertoken", res.data.data.refresh_token);
        localStorage.setItem("token", res.data.data.token);


        const adminData = await commonGetApis("getAdminDetails"); 
        console.log("Admin Details:", adminData);

        route.push("/admin");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Something went wrong during login.");
    }
  };

  return (
    // your JSX login form
    <div>

    </div>
  );
};

export default Any;

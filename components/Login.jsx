'use client'
import React, { useState } from 'react';
import { assets } from "../assests/assets";
import Image from 'next/image';
import Link from 'next/link';
import { ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { TextField } from '@mui/material';
import axios from 'axios'; 
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const route = useRouter();

  const initialValues = {
    email: "",
    password: ""
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  console.log("pass", showPassword)

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (value, action) => {
      console.log("Form Data", value);
      action.resetForm()
    }
  })

  const handleSubmits = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://192.168.2.181:3000/admin/login", {
        email: values.email,
        password: values.password,
      });

      if(res.status == 200){
        toast.success("Login Successfully")
        localStorage.setItem("usertoken",res.data.data.refresh_token)
        localStorage.setItem("token",res.data.data.token)
        route.push("/admin")
      }
      else  {
        toast.error(res.data.message)
      }
      console.log("Response: ", res.data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className='relative flex items-center justify-center w-full h-screen bg-black'>
      <Image
        src={assets.bgimg}
        alt="Background image"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <form onSubmit={handleSubmits} className='relative flex flex-col justify-center items-center w-[450px] h-[600px] bg-white rounded-lg shadow-lg px-6 py-8'>
        <Image
          src={assets.logo}
          alt='Logo'
          className="mb-7"
        />
        <Image
          src={assets.sym}
          alt='symb'
          className='mt-1 mb-7'
        />

        <div className="w-[335px] mb-5">
          <div className="relative">
            <div className="flex items-center rounded-lg p-2 h-[34px]">
              <Image
                src={assets.mail}
                alt='email'
                width={16}
                height={16}
                className='mr-2 mt-4'
              />
              <TextField
                id="email"
                label="Email"
                variant="standard"
                className='ml-5 px-5 w-full'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.email && touched.email)}
                helperText={touched.email && errors.email}
              />
            </div>
          </div>
        </div>

        <div className="w-[335px] mb-6">
          <div className="relative">
            <div className="flex items-center p-2 text-underline-offset:auto h-[34px]">
              <Image
                src={assets.lock}
                alt='password'
                width={20}
                height={20}
                className='mr-2 mt-4'
              />
              <TextField
                id="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                variant="standard"
                className="w-full"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.password && touched.password)}
                helperText={touched.password && errors.password}
                InputProps={{
                  endAdornment: (
                    <Image
                      src={showPassword ? assets.eyeClosed : assets.eye}
                      alt='hide/show'
                      height={20}
                      width={20}
                      className='cursor-pointer mr-3'
                      onClick={togglePassword}
                    />
                  ),
                }}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-amber-400 w-[335px] h-[55px] text-lg text-black hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 mt-4 transition duration-200"
        >
          Login
        </button>

        <div className="mt-4">
          <span className="text-sm text-gray-600">
            <Link href="/forget">Forget Password?</Link>
          </span>
        </div>
      </form>

      <div className="absolute bottom-0 left-0 mb-15">
        <Image
          src={assets.left}
          alt="Left Image"
          className="lg:w-auto lg:h-auto opacity-70 sm:h-auto sm:w-auto md:w-auto md:h-auto"
        />
      </div>

      <div className="absolute bottom-0 right-0 mt-10 ml-5">
        <Image
          src={assets.rimg}
          alt="Right Image"
          className="lg:w-[525px] lg:h-[415px] opacity-70 md:w-auto md:h-auto sm:w-auto sm:h-auto ml-10"
        />
      </div>
    </div>
  );
};

export default Login;

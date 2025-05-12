'use client'
import React, { useState } from 'react';
import { assets } from "../assests/assets";
import Image from 'next/image';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField } from '@mui/material';
import axios from 'axios'; 
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const Setpassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);

  const route = useRouter();

  const initialValues = {
    password: "",
    confirmpassword: ""
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

  const togglePasswords = () => {
    setShowPasswords(!showPasswords);
  };

  const { values, errors, touched, handleBlur, handleChange } = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (value, action) => {
      action.resetForm()
    }
  })

  const handleSubmits = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://192.168.2.180:3000/admin/reset-password", {
        password: values.password,
        confirmpassword: values.confirmpassword,
      });

      if(res.status == 200){
        toast.success("Password Change Successfully")
        route.push("/")
      }
      else  {
        toast.error(res.data.message)
      }
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
        <div className='mb-15 top-0'>
        <h1 className='text-3xl'>Set new Password</h1>
        </div>
        <Image
          src={assets.pass}
          alt='pass'
          className='mt-1 mb-7'
        />

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
                label="Confirm password"
                variant="standard"
                className="w-full"
                value={values.confirmpassword === values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={Boolean(errors.password && touched.password)}
                helperText={touched.password && errors.password}
                InputProps={{
                  endAdornment: (
                    <Image
                      src={showPasswords ? assets.eyeClosed : assets.eye}
                      alt='hide/show'
                      height={20}
                      width={20}
                      className='cursor-pointer mr-3'
                      onClick={togglePasswords}
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
          Submit
        </button>
      </form>

      <div className="absolute bottom-0 left-0 ml-15 mb-15">
        <Image
          src={assets.left}
          alt="Left Image"
          className="w-[490px] h-[314px] opacity-70"
        />
      </div>

      <div className="absolute bottom-0 right-0 mt-10 mr-2">
        <Image
          src={assets.rimg}
          alt="Right Image"
          className="w-[605px] h-[438px] opacity-70"
        />
      </div>
    </div>
  );
};

export default Setpassword;

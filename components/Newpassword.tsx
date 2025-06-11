'use client'
import React, { useState } from 'react';
import { assets } from "../assests/assets";
import Image from 'next/image';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { commonPostApis } from '@/commonapi/Commonapi';

interface Values {
  oldpassword: string;
  password: string;
  confirmpassword: string;
}

const Newpassword = ({ setPassword }: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const route = useRouter();
  const initialValues: Values = {
    oldpassword: "",
    password: "",
    confirmpassword: ""
  };
  const validationSchema = Yup.object({
    oldpassword: Yup.string()
      .min(6, 'Incorrect Password')
      .required('Old Password is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Password confirmation is required'),
  });
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswords = () => {
    setShowPasswords(!showPasswords);
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik<Values>({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, action) => {
      action.resetForm();
      const formdata = new URLSearchParams();
      formdata.append("id", "1");
      formdata.append("old_password", values.oldpassword);
      formdata.append("new_password", values.password);
      formdata.append("confirm_password", values.confirmpassword);
      try {
        const res = await commonPostApis("change_password", formdata);
        if (res.data) {
          toast.success("Password Changed Successfully");
          route.push("/");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred. Please try again.");
      }
    }
  });
  return (
    <div className='flex items-center justify-center w-full md:h-auto md:py-10 py-2 px-2.5'>
      <form onSubmit={handleSubmit} className='relative flex flex-col justify-center items-center w-auto bg-white rounded-lg md:px-10 md:py-5 '>
        <div className='flex justify-end items-end '>
          <Image onClick={() => { setPassword(false) }} src={assets.can} alt='remove' className='md:ml-95 ml-72 md:h-5 h-4 w-4 md:w-5' />
        </div>
        <div className='mb-10 top-0'>
          <h1 className='text-3xl'>Change Password</h1>
        </div>
        <div className="w-[335px] mb-6">
          <div className="relative">
            <label className='text-gray-400 py-2 mb-2'>Old Password</label>
            <div className="flex px-2 py-2 mt-2 border border-gray-200 flex-row items-center">
              <Image
                src={assets.lock}
                alt='password'
                width={20}
                height={20}
                className='mr-2'
              />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='xxxxxxxx'
                name='oldpassword'
                required
                onChange={handleChange}
                value={values.oldpassword}
                onBlur={handleBlur}
                className='focus:outline-none w-full'
              />
              <button type="button" onClick={togglePassword} className="ml-2">
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
            {errors.oldpassword && touched.oldpassword && (
              <p className='text-red-500'>{errors.oldpassword}</p>
            )}
          </div>
        </div>
        <div className="w-[335px] mb-6">
          <div className="relative">
            <label className='text-gray-400 py-2 mb-2'>New Password</label>
            <div className="flex px-2 py-2 mt-2 border border-gray-200 flex-row items-center">
              <Image
                src={assets.lock}
                alt='password'
                width={20}
                height={20}
                className='mr-2'
              />
              <input
                type={showPasswords ? 'text' : 'password'}
                placeholder='xxxxxxxx'
                name='password'
                required
                onChange={handleChange}
                value={values.password}
                onBlur={handleBlur}
                className='focus:outline-none w-full'
              />
              <button type="button" onClick={togglePasswords} className="ml-2">
                {showPasswords ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>
            {errors.password && touched.password && (
              <p className='text-red-500'>{errors.password}</p>
            )}
          </div>
        </div>
        <div className="w-[335px] mb-6">
          <div className="relative">
            <label className='text-gray-400 py-2 mb-2'>Confirm New Password</label>
            <div className="flex px-2 py-2 mt-2 border border-gray-200 flex-row items-center">
              <Image
                src={assets.lock}
                alt='password'
                width={20}
                height={20}
                className='mr-2' />
              <input
                type={showPasswords ? 'text' : 'password'}
                placeholder='xxxxxxxx'
                name='confirmpassword'
                required
                onChange={handleChange}
                value={values.confirmpassword}
                onBlur={handleBlur}
                className='focus:outline-none w-full' />
            </div>
            {errors.confirmpassword && touched.confirmpassword && (
              <p className='text-red-500'>{errors.confirmpassword}</p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="bg-amber-400 md:w-[335px] w-full h-9 font-bold md:h-[55px] text-lg text-black hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-400 mt-4 transition duration-200">
          Update
        </button>
      </form>
    </div>
  );
};

export default Newpassword;

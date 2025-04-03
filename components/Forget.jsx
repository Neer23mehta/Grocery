'use client'
import React, { useState } from 'react';
import { assets } from "../assests/assets";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const Forget = () => {

    const initialValues = {
        email:""
    }
    const route = useRouter();
    const handleback = () => {
        route.push("/")
    }

    const validation = Yup.object({
        email:Yup.string().email().required("Please Enter Your Email"),
    })

    const {values,errors,touched,handleBlur,handleChange,handleSubmit} = useFormik({
        initialValues:initialValues,
        validationSchema:validation,
        onSubmit: (value,action) => {
            console.log("Form Data",value);
            action.resetForm()
        }
    })

    const handlesubmits = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://192.168.2.181:3000/admin/forgot_password",{
                email:values.email
            });

            if(res.status == 200){
                route.push("/verify")
            }
            else{
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
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

            <form onSubmit={handlesubmits} className='relative flex flex-col justify-center items-center w-[450px] h-[550px] bg-white rounded-lg shadow-lg mb-15'>
                <div className='flex flex-row justify-center mb-5 '>
                    <Image
                        src={assets.back}
                        alt='Logo'
                        className="flex justify-start mr-22 ml-3  h-[24px] w-[24px]"
                        onClick={handleback}
                    />
                    <h1 className='mr-30 text-[24px]    '>Forgot Password?</h1>
                </div>
                <div className='flex justify-center items-center'>
                    <p className='text-[16px] items-center px-10 mb-5'>
                        Don't worry! It happens. Please Enter the Address Assoociated to your Account
                    </p>
                </div>
                <Image
                    src={assets.pass}
                    alt='symb'
                    className='mt-1 mb-7'
                />
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
                <button type="submit" className="bg-amber-400 w-[335px] h-[55px] text-[20px] mt-15">Submit</button>

                <span className='mt-5 text-[16px]'><Link href="/">Login</Link></span>
            </form>

            <div className="absolute bottom-0 left-0 ml-15 mb-15">
                <Image
                    src={assets.left}
                    alt="Left Image"
                    className="w-[490px] h-[314px] opacity-100 bg-transparent"
                    style={{ backgroundColor: 'transparent' }}
                />
            </div>
            <div className="absolute bottom-0 right-0 mt-10 mr-10">
                <Image
                    src={assets.rimg}
                    alt="Right Image"
                    className="w-[605px] h-[438px] opacity-100 bg-transparent"
                    style={{ backgroundColor: 'transparent' }}
                />
            </div>
        </div>
    );
};

export default Forget;

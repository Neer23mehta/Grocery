'use client'
import React, { useEffect } from 'react';
import { assets } from "../assests/assets";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField } from '@mui/material';
import { toast } from 'react-toastify';
import { commonPostApis } from '@/commonapi/Commonapi';
const Forget = () => {
    const route = useRouter();
    const initialValues = {
        email: ""
    }
    const handleBack = () => {
        route.push("/")
    }
    const validation = Yup.object({
        email: Yup.string().email().required("Please Enter Your Email"),
    })
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: validation,
        onSubmit: (value, action) => {
            console.log("Form Data", value);
            action.resetForm()
        }
    })
    const handleSubmits = async (e) => {
        e.preventDefault();
        const formdata = new URLSearchParams();
        formdata.append("email", values.email);
        try {
            const res = await commonPostApis("forgot_password", formdata);

            if (res.status == 200) {
                route.push("/verify")
            }
            else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        document.title = "Admin ForgetPassword"
    }, [])
    return (
        <div className='relative flex items-center justify-center w-full md:h-screen bg-black'>
            <Image
                src={assets.bgimg}
                alt="Background image"
                layout="fill"
                objectFit="cover"
                quality={100}
            />
            <form onSubmit={handleSubmits} className='relative flex flex-col justify-center items-center md:w-[450px] w-full h-auto md:h-[550px] bg-white rounded-lg md:shadow-lg py-16 md:py-2 md:mb-15'>
                <div className='flex flex-row justify-center items-center mb-5 '>
                    <Image
                        src={assets.back}
                        alt='Logo'
                        className="flex justify-start mr-22 ml-3 h-5 w-5 md:h-[24px] md:w-[24px]"
                        onClick={handleBack}
                    />
                    <h1 className='mr-30 text-xl md:text-2xl'>Forgot Password?</h1>
                </div>
                <div className='flex justify-center items-center'>
                    <p className='text-[16px] items-center px-10 mb-5'>
                        Don't worry! It happens. Please Enter the Address Assoociated to your Account
                    </p>
                </div>
                <Image
                    src={assets.pass}
                    alt='symb'
                    className='mt-1 mb-7' />
                <div className="flex items-center rounded-lg p-2 h-[34px]">
                    <Image
                        src={assets.mail}
                        alt='email'
                        width={16}
                        height={16}
                        className='mr-2 mt-4' />
                    <TextField
                        id="email"
                        label="Email"
                        variant="standard"
                        className='ml-5 px-5 w-full'
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={Boolean(errors.email && touched.email)}
                        helperText={touched.email && errors.email} />
                </div>
                <button type="submit" className="bg-amber-400 w-[335px] h-[55px] text-[20px] mt-15">Submit</button>
                <span className='mt-5 text-[16px]'><Link href="/">Login</Link></span>
            </form>
            <div className="absolute bottom-0 left-0 ml-15 mb-15">
                <Image
                    src={assets.left}
                    alt="Left Image"
                    className="lg:w-[490px] lg:h-[314px] md:w-auto md:h-auto md:block hidden opacity-100 bg-transparent"
                    style={{ backgroundColor: 'transparent' }} />
            </div>
            <div className="absolute bottom-0 right-0 mt-10 mr-10">
                <Image
                    src={assets.rimg}
                    alt="Right Image"
                    className="lg:w-[605px] md:block hidden md:w-auto md:h-auto lg:h-[438px] opacity-100 bg-transparent"
                    style={{ backgroundColor: 'transparent' }} />
            </div>
        </div>
    );
};
export default Forget;

'use client'
import React, { useEffect, useState } from 'react';
import { assets } from "../assests/assets";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MuiOtpInput } from 'mui-one-time-password-input';
import axios from 'axios';
import { toast } from 'react-toastify';

const Otp = () => {
    const [otp, setOtp] = useState("")
    const route = useRouter();
    const handlesubmits = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://192.168.2.180:3000/admin/otp-verify", {
                otp
            });
            if (res.status == 200) {
                toast.success("verification successfull")
                route.push("/changepassword")
            }
            else {
                toast.error("invalid otp")
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    const handleChange = (newValue: string) => {
        setOtp(newValue);
    };
    return (
        <div className='relative flex items-center justify-center w-full md:h-screen h-full bg-black'>
            <Image
                src={assets.bgimg}
                alt="Background image"
                layout="fill"
                objectFit="cover"
                quality={100} />
            <form onSubmit={handlesubmits} className='relative flex flex-col justify-center items-center lg:w-[450px] lg:h-[550px] md:w-auto md:h-auto h-196 bg-white rounded-lg shadow-lg mb-15'>
                <div className='flex flex-row justify-center mb-5 '>
                    <h1 className='text-[34px] font-bold'>Otp Verification</h1>
                </div>
                <div className='flex justify-center items-center'>
                    <p className='text-[16px] items-center px-10 mb-5'>
                        Please wait For a While
                    </p>
                </div>
                <Image
                    src={assets.pass}
                    alt='symb'
                    className='mt-1 mb-7' />
                <div className="flex items-center rounded-lg p-2 h-[20px]">
                    <MuiOtpInput
                        value={otp}
                        onChange={handleChange}
                        length={4}
                        className='mx-10 mt-10 px-15'
                        TextFieldsProps={{
                            placeholder: '-',
                        }} />
                </div>
                <button type="submit" className="bg-amber-400 w-[335px] h-[55px] text-[20px] mt-25">Verify</button>
            </form>
            <div className="absolute bottom-0 left-0 ml-15 mb-15">
                <Image
                    src={assets.left}
                    alt="Left Image"
                    className="lg:w-[490px] lg:h-[314px] md:w-auto md:h-auto md:block hidden opacity-100 bg-transparent"
                    style={{ backgroundColor: 'transparent' }}/>
            </div>
            <div className="absolute bottom-0 right-0 mt-10 mr-10">
                <Image
                    src={assets.rimg}
                    alt="Right Image"
                    className="lg:w-[605px] lg:h-[438px] md:w-auto md:h-auto hidden md:block opacity-100 bg-transparent"
                    style={{ backgroundColor: 'transparent' }} />
            </div>
        </div>
    );
};
export default Otp;

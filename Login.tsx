'use client'
import { useState } from 'react';
import { ProgressBar } from 'react-step-progress-bar';
import 'react-step-progress-bar/styles.css';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import Image from 'next/image';
import { Uassets } from "../Uassets/uassets"

const Login = () => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        age: '',
        gender: '',
        mobileNo: '',
        alternateEmail: '',
        showPassword: false,
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleNext = () => {
        setStep((prevStep) => Math.min(prevStep + 1, 3));
    };

    const handleBack = () => {
        setStep((prevStep) => Math.max(prevStep - 1, 0));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    const togglePasswordVisibility = () => {
        setFormData((prevData) => ({
            ...prevData,
            showPassword: !prevData.showPassword,
        }));
    };

    const isLastStep = step === 3;

    return (
        <div className="h-screen flex justify-center items-center bg-gray-200">
            <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
                <ProgressBar
                    percent={(step / 3) * 100}
                    filledBackground="linear-gradient(to right, #FFD54F , #FFCA28)"
                />
                <form onSubmit={handleSubmit}>
                    {step === 0 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-center flex justify-center mt-5">
                                <Image
                                    src={Uassets.logos}
                                    alt='logo'
                                />
                            </h2>
                            <div className='flex justify-center items-center'>
                                <Image
                                    src={Uassets.logins}
                                    alt='login'
                                />
                            </div>
                            <div className='flex justify-center items-center'>
                                <h1 className='text-amber-400 lg:text-4xl'>Login</h1>
                            </div>
                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={formData.showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600"
                                    >
                                        {formData.showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                    Confirm Password
                                </label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={formData.showPassword ? 'text' : 'password'}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </div>
                    )}

                    {step === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-center flex justify-center mt-5">
                                <Image
                                    src={Uassets.logos}
                                    alt='logo'
                                />
                            </h2>
                            <div className='flex justify-center items-center'>
                                <Image
                                    src={Uassets.logins}
                                    alt='login'
                                />
                            </div>
                            <div className='flex justify-center items-center'>
                                <h1 className='text-amber-400 lg:text-3xl'>Additional Information.</h1>
                            </div>              
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                                    Age
                                </label>
                                <input
                                    id="age"
                                    name="age"
                                    type="number"
                                    value={formData.age}
                                    onChange={handleChange}
                                    className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                                    Gender
                                </label>
                                <select
                                    id="gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-center flex justify-center mt-5">
                                <Image
                                    src={Uassets.logos}
                                    alt='logo'
                                />
                            </h2>
                            <div className='flex justify-center items-center'>
                                <Image
                                    src={Uassets.logins}
                                    alt='login'
                                />
                            </div>
                            <div className='flex justify-center items-center'>
                                <h1 className='text-amber-400 lg:text-3xl'>Contact Details.</h1>
                            </div>                            
                             <div>
                                <label htmlFor="mobileNo" className="block text-sm font-medium text-gray-700">
                                    Mobile Number
                                </label>
                                <input
                                    id="mobileNo"
                                    name="mobileNo"
                                    type="tel"
                                    value={formData.mobileNo}
                                    onChange={handleChange}
                                    className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="alternateEmail" className="block text-sm font-medium text-gray-700">
                                    Alternate Email ID
                                </label>
                                <input
                                    id="alternateEmail"
                                    name="alternateEmail"
                                    type="email"
                                    value={formData.alternateEmail}
                                    onChange={handleChange}
                                    className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </div>
                    )}

                    <div className="flex justify-between mt-8">
                        
                        <button
                            type="button"
                            onClick={handleBack}
                            disabled={step === 0}
                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            Back
                        </button>
                        {isLastStep ? (
                            <button
                                type="submit"
                                className="px-6 py-2 bg-amber-300 text-black rounded-lg hover:bg-amber-400"
                            >
                                Submit
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="px-6 py-2 bg-amber-300 text-black rounded-lg hover:bg-amber-400"
                            >
                                Next
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

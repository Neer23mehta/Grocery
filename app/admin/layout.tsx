'use client'
import { ReactNode, useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { assets } from "../../assests/assets";
import { SlArrowDown } from "react-icons/sl";
import { GrLogout } from "react-icons/gr";
import { IoSettingsSharp } from "react-icons/io5";
import { MdLock } from "react-icons/md";
import { useFormik } from "formik";
import { HandleYupSchema } from "@/Grocery/Yupschema";
import Setpassword from "@/components/Setpassword";
import Logout from "@/components/Logout";
import Newpassword from "@/components/Newpassword";
import { Dialog, DialogActions, DialogContent } from "@mui/material";
import axios from "axios";


interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const [logout, setLogout] = useState(false);
    const [logoutPage, setLogoutPage] = useState(false);
    const [config, setConfig] = useState(false);
    const [manageDelivery, setManageDelivery] = useState(false);
    const [manageTax, setManageTax] = useState(false);
    const [password, setPassword] = useState(false)
    const [tax,setTax] = useState('')
    const [input, setInput] = useState({
        deliveryupto:"",
        charge:"",
        id:"1",
    })
    const route = useRouter();

    const handleClick = () => {
        setLogout(!logout);
    }

    const handleLogout = () => {
        setLogoutPage(!logoutPage);
        setConfig(false);
        setPassword(false);
    }

    const handleChangePassword = () => {
        setPassword(!password)
        setConfig(false)
    }

    const handleConfiguration = () => {
        setConfig(!config);
        setPassword(false)
        setLogout(!logout);
        setLogoutPage(false);
    }

    const initialValues = {
        managedelivery:"",
        managetax:""
    }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: HandleYupSchema,
        onSubmit: (value, action) => {
          console.log("Form Data", value);
          action.resetForm()
        }
    })

    const handleConfigSubmit = (e:any) => {
        e.preventDefault();
    }

    const handleManageDelivery = () => {
        setManageDelivery(true)
        setManageTax(false)
    }

    const handleManageTax = () => {
        setManageTax(true)
        setManageDelivery(false)
    }

    const handleCongigurationCancel = () =>{
        setConfig(!config)
    }

    const handleManageDeliverys = async () => {
        const token = localStorage.getItem("token");
        const refreshToken = localStorage.getItem("usertoken");

        const formdata = new URLSearchParams();
        formdata.append("free_delivery_upto",input.deliveryupto);
        formdata.append("delivery_charge",input.charge);
        formdata.append("id",input.id);
        try {
            const res = await axios.post('http://192.168.2.181:3000/admin/manage_delivery',formdata,{
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorizations": token,
                    "language": "en",
                    "refresh_token": refreshToken,
                  },
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleManageTaxs = async () => {
        const token = localStorage.getItem("token");
        const refreshToken = localStorage.getItem("usertoken");

        const id = "1"
        const formdata = new URLSearchParams();
        formdata.append("tax",tax)
        formdata.append("id",id)
        try {
            const res = await axios.post('http://192.168.2.181:3000/admin/manage_tax',formdata,{
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorizations": token,
                    "language": "en",
                    "refresh_token": refreshToken,
                  },
            })
            if(res.data){
                toast.success("Tax Managed Successfully")
            }
            else{
                toast.error("Tax Management is not Done")
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went Wrong")
        }
    }
    const handleManageDeliverySubmit = (e:any) => {
        const {name,value} = e.target;
        setInput({...input,[name]:value});
    }
    return (
        <div className="flex min-h-screen bg-gray-100">
            <ToastContainer theme="dark" />
            <div className="flex min-h-screen sticky z-40 top-0">
            <Sidebar/>
            </div>
            <div className="flex flex-col w-full">
                <div className="flex flex-col justify-end space-y-2 bg-white p-1 shadow-md border-b border-gray-200 sticky top-0 z-20">
                    <div className="flex flex-row items-center justify-end  ">
                        <Image src={assets.admin} alt="Admin" className="mt-2"/>
                        <button onClick={handleClick} className="mr-1">Admin</button>
                        <SlArrowDown size={12} width={9} onClick={handleClick}/>
                    </div>
                    {logout && (
                        <div className="flex justify-start flex-col items-end z-50">
                            <div className={`flex justify-start items-start w-50 px-3 bg-white shadow py-2 hover:bg-amber-300`}>
                                <button 
                                    onClick={handleConfiguration}
                                    className={`mt-0 rounded flex justify-start text-black flex-row space-x-2 hover:bg-amber-300`}
                                >
                                    <span className="mt-1 mr-2"><IoSettingsSharp /></span> Configuration
                                </button>
                            </div>
                            <div className={`flex justify-start items-start w-50 px-3 bg-white shadow py-2 hover:bg-amber-300`}>
                                <button 
                                    onClick={handleChangePassword}
                                    className={`mt-0 rounded flex justify-start text-black flex-row space-x-2 hover:bg-amber-300 `}
                                >
                                    <span className="mt-1 mr-2"><MdLock /></span> Change Password
                                </button>
                            </div>
                            <div className={`flex justify-start items-start w-50 px-3 bg-white shadow py-2 hover:bg-amber-300`}>
                                <button 
                                    onClick={handleLogout}
                                    className={`mt-0 rounded flex justify-start text-black flex-row space-x-2 hover:bg-amber-300 `}
                                >
                                    <span className="mt-1 mr-2"><GrLogout /></span> Log-Out
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-6 bg-gray-100 flex-1 z-10">
                    {children}

                    <Dialog open={config} onClose={() => setConfig(false)}>
                        <div className='flex flex-col justify-center items-center'>
                            <DialogContent>
                            <form onSubmit={handleConfigSubmit} className='flex flex-col bg-white mt-1 py-1 px-4 lg:w-[450px] md:w-auto sm:w-auto justify-center items-center'>
                                <div className='flex justify-end items-end '>
                                    <Image src={assets.can} alt='remove' className='ml-95' onClick={handleCongigurationCancel}/>
                                </div>
                                <h1 className='text-2xl font-bold mb-1'>Configuration</h1>
                                <div className='flex flex-col justify-start mt-5 space-y-5'>
                                    <div className='flex flex-row space-x-5 justify-between'>
                                        <button onClick={handleManageDelivery} className='px-2 py-3 bg-white shadow-md underline-offset-1'>
                                            Manage Delivery
                                        </button>
                                        <button onClick={handleManageTax} className='px-2 py-3 bg-white shadow-md underline-offset-1'>
                                            Manage Tax
                                        </button>
                                    </div>
                                    {manageDelivery && (
                                        <div>
                                            <div className='flex flex-col space-x-5 justify-start'>
                                                <label className='text-gray-400'>Free Delivery Upto</label>
                                                <input type='text' required name='deliveryupto' value={input.deliveryupto} onChange={handleManageDeliverySubmit} placeholder='Free Delivery Upto' className='font-bold border-1 border-gray-200 mt-2 py-2 px-3 text-black' />
                                            </div>
                                            <div className='flex flex-col space-x-5 justify-start'>
                                                <label className='text-gray-400'>Delivery Charge</label>
                                                <input type='text' required name='charge' value={input.charge} onChange={handleManageDeliverySubmit} placeholder='Delivery Charge' className='font-bold border-1 border-gray-200 mt-2 py-2 px-3 text-black' />
                                            </div>
                                            <div className='flex justify-center items-center mt-5'>
                                            <button onClick={handleManageDeliverys} className='px-28 py-2 bg-amber-400 font-bold mb-3' type='submit'>Update</button>
                                            </div>
                                        </div>
                                    )}
                                    {manageTax && (
                                        <div className='flex flex-col space-x-5 justify-start'>
                                            <label className='text-gray-400'>Tax %</label>
                                            <input type='text' value={tax} onChange={(e) => setTax(e.target.value)} required name='tax' placeholder='Tax %' className='font-bold border-1 border-gray-200 mt-2 py-2 px-3 text-black' />
                                            <div className='flex justify-center items-center mt-5'>
                                            <button onClick={handleManageTaxs} className='px-28 py-2 bg-amber-400 font-bold mb-3' type='submit'>Update</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </form>
                            </DialogContent>
                        </div>
                        </Dialog>
                   
                   <Dialog open={password} onClose={() => setPassword(false)}>
                            <Newpassword/>
                   </Dialog>

                  <Dialog open={logoutPage} onClose={() => setLogoutPage(false)}>
                        <DialogContent>
                            <Logout/>
                        </DialogContent>
                  </Dialog>
                </div>
            </div>
        </div>
    );
}

export default Layout;

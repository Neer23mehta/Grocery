'use client'
import { ReactNode, useRef, useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { assets } from "../../assests/assets";
import { SlArrowDown } from "react-icons/sl";
import { GrLogout } from "react-icons/gr";
import { IoSettingsSharp } from "react-icons/io5";
import { MdLock } from "react-icons/md";
import Logout from "@/components/Logout";
import Newpassword from "@/components/Newpassword";
import { Dialog, DialogContent, Popper, ClickAwayListener, Paper } from "@mui/material";
import axios from "axios";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

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
    const [tax, setTax] = useState('')
    const [input, setInput] = useState({
        deliveryupto: "",
        charge: "",
        id: "1",
    })

    const route = useRouter();
    const anchorRef = useRef(null);
    const pathname = usePathname();

    const handleClick = () => {
        setLogout((prev) => !prev);
    };

    const handleLogout = () => {
        setLogout(false);
        setLogoutPage(true);
        setConfig(false);
        setPassword(false);
    };

    const handleChangePassword = () => {
        setLogout(false);
        setPassword(true);
        setConfig(false);
    };

    const handleConfiguration = () => {
        setLogout(false);
        setConfig(true);
        setPassword(false);
        setLogoutPage(false);
    };

    const handleManageDelivery = () => {
        setManageDelivery(true)
        setManageTax(false)
    }

    const handleManageTax = () => {
        setManageTax(true)
        setManageDelivery(false)
    }

    const handleCongigurationCancel = () => {
        setConfig(false);
    }

    const handleManageDeliverySubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
      };      

    const handleManageDeliverys = async () => {
        const token = localStorage.getItem("token");
        const refreshToken = localStorage.getItem("usertoken");

        const formdata = new URLSearchParams();
        formdata.append("free_delivery_upto", input.deliveryupto);
        formdata.append("delivery_charge", input.charge);
        formdata.append("id", input.id);
        try {
         const res =  await axios.post('http://192.168.2.181:3000/admin/manage_delivery', formdata, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorizations": token,
                    "language": "en",
                    "refresh_token": refreshToken,
                },
            })
            if(res.data){
                toast.success("Successfully Updated")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleBackClick = () => {
        route.push("/admin/products")
    }

    const handleManageTaxs = async () => {
        const token = localStorage.getItem("token");
        const refreshToken = localStorage.getItem("usertoken");

        const id = "1"
        const formdata = new URLSearchParams();
        formdata.append("tax", tax)
        formdata.append("id", id)
        try {
            const res = await axios.post('http://192.168.2.181:3000/admin/manage_tax', formdata, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorizations": token,
                    "language": "en",
                    "refresh_token": refreshToken,
                },
            })
            if (res.data) {
                toast.success("Tax Managed Successfully")
            }
            else {
                toast.error("Tax Management is not Done")
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went Wrong")
        }
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            <ToastContainer theme="dark" />

            <div className="sticky top-0 h-screen z-30 overflow-y-auto overflow-x-hidden  bg-[#202020]">
            <Sidebar />
            </div>

            <div className="flex flex-col w-full">
                <div className={`flex flex-col justify-end p-1 shadow-md border-b border-gray-300 sticky top-0 z-20 ${pathname === "/admin/dashboard" ? "bg-white" : "bg-white"} `}>
                    <div className="flex flex-row items-center justify-between w-full relative">
                        <div className="flex justify-start">
                        {
                           pathname == "/admin/addproduct" ? <button onClick={handleBackClick} className="ml-5"><Image src={assets.backs} alt="back" height={25} width={20} /></button> : null
                        }
                        </div>
                        <div className="flex justify-end items-center">
                        <Zoom>
                        <Image src={assets.admin} alt="Admin" className="mt-2 h-[80px] w-[80px]"/>
                        </Zoom>
                        <button onClick={handleClick} ref={anchorRef} className={`mr-2 text-xl text-black cursor-pointer`}>Admin</button>
                        <SlArrowDown size={12} onClick={handleClick} className={`mr-5 text-black cursor-pointer`}/>
                        </div>

                        <Popper open={logout} anchorEl={anchorRef.current} placement="bottom-end" style={{ zIndex: 1300 }}>
                            <ClickAwayListener onClickAway={() => setLogout(false)}>
                                <Paper className="bg-white shadow-md space-y-2 w-55">
                                    <button onClick={handleConfiguration} className="flex items-center text-xl space-x-2 hover:bg-amber-300 w-full p-3">
                                        <IoSettingsSharp /><span>Configuration</span>
                                    </button>
                                    <button onClick={handleChangePassword} className="flex items-center text-xl space-x-2 hover:bg-amber-300 w-full p-3">
                                        <MdLock /><span>Change Password</span>
                                    </button>
                                    <button onClick={handleLogout} className="flex items-center text-xl space-x-2 hover:bg-amber-300 w-full p-3">
                                        <GrLogout /><span>Log-Out</span>
                                    </button>
                                </Paper>
                            </ClickAwayListener>
                        </Popper>
                    </div>
                </div>

                <div className={`p-9 flex-1 overflow-y-auto bg-gray-100`}>
                {children}

                    <Dialog open={config} onClose={() => setConfig(false)}>
                        <div className='flex flex-col justify-center items-center'>
                            <DialogContent>
                                <form onSubmit={(e) => e.preventDefault()} className='flex flex-col bg-white mt-1 py-1 px-4 lg:w-[450px] md:w-auto sm:w-auto justify-center items-center'>
                                    <div className='flex justify-end items-end'>
                                        <Image src={assets.can} alt='remove' className='ml-95 cursor-pointer' onClick={handleCongigurationCancel} />
                                    </div>
                                    <h1 className='text-2xl font-bold mb-1'>Configuration</h1>
                                    <div className='flex flex-col justify-start mt-5 space-y-5'>
                                        <div className='flex flex-row space-x-5 justify-between'>
                                            <button onClick={handleManageDelivery} className='px-2 py-3 bg-white shadow-md'>Manage Delivery</button>
                                            <button onClick={handleManageTax} className='px-2 py-3 bg-white shadow-md'>Manage Tax</button>
                                        </div>
                                        {manageDelivery && (
                                            <>
                                                <div className='flex flex-col'>
                                                    <label className='text-gray-400'>Free Delivery Upto</label>
                                                    <input type='text' required name='deliveryupto' value={input.deliveryupto} onChange={handleManageDeliverySubmit} placeholder='Free Delivery Upto' className='font-bold border border-gray-200 mt-2 py-2 px-3 text-black' />
                                                </div>
                                                <div className='flex flex-col'>
                                                    <label className='text-gray-400'>Delivery Charge</label>
                                                    <input type='text' required name='charge' value={input.charge} onChange={handleManageDeliverySubmit} placeholder='Delivery Charge' className='font-bold border border-gray-200 mt-2 py-2 px-3 text-black' />
                                                </div>
                                                <div className='flex justify-center mt-5'>
                                                    <button onClick={handleManageDeliverys} className='px-28 py-2 bg-amber-400 font-bold mb-3'>Update</button>
                                                </div>
                                            </>
                                        )}
                                        {manageTax && (
                                            <>
                                                <label className='text-gray-400'>Tax %</label>
                                                <input type='text' value={tax} onChange={(e) => setTax(e.target.value)} required name='tax' placeholder='Tax %' className='font-bold border border-gray-200 mt-2 py-2 px-3 text-black' />
                                                
                                                <div className='flex justify-center mt-5'>
                                                    <button onClick={handleManageTaxs} className='px-28 py-2 bg-amber-400 font-bold mb-3'>Update</button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </form>
                            </DialogContent>
                        </div>
                    </Dialog>

                    <Dialog open={password} onClose={() => setPassword(false)}>
                        <Newpassword />
                    </Dialog>

                    <Dialog open={logoutPage} onClose={() => setLogoutPage(false)}>
                        <DialogContent>
                            <Logout />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Layout;

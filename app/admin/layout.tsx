'use client'
import { ReactNode, useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { assets } from "../../assests/assets";
import { SlArrowDown } from "react-icons/sl";
import { GrLogout } from "react-icons/gr";
import { IoSettingsSharp } from "react-icons/io5";
import { MdLock } from "react-icons/md";


interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const [logout, setLogout] = useState(false);
    const [config, setConfig] = useState(false)
    const route = useRouter();

    const handleClick = () => {
        setLogout(!logout);
    }

    const handleLogout = () => {
        route.push("/");
    }

    const handleChangePassword = () => {
        // route.push("/")
    }

    const handleConfiguration = () => {
        // route.push("/admin/user")
    }
    return (
        <div className="flex min-h-screen bg-gray-100">
            <ToastContainer theme="dark" />
            <Sidebar />
            <div className="flex flex-col w-full">
                <div className="flex flex-col justify-end space-y-2 bg-white p-5 shadow-md border-b border-gray-200">
                <div className="flex flex-row items-center justify-end space-x-2 ml-60">
                <button onClick={handleClick}>Admin</button>
                <SlArrowDown size={12} width={9} onClick={handleClick}/>
                </div>
                    {logout && (
                        <div className="flex justify-start flex-col items-end">
                        <div className={`flex justify-start items-start w-50 px-3 bg-white shadow py-2 hover:bg-amber-300`}>
                             <button 
                            onClick={handleConfiguration}
                            className={`mt-0 rounded flex justify-start text-black flex-row space-x-2 hover:bg-amber-300 shadow:md`}
                        >
                           <span className="mt-1 mr-2"><IoSettingsSharp /></span> Configuration
                        </button>
                        </div>
                        <div className={`flex justify-start items-start w-50 px-3 bg-white shadow py-2 hover:bg-amber-300`}>
                             <button 
                            onClick={handleChangePassword}
                            className={`mt-0 rounded flex justify-start text-black flex-row space-x-2 hover:bg-amber-300 shadow:md`}
                        >
                           <span className="mt-1 mr-2"><MdLock /></span> Change Password
                        </button>
                        </div>
                        <div className={`flex justify-start items-start w-50 px-3 bg-white shadow py-2 hover:bg-amber-300`}>
                             <button 
                            onClick={handleLogout}
                            className={`mt-0 rounded flex justify-start text-black flex-row space-x-2 hover:bg-amber-300 shadow:md`}
                        >
                           <span className="mt-1 mr-2"><GrLogout /></span> Log-Out
                        </button>
                        </div>
                        </div>
                    )}
                </div>
                <div className="p-6 bg-gray-100 flex-1">{children}</div>
            </div>
        </div>
    );
}

export default Layout;

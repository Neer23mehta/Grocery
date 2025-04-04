'use client'
import { ReactNode, useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { assets } from "../../assests/assets";
import { SlArrowDown } from "react-icons/sl";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const [logout, setLogout] = useState(false);
    const route = useRouter();

    const handleClick = () => {
        setLogout(!logout);
    }

    const handleLogout = () => {
        route.push("/");
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
                        <button 
                            onClick={handleLogout}
                            className="mt-0 rounded flex justify-end text-red-700"
                        >
                            Log-out
                        </button>
                    )}
                </div>
                <div className="p-6 bg-gray-100 flex-1">{children}</div>
            </div>
        </div>
    );
}

export default Layout;

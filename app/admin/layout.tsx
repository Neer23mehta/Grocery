'use client'
import { ReactNode } from "react";
import { Sidebar } from "../../components/Sidebar";
import { GiPlagueDoctorProfile } from "react-icons/gi";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { assets } from "../../assests/assets";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <ToastContainer theme="dark" />
            <Sidebar />
            <div className="flex flex-col w-full">
                <div className="flex items-center justify-end space-x-1 bg-white p-4 shadow-md border-b border-gray-200">
                    <p>Admin</p>
                    <Image src={assets.bimg} alt="Profile" className="mr-5 space-x-1" />
                </div>
                <div className="p-6 bg-gray-50 flex-1">{children}</div>
            </div>
        </div>
    );
}

export default Layout;

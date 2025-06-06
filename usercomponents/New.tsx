'use client'
import React, { useEffect, useState } from 'react';
import { images } from "@/newimg/images";
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Account from '@/Tablemanage/Account';
import Prescription from '@/Tablemanage/Prescription';
import Vaccines from '@/Tablemanage/Vaccine';
import Reminders from '@/Tablemanage/Reminder';

const New = () => {
    const [activeLabel, setActiveLabel] = useState('Account Credit');
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [small, setSmall] = useState(false)
    const pathname = usePathname();

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 1024);
            setSmall(window.innerWidth <= 540);
        };

        handleResize(); 
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const menuItems = [
        { label: 'Account Credit', icon: images.a1, activeIcon: images.a1_blue },
        { label: 'Prescription Template', icon: images.a2, activeIcon: images.a2_blue },
        { label: 'Vaccine Template', icon: images.a3, activeIcon: images.a3_blue },
        { label: 'Reminders', icon: images.a4, activeIcon: images.a4_blue },
    ];

    const renderComponent = () => {
        switch (activeLabel) {
            case 'Account Credit': return <Account />;
            case 'Prescription Template': return <Prescription />;
            case 'Vaccine Template': return <Vaccines />;
            case 'Reminders': return <Reminders />;
            default: return null;
        }
    };

    return (
        <div className='lg:ml-24 lg:mt-20 md:mt-12 md:ml-16'>
            <div className='w-full bg-[#F8F9FF]'>
                <div className='bg-[#F8F9FF] rounded-md'>
                    <div className='flex flex-col lg:flex-row p-7 gap-4'>
                        <div className={`bg-white rounded-md shadow-sm ${isSmallScreen ? 'w-full' : 'w-[250px]'}`}>
                            <nav className={`flex ${isSmallScreen ? 'flex-row overflow-x-auto justify-between' : 'flex-col'} w-full`}>
                                {menuItems.map((item) => {
                                    const isActive = activeLabel === item.label;
                                    return (
                                        <div key={item.label} onClick={() => setActiveLabel(item.label)} className={`flex items-center gap-2 p-3 cursor-pointer whitespace-nowrap flex-shrink-0
                                                ${isSmallScreen ? 
                                                    isActive ? 'border-b-2 border-b-[#3458FF]' : 'border-b border-gray-100' 
                                                    : 
                                                    isActive ? 'bg-[#F8F9FF] border-l-[3px] border-l-[#3458FF]' : 'border-b border-gray-100'
                                                }`}>
                                            <Image
                                                src={isActive ? item.activeIcon : item.icon}
                                                width={23}
                                                height={23}
                                                alt={item.label}
                                            />
                                            <p className={`text-sm ${isActive ? 'text-[#3458FF]' : 'text-gray-500'}`}>
                                                {
                                                    small ? "" : item.label
                                                }
                                            </p>
                                        </div>
                                    );
                                })}
                            </nav>
                        </div>
                        <div className='flex-grow bg-white rounded-md p-4 lg:p-5 overflow-x-auto'>
                            {renderComponent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default New;
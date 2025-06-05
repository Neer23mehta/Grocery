'use client'
import React from 'react'
import { assets } from '@/assests/assets'
import { Drawer } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GiLoincloth, GiDelicatePerfume } from "react-icons/gi";
import { LuSofa } from "react-icons/lu";
import { FaHome } from "react-icons/fa";
import { BsSmartwatch } from "react-icons/bs";
import { CgSmartHomeWashMachine } from "react-icons/cg";
import { SlScreenSmartphone } from "react-icons/sl";
import { TbMicrowaveFilled } from "react-icons/tb";
import { MdOutlineLocalGroceryStore } from "react-icons/md";

const menuItems = [
  { label: 'Fashion', href: '/user/fashion', icon: <GiLoincloth /> },
  { label: 'Grocery', href: '/user/grocery', icon: <MdOutlineLocalGroceryStore /> },
  { label: 'Home Appliances', href: '/user/homeappliances', icon: <TbMicrowaveFilled /> },
  { label: 'Mobiles', href: '/user/mobiles', icon: <SlScreenSmartphone /> },
  { label: 'Electronics', href: '/user/electronics', icon: <CgSmartHomeWashMachine /> },
  { label: 'Smart Gadgets', href: '/user/watches', icon: <BsSmartwatch /> },
  { label: 'Beauty & Personal Care', href: '/user/beauty', icon: <GiDelicatePerfume /> },
  { label: 'Home Appliances', href: '/user/home', icon: <FaHome /> },
  { label: 'Furniture', href: '/user/sofas', icon: <LuSofa /> },
];

const Menu = ({ showMenu }: { showMenu: boolean }) => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <Drawer
      open={showMenu}
      PaperProps={{
        sx: {
          width: { xs: 190, md: 180, lg: 290 },
          bgcolor: '#202020',
          overflowY: 'auto',
          overflowX: 'hidden',
          borderRight: '1px solid #333',
          '&::-webkit-scrollbar': {
            width: '8px',
            backgroundColor: 'yellow',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'yellow',
            borderRadius: '8px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#1a1a1a',
          },
        },
        className: "overflow-x-hidden",
      }}
      ModalProps={{
        keepMounted: true,
        disablePortal: true,
      }}
    >
      <div className="py-4 flex items-center justify-center">
        <Image src={assets.nlogo} alt="logo" width={130} height={100} />
      </div>

      <nav className='flex flex-col space-y-3.5'>
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-5 ml-5 font-large text-md p-3 rounded-md transition-all ${
              isActive(item.href) ? 'text-amber-300' : 'text-white'
            }`}
          >
            {item.icon}
            <p>{item.label}</p>
          </Link>
        ))}
      </nav>
    </Drawer>
  );
};

export default Menu;

'use client'
import { Navbar } from '@/usercomponents/Navbar'
import { usePathname } from 'next/navigation'
import React from 'react'

interface LayoutProp {
    children: React.ReactNode
}

const Layout = ({children}:LayoutProp) => {

  const pathname = usePathname();

  return (
    <div>
    <div>
    {
      pathname === "/user/login" ? null :<Navbar/>
    }
    </div>
    <div>
    {children}  
    </div>  
    </div>
  )
}

export default Layout
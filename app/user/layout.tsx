'use client'
import React from 'react'
import { Navbar } from '@/usercomponents/Navbar'
import { usePathname } from 'next/navigation'
import { Providers } from '../redux/providers';

interface LayoutProp {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProp) => {

  const pathname = usePathname();

  return (
    <div>
      <div>
        {
          pathname === "/user/login" ? null : <Navbar />
        }
      </div>
      <div>
        <Providers>
          {children}
        </Providers>
      </div>
    </div>
  )
}

export default Layout
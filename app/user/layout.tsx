'use client'
import React from 'react'
import { Navbar } from '@/usercomponents/Navbar'
import { usePathname } from 'next/navigation'
import { Providers } from '../redux/providers';
import Footer from '@/usercomponents/Footer';
import { store } from '../redux/store';

interface LayoutProp {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProp) => {

  const pathname = usePathname();

  return (
    <div>
      <div className="sticky top-0 z-50 bg-white shadow-md">
        {
          pathname === "/user/login" ? null : <Navbar />
        }
      </div>
      <div>
        <Providers store={store}>
          {children}
        </Providers>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
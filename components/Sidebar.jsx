'use client';
import Link from "next/link";
import { assets } from "../assests/assets";
import Image from "next/image";
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import { SlArrowRightCircle, SlArrowLeftCircle } from "react-icons/sl";
import Drawer from '@mui/material/Drawer';

export const Sidebar = () => {
  const router = useRouter();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSmallScreen(true);
        setIsSidebarVisible(false);
      } else {
        setIsSmallScreen(false);
        setIsSidebarVisible(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory) {
      router.push(`/admin/category/${selectedCategory.toLowerCase()}`);
    }
  };

  const toggleCategoryDropdown = () => setIsCategoryOpen(!isCategoryOpen);
  const toggleSidebar = () => setIsSidebarVisible(!isSidebarVisible);
  const isActive = (href) => pathname.startsWith(href);

  return (
    <div className="flex flex-col w-40 lg:w-75 h-screen">
      <button
        onClick={toggleSidebar}
        className="lg:hidden text-white bg-black fixed top-4 left-0 rounded-full z-20 w-6 h-6 flex items-center justify-center"
      >
        {isSidebarVisible ? <SlArrowLeftCircle size={20} /> : <SlArrowRightCircle size={20} />}
      </button>

      <Drawer
        variant={isSmallScreen ? "temporary" : "persistent"}
        anchor="left"
        open={isSidebarVisible}
        onClose={toggleSidebar}
        PaperProps={{
          sx: {
            width: { xs: 160, md: 180, lg: 260 },
            bgcolor: '#202020',
            overflowY: 'auto',
            overflowX: 'hidden',
            borderRight: '1px solid #333',
            position: isSmallScreen ? 'fixed' : 'relative',
            '&::-webkit-scrollbar': {
              width: '8px',
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
          disableScrollLock: true
        }}      >

        <div className="flex flex-col h-full">
          <div className="py-4 px-5 flex items-center justify-center">
            <Image src={assets.nlogo} alt="logo" width={130} height={100} />
          </div>

          <nav className="flex flex-col space-y-2 px-4">
            <Link href="/admin/dashboard" className={`flex items-center gap-3 font-medium p-3 rounded-md transition-all ${isActive('/admin/dashboard') ? 'text-amber-300' : 'text-white'}`}>
              <Image src={assets.dash} alt="dashboard" />
              <p>Dashboard</p>
            </Link>

            <Link href="/admin/user" className={`flex items-center gap-3 font-medium p-3 rounded-md transition-all ${isActive('/admin/user') ? 'text-amber-300' : 'text-white'}`}>
              <Image
                src={assets.user}
                alt="user"
                className={`${isActive('/admin/user') ? 'fill-amber-400' : 'fill-white'}`}
                width={20}
                height={20}
              />
              <p>Users</p>
            </Link>
            <Link href="/admin/products" className={`flex items-center gap-3 font-medium p-3 rounded-md transition-all ${isActive('/admin/products') ? 'text-amber-300' : 'text-white'}`}>
              <Image src={assets.products} alt="products" />
              <p>Products</p>
            </Link>

            <Link href="/admin/orders" className={`flex items-center gap-3 font-medium p-3 rounded-md transition-all ${isActive('/admin/orders') ? 'text-amber-300' : 'text-white'}`}>
              <Image src={assets.order} alt="orders" />
              <p>Orders</p>
            </Link>

            <div className="relative">
              <button
                onClick={toggleCategoryDropdown}
                className={`flex items-center gap-3 font-medium p-3 rounded-md ${isActive('/admin/category') ? 'text-amber-300' : 'text-white'}`}
              >
                <Image src={assets.category} alt="category" />
                <p>Category</p>
              </button>

              {isCategoryOpen && (
                <div className="mt-2 shadow-md rounded-md w-full z-10">
                  <button
                    onClick={() => handleCategoryChange({ target: { value: 'categories' } })}
                    className={`w-full text-left px-4 py-2 text-white ml-5 ${isActive('/admin/category/categories') ? 'text-amber-300' : 'text-white'}`}
                  >
                    Category
                  </button>
                  <button
                    onClick={() => handleCategoryChange({ target: { value: 'subcategories' } })}
                    className={`w-full text-left px-4 py-2 text-white ml-5 ${isActive('/admin/category/subcategories') ? 'text-amber-300' : 'text-white'}`}
                  >
                    Sub Category
                  </button>
                </div>
              )}
            </div>
            <Link href="/admin/brands" className={`flex items-center gap-3 font-medium p-3 rounded-md transition-all ${isActive('/admin/brands') ? 'text-amber-300' : 'text-white'}`}>
              <Image src={assets.brands} alt="brands" />
              <p>Brands</p>
            </Link>

            <Link href="/admin/couponmanage" className={`flex items-center gap-3 font-medium p-3 rounded-md transition-all ${isActive('/admin/couponmanage') ? 'text-amber-300' : 'text-white'}`}>
              <Image src={assets.coupon} alt="coupon" />
              <p>Coupon Management</p>
            </Link>

            <Link href="/admin/homemanage" className={`flex items-center gap-3 font-medium p-3 rounded-md transition-all ${isActive('/admin/homemanage') ? 'text-amber-300' : 'text-white'}`}>
              <Image src={assets.hm} alt="home" />
              <p>Home Management</p>
            </Link>

            <Link href="/admin/pages" className={`flex items-center gap-3 font-medium p-3 rounded-md transition-all ${isActive('/admin/pages') ? 'text-amber-300' : 'text-white'}`}>
              <Image src={assets.page} alt="pages" />
              <p>Pages</p>
            </Link>

            <Link href="/admin/faq" className={`flex items-center gap-3 font-medium p-3 rounded-md transition-all ${isActive('/admin/faq') ? 'text-amber-300' : 'text-white'}`}>
              <Image src={assets.faq} alt="faq" />
              <p>FAQ</p>
            </Link>
          </nav>
        </div>
      </Drawer>
    </div>
  );
};

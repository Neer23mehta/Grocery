'use client';
import Link from "next/link";
import { assets } from "../assests/assets";
import Image from "next/image";
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import { SlArrowRightCircle, SlArrowLeftCircle } from "react-icons/sl";
import Drawer from '@mui/material/Drawer';
import { PiGitBranchThin } from "react-icons/pi";

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
    <div>
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
            width: { xs: 190, md: 180, lg: 290 },
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
          <div className="md:py-4 py-2 md:mr-15 flex items-center justify-center">
            <Image src={assets.nlogo} alt="logo" width={130} height={100} className="mt-2 md:mt-0"/>
          </div>

          <nav className="flex flex-col md:space-y-2 space-y-4 px-4">
            <Link href="/admin/dashboard" className={`flex items-center md:gap-3 p-2 gap-2 font-medium md:p-3 rounded-md transition-all ${isActive('/admin/dashboard') ? 'text-amber-300' : 'text-white'}`}>
              <Image src={isActive("/admin/dashboard") ? assets.dash1 : assets.dash} alt="dashboard" />
              <p className="underline-offset-1 md:text-base text-sm">Dashboard</p>
            </Link>

            <Link href="/admin/user" className={`flex items-center md:gap-3 font-medium md:p-3 p-2 gap-2 rounded-md transition-all ${isActive('/admin/user') ? 'text-amber-300' : 'text-white'}`}>
              <Image
                src={isActive('/admin/user') ? assets.user1 : assets.user}
                alt="user"
                className={`${isActive('/admin/user') ? 'fill-amber-400' : 'fill-white'}`}
                width={20}
                height={20}
              />
              <p className="md:text-base text-sm">Users</p>
            </Link>
            <Link
              href="/admin/products"
              className={`flex items-center md:gap-3 font-medium md:p-3 p-2 gap-2 rounded-md transition-all ${isActive('/admin/products') || isActive('/admin/addproduct') ? 'text-amber-300' : 'text-white'
                }`}
            >
              <Image
                src={isActive('/admin/products') || isActive('/admin/addproduct') ? assets.product1 : assets.products}
                alt="products"
              />
              <p className="md:text-base text-sm">Products</p>
            </Link>

            <Link href="/admin/orders" className={`flex items-center md:gap-3 font-medium md:p-3 p-2 gap-2 rounded-md transition-all  ${isActive('/admin/orders') ? 'text-amber-300' : 'text-white'}`}>
              <Image src={isActive('/admin/orders') ? assets.order1 : assets.order} alt="orders" />
              <p className="md:text-base text-sm">Orders</p>
            </Link>

            <div className="relative">
              <button
                onClick={toggleCategoryDropdown}
                className={`flex items-center md:gap-3 font-medium md:p-3 p-2 gap-2 rounded-md ${isActive('/admin/category') ? 'text-amber-300' : 'text-white'}`}
              >
                <Image src={isActive('/admin/category') ? assets.category1 : assets.category} alt="category" />
                <p className="md:text-base text-sm">Category</p>
              </button>

              {isCategoryOpen && (
                <div className="mt-2 rounded-md w-full z-10">
                  <button
                    onClick={() => handleCategoryChange({ target: { value: 'categories' } })}
                    className={`w-full text-left hover:cursor-pointer md:px-4 md:py-2 px-2 py-1 md:text-base text-sm ml-5 ${isActive('/admin/category/categories') ? 'text-amber-300' : 'text-white'}`}
                  >
                    Category
                  </button>
                  <button
                    onClick={() => handleCategoryChange({ target: { value: 'subcategories' } })}
                    className={`w-full text-left hover:cursor-pointer md:px-4 md:py-2 px-2 py-1 ml-5 md:text-base text-sm ${isActive('/admin/category/subcategories') ? 'text-amber-300' : 'text-white'}`}
                  >
                    Sub Category
                  </button>
                </div>
              )}
            </div>
            <Link href="/admin/brands" className={`flex items-center md:gap-3 font-medium md:p-3 p-2 gap-2 rounded-md transition-all  ${isActive('/admin/brands') ? 'text-amber-300' : 'text-white'}`}>
              <Image src={isActive('/admin/brands') ? assets.brands1 : assets.brands} alt="brands" />
              <p className="md:text-base text-sm">Brands</p>
            </Link>

            <Link href="/admin/couponmanage" className={`flex items-center md:gap-3 font-medium md:p-3 p-2 gap-2 rounded-md transition-all ${isActive('/admin/couponmanage') ? 'text-amber-300' : 'text-white'}`}>
              <Image src={isActive('/admin/couponmanage') ? assets.coupon1 : assets.coupon} alt="coupon" />
              <p className="md:text-base text-sm">{isSmallScreen ? "Coupon" : "Coupon Management"}</p>
            </Link>

            <Link href="/admin/homemanage" className={`flex items-center md:gap-3 font-medium md:p-3 p-2 gap-2 rounded-md transition-all  ${isActive('/admin/homemanage') ? 'text-amber-300' : 'text-white'}`}>
              <Image src={isActive('/admin/homemanage') ? assets.hm1 : assets.hm} alt="home" />
              <p className="md:text-base text-sm">{isSmallScreen ? "Home" : "Home Management"}</p>
            </Link>

            <Link href="/admin/pages" className={`flex items-center md:gap-3 font-medium md:p-3 p-2 gap-2 rounded-md transition-all  ${isActive('/admin/pages') ? 'text-amber-300' : 'text-white'}`}>
              <Image src={isActive('/admin/pages') ? assets.page1 : assets.page} alt="pages" />
              <p className="md:text-base text-sm">Pages</p>
            </Link>

            <Link href="/admin/faq" className={`flex items-center md:gap-3 font-medium md:p-3 p-2 gap-2 rounded-md transition-all  ${isActive('/admin/faq') ? 'text-amber-300' : 'text-white'}`}>
              <Image src={isActive('/admin/faq') ? assets.faq1 : assets.faq} alt="faq" />
              <p className="md:text-base text-sm">FAQ</p>
            </Link>

            {/* <Link href="/admin/design" className={`flex items-center md:gap-3 font-medium md:p-3 p-2 gap-2 rounded-md transition-all  mr-1 ${isActive('/admin/design') ? 'text-amber-300' : 'text-white'}`}>
            <PiGitBranchThin size={20}/>
            <p className="md:text-base text-sm">Design</p>
            </Link>

            <Link href="/user" className={`flex items-center md:gap-3 font-medium md:p-3 p-2 gap-2 rounded-md transition-all  mr-1 ${isActive('/user') ? 'text-amber-300' : 'text-white'}`}>
            <PiGitBranchThin size={20}/>
            <p className="md:text-base text-sm">User</p>
            </Link> */}
          </nav>
        </div>
      </Drawer>
    </div>
  );
};

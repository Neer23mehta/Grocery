'use client';
import Link from "next/link";
import { assets } from "../assests/assets";
import Image from "next/image";
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import { SlArrowRightCircle } from "react-icons/sl";
import { SlArrowLeftCircle } from "react-icons/sl";


export const Sidebar = () => {
  const router = useRouter();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const [isSmallScreen, setIsSmallScreen] = useState(false);

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

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory) {
      router.push(`/admin/category/${selectedCategory.toLowerCase()}`);
    }
  };

  const toggleCategoryDropdown = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const pathname = usePathname();

  const isActive = (href) => {
    return pathname === href;
  };

  console.log("path", pathname)

  return (
<div className="flex flex-col w-40 lg:w-65 h-screen">
<button
        onClick={toggleSidebar}
        className="lg:hidden text-white bg-black mt-0  fixed top-4 left-0 rounded-full z-20 w-6  h-6 flex items-center justify-center"
      >
        {isSidebarVisible ? (
          <span className="text-xl top-0"><SlArrowLeftCircle size={20} /></span>
        ) : (
          <span className="text-xl top-0"><SlArrowRightCircle size={20} /></span>
        )}
      </button>

      <div
        className={`flex flex-col w-40 lg:w-65 md:w-45 md:size-full lg:size-full size-full border-r bg-[#202020] fixed lg:relative md:relative transition-all ${isSidebarVisible || !isSmallScreen ? 'block' : 'hidden'}`}
      >
        <div className="px-6 py-4 flex items-center justify-center">
          <Image src={assets.nlogo} alt="logo" width={130} height={100} />
        </div>
        <nav className="flex flex-col space-y-2 px-4">
          <Link
            href="/admin/dashboard"
            className={`flex items-center gap-3 font-medium p-3 rounded-md transition-all ${isActive('/admin/dashboard') ? 'text-amber-300' : 'text-white'}`
            }

          >
            <Image src={assets.dash} className={isActive('/admin') ? 'text-amber-300' : 'text-white'} alt="dashboard" />
            <p>Dashboard</p>
          </Link>

          <Link
            href="/admin/user"
            className={`flex items-center gap-3 font-medium p-3 rounded-md transition-all ${isActive('/admin/user' || `/admin/user/${id}`) ? 'text-amber-300' : 'text-white'}`}
          >
            <Image src={assets.user} className={isActive('/admin/user') ? 'text-amber-300' : 'text-white'} alt="user" />
            <p>Users</p>
          </Link>

          <Link
            href="/admin/products"
            className={`flex items-center gap-3 font-medium p-3 rounded-md transition-all ${isActive('/admin/products' || '/admin/products/addproduct') ? 'text-amber-300' : 'text-white'}`}
          >
            <Image src={assets.products} className={isActive('/admin/products') ? 'text-amber-300' : 'text-white'} alt="products" />
            <p>Products</p>
          </Link>

          <Link
            href="/admin/orders"
            className={`flex items-center gap-3 font-medium p-3 rounded-md transition-all ${isActive('/admin/orders') ? 'text-amber-300' : 'text-white'}`}
          >
            <Image src={assets.order} className={isActive('/admin/orders') ? 'text-amber-300' : 'text-white'} alt="orders" />
            <p>Orders</p>
          </Link>

          <div className="relative">
            <button
              className={`flex items-center gap-3 font-medium p-3 rounded-md ${isActive('/admin/category/categories') ? 'text-amber-300' : 'text-white'}`}
              onClick={toggleCategoryDropdown}
            >
              <Image src={assets.category} className={isActive('/admin/category/categories') ? 'text-amber-300' : 'text-white'} alt="category" style={({ isActive }) => ({
                color: isActive ? "yellow" : "white"
              })} />
              <p>Category</p>
            </button>

            {isCategoryOpen && (
              <div className="mt-2 shadow-md rounded-md w-full z-10">
                <button
                  onClick={() => handleCategoryChange({ target: { value: 'categories' } })}
                  className={`w-full text-left px-4 py-2 text-white ml-5 ${isActive('admin/category/categories') ? 'text-amber-300' : 'text-white'}`}
                >
                  Category
                </button>
                <button
                  onClick={() => handleCategoryChange({ target: { value: 'subcategories' } })}
                  className={`w-full text-left px-4 py-2 text-white ml-5 ${isActive('admin/category/subcategories') ? 'text-amber-300' : 'text-white'}`}
                >
                  Sub Category
                </button>
              </div>
            )}
          </div>

          <Link
            href="/admin/brands"
            className={`flex items-center gap-3 font-medium p-3 rounded-md transition-all ${isActive('/admin/brands') ? 'text-amber-300' : 'text-white'}`}
          >
            <Image src={assets.brands} className={isActive('/admin/brands') ? 'text-amber-300' : 'text-white'} alt="brands" />
            <p>Brands</p>
          </Link>
          <Link
            href="/admin/couponmanage"
            className={`flex items-center gap-3 font-medium p-3 rounded-md transition-all ${isActive('/admin/couponmanage') ? 'text-amber-300' : 'text-white'}`}
          >
            <Image src={assets.coupon} className={isActive('/admin/couponmanage') ? 'text-amber-300' : 'text-white'} alt="coupon" />
            <p>Coupon Management</p>
          </Link>
          <Link
            href="/admin/homemanage"
            className={`flex items-center gap-3 font-medium p-3 rounded-md transition-all ${isActive('/admin/homemanage') ? 'text-amber-300' : 'text-white'}`}
          >
            <Image src={assets.hm} className={isActive('/admin/homemanage') ? 'text-amber-300' : 'text-white'} alt="home" />
            <p>Home Management</p>
          </Link>
          <Link
            href="/admin/pages"
            className={`flex items-center gap-3 font-medium p-3 rounded-md transition-all ${isActive('/admin/pages') ? 'text-amber-300' : 'text-white'}`}
          >
            <Image src={assets.page} className={isActive('/admin/pages') ? 'text-amber-300' : 'text-white'} alt="pages" />
            <p>Pages</p>
          </Link>
          <Link
            href="/admin/faq"
            className={`flex items-center gap-3 font-medium p-3 rounded-md transition-all ${isActive('/admin/faq') ? 'text-amber-300' : 'text-white'}`}
          >
            <Image src={assets.faq} className={isActive('/admin/faq') ? 'text-amber-300' : 'text-white'} alt="faq" />
            <p>FAQ</p>
          </Link>
        </nav>
      </div>
    </div>
  );
};

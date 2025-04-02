'use client'
import Link from "next/link";
import { assets } from "../assests/assets";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState } from "react";

export const Sidebar = () => {
  const router = useRouter();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);  

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory) {
      router.push(`/admin/category/${selectedCategory.toLowerCase()}`);
    }
  };

  const toggleCategoryDropdown = () => {
    setIsCategoryOpen(!isCategoryOpen);
  };

  const isActive = (href) => {
    return router.pathname === href;
  };

  return (
    <div className="flex flex-col w-28 sm:w-80 h-screen border-r" style={{ backgroundColor: '#202020' }}>
      <div className="px-6 py-4 flex items-center justify-center">
        <Image src={assets.nlogo} alt="logo" width={130} height={100} />
      </div>
      <nav className="flex flex-col space-y-2 px-4">
        <Link
          href="/admin"
          className={`flex items-center gap-3 font-medium p-3 rounded-md transition-all ${isActive('/admin') ? 'text-orange-500' : 'text-white'}`}
        >
          <Image src={assets.dash} className={isActive('/admin') ? 'text-orange-500' : 'text-white'} alt="dashboard"/>
          <p>Dashboard</p>
        </Link>
        <Link
          href="/admin/user"
          className={`flex items-center gap-3 font-medium p-3 rounded-md transition-all ${isActive('/admin/user') ? 'text-orange-500' : 'text-white'}`}
        >
          <Image src={assets.user} className={isActive('/admin/user') ? 'text-orange-500' : 'text-white'} alt="user"/>
          <p>Users</p>
        </Link>
        <Link
          href="/admin/products"
          className={`flex items-center gap-3 font-medium p-3 rounded-md transition-all ${isActive('/admin/products') ? 'text-orange-500' : 'text-white'}`}
        >
          <Image src={assets.products} className={isActive('/admin/products') ? 'text-orange-500' : 'text-white'} alt="products"/>
          <p>Products</p>
        </Link>
        <Link
          href="/admin/orders"
          className={`flex items-center gap-3 font-medium p-3 rounded-md transition-all ${isActive('/admin/orders') ? 'text-orange-500' : 'text-white'}`}
        >
          <Image src={assets.order} className={isActive('/admin/orders') ? 'text-orange-500' : 'text-white'} alt="orders"/>
          <p>Orders</p>
        </Link>
        
        <div className="relative">
          <button
            className={`flex items-center gap-3 font-medium p-3 rounded-md ${isActive('/admin/category') ? 'text-orange-500' : 'text-white'}`}
            onClick={toggleCategoryDropdown}
          >
            <Image src={assets.category} className={isActive('/admin/category') ? 'text-orange-500' : 'text-white'} alt="category"/>
            <p>Category</p>
          </button>

          {isCategoryOpen && (
            <div className="mt-2 shadow-md rounded-md w-full z-10"> 
              <button
                onClick={() => handleCategoryChange({ target: { value: 'categories' } })}
                className="w-full text-left px-4 py-2 text-white ml-5"
              >
                Category
              </button>
              <button
                onClick={() => handleCategoryChange({ target: { value: 'subcategories' } })}
                className="w-full text-left px-4 py-2 text-white ml-5"
              >
                Sub Category
              </button>
            </div>
          )}
        </div>

        <Link
          href="/admin/brands"
          className={`flex items-center gap-3 font-medium p-3 rounded-md transition-all ${isActive('/admin/brands') ? 'text-orange-500' : 'text-white'}`}
        >
          <Image src={assets.brands} className={isActive('/admin/brands') ? 'text-orange-500' : 'text-white'} alt="brands"/>
          <p>Brands</p>
        </Link>
        <Link
          href="/admin/couponmanage"
          className={`flex items-center gap-3 font-medium p-3 rounded-md transition-all ${isActive('/admin/couponmanage') ? 'text-orange-500' : 'text-white'}`}
        >
          <Image src={assets.coupon} className={isActive('/admin/couponmanage') ? 'text-orange-500' : 'text-white'} alt="coupon"/>
          <p>Coupon Management</p>
        </Link>
        <Link
          href="/admin/homemanage"
          className={`flex items-center gap-3 font-medium p-3 rounded-md transition-all ${isActive('/adminhomemanage') ? 'text-orange-500' : 'text-white'}`}
        >
          <Image src={assets.hm} className={isActive('/admin/homemanage') ? 'text-orange-500' : 'text-white'} alt="home"/>
          <p>Home Management</p>
        </Link>
        <Link
          href="/admin/pages"
          className={`flex items-center gap-3 font-medium p-3 rounded-md transition-all ${isActive('/admin/pages') ? 'text-orange-500' : 'text-white'}`}
        >
          <Image src={assets.page} className={isActive('/admin/pages') ? 'text-orange-500' : 'text-white'} alt="pages"/>
          <p>Pages</p>
        </Link>
        <Link
          href="/admin/faq"
          className={`flex items-center gap-3 font-medium p-3 rounded-md transition-all ${isActive('/admin/faq') ? 'text-orange-500' : 'text-white'}`}
        >
          <Image src={assets.faq} className={isActive('/admin/faq') ? 'text-orange-500' : 'text-white'} alt="faq"/>
          <p>FAQ</p>
        </Link>
      </nav>
    </div>
  );
};

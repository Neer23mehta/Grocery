'use client'
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import { useState } from "react";
import Image from "next/image";
import { Uassets } from "@/Uassets/uassets";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const router = useRouter();
  const totalQuantity = useSelector((state:any) => state.cart.totalQuantity);
  const handleSearchChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectChange = (e: any) => {
    const value = e.target.value;
    setSelectedOption(value);

    if (value === 'category1') {
      router.push("/user/grocery");
    } else if (value === 'category2') {
      router.push("/user/fashion");
    }    

  };

  const handleSearchSubmit = (e: any) => {
    e.preventDefault();
    console.log('Search for:', searchQuery, 'Category:', selectedOption);
  };
  console.log("tq12",totalQuantity)
  return (
    <div className="bg-white text-black shadow-md ">
      <nav className="flex justify-between items-center py-5  px-10 mx-auto w-full">
        <div className="text-3xl font-bold flex items-center space-x-3">
          <Image src={Uassets.logos} alt="logo" height={80} width={140} />
        </div>

        <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2 w-full max-w-md">
          <div className="flex flex-row justify-center items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="h-10 px-4 w-full text-black rounded-l-md border border-gray-300"
          />
          <button
            type="submit"
            className="py-2 px-4 bg-amber-400 text-black rounded-r-md hover:bg-amber-500"
          >
            Search
          </button>
          </div>
         
          <select
            value={selectedOption}
            onChange={handleSelectChange}
            className="h-10 p-2 bg-white border border-gray-300 rounded-md"
          >
            <option value="">Category</option>
            <option value="category1">Grocery</option>
            <option value="category2">Category 2</option>
            <option value="category3">Category 3</option>
          </select>
        </form>

        <ul className="flex space-x-6 items-center list-none ml-6">
          <li>
            <Link href="/user/home">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li className="relative">
            <span className="absolute ml-3 text-[12px] bottom-3.5 px-0.5 font-bold rounded-full bg-red-800 text-white">{totalQuantity}</span>
            <Link href="/user/cart">
              <IoCartOutline className="text-2xl" />
            </Link>
          </li>
          <li>
            <Link href="/orders">Orders</Link>
          </li>
          <li>
            <Link href="/user/login">Log-in</Link>
          </li>
          <li>
            <Link href="/admin">Admin</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

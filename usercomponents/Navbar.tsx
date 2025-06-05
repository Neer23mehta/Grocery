'use client'
import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Uassets } from "@/Uassets/uassets";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { TiThMenu } from "react-icons/ti";
import Menu from "./Menu";
import { useAuth0 } from "@auth0/auth0-react";

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();
  const { loginWithRedirect, logout, isAuthenticated, isLoading, user } = useAuth0();
  const totalQuantity = useSelector((state: any) => state.cart.totalQuantity);
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

  const handleMenuBar = () => {
    setShowMenu(!showMenu)
  }

  useEffect(() => {
    if (isAuthenticated && user) {
      console.log("User Info:", user);
      const userInfo = {
        name: user.name,
        email: user.email,
      };
      localStorage.setItem("UserInfo", JSON.stringify(userInfo));
    }
  }, [isAuthenticated, user]);

  return (
    <div className="bg-gray-100 text-black shadow-md ">
      <nav className="flex justify-between items-center py-5  px-10 mx-auto w-full">
        <div>
          <button onClick={() => handleMenuBar()}>
            <TiThMenu size={25} color="orange" />
            {
              showMenu ? (<Menu showMenu={showMenu} />) : null
            }
          </button>
        </div>
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
            className="h-10 p-2 bg-white border border-gray-300 rounded-md">
            <option value="">Category</option>
            <option value="category1">Grocery</option>
            <option value="category2">Category 2</option>
            <option value="category3">Category 3</option>
          </select>
        </form>

        <ul className="flex space-x-6 items-center list-none ml-6">
          <li className="font-bold">
            <Link href="/user/home">Home</Link>
          </li>
          <li className="font-bold">
            <Link href="/about">About</Link>
          </li>
          <li className="font-bold">
            <Link href="/contact">Contact</Link>
          </li>
          <li className="relative">
            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 text-xs font-bold rounded-full bg-red-700 text-white px-1.5 min-w-[20px] h-5 flex items-center justify-center">
              {totalQuantity}
            </span>
            <Link href="/user/cart">
              <IoCartOutline className="text-2xl font-bold" />
            </Link>
          </li>
          <li className="font-bold">
            <Link href="/orders">Orders</Link>
          </li>
          <li className="font-bold">
            <Link href="/admin">Admin</Link>
          </li>
          <li className="font-bold">
            {isLoading ? (
              <span>Loading...</span>
            ) : isAuthenticated ? (
              <button
                onClick={() => {
                  localStorage.removeItem("UserInfo");
                  logout({ returnTo: window.location.origin });
                }}
              >
                Log Out
              </button>
            ) : (
              <button onClick={() => loginWithRedirect()}>Log In</button>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

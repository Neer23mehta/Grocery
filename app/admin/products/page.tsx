'use client'
import { TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";
import { SlArrowRight } from "react-icons/sl";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { assets } from '@/assests/assets';
import commonGetApis from '@/commonapi/Commonapi';

interface Product {
  Product_Name: string;
  Description: string;
  Image: string;
  Price: string;
  Stock_Status: number;
  Variation: string;
  Category_Name: string;
}

interface ApiResponse {
  data: Product[];
}

const Page = () => {
  const [input, setInput] = useState<string>(""); 
  const [adds, setAdds] = useState<Product[]>([]); 
  const [scroll, setScroll] = useState<boolean>(false);
  const route = useRouter();

  const handleScroll = (e: React.WheelEvent) => {
    e.preventDefault();
    setScroll(!scroll);
  };

  const fetchCategories = async () => {

    try {
      const res = await commonGetApis("get_products?pageNumber=1&pageLimit=10");
      setAdds(res?.data.result || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  console.log("res",adds)
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddProduct = () => {
    route.push("/admin/products/addproduct");
  };

  return (
    <div className="">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col px-2">
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-gray-500 mt-2">Dashboard<span className="text-black ml-5">Products</span></p>
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Search Product"
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="ml-12 bg-white"
          />
          <button className="px-3 font-bold py-2 bg-amber-300 ml-5 w-auto h-13 " onClick={handleAddProduct}>Add Product</button>
        </div>
      </div>

      <div>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mt-5">
          <thead>
            <tr>
              <th className="py-2 px-2 text-left text-md font-semibold text-black">Image</th>
              <th className="px-2 py-2 text-left text-md font-semibold text-black">Product Name</th>
              <th className="px-2 py-2 text-left text-md font-semibold text-black">Category</th>
              <th className="px-2 py-2 text-left text-md font-semibold text-black">Description</th>
              <th className="px-2 py-2 text-left text-md font-semibold text-black">Variation</th>
              <th className="py-2 px-2 text-left text-md font-semibold text-black">Price</th>
              <th className="py-2 px-2 text-left text-md font-semibold text-black">Stock</th>
              <th className="py-2 px-2 text-left text-md font-semibold text-black">Action</th>
            </tr>
          </thead>
          <tbody className="">
            {adds
              .filter((item) => input === "" || item.Product_Name.toLowerCase().includes(input.toLowerCase()))
              .map((curval, index) => {
                const { Product_Name, Description, Price, Stock_Status, Variation, Category_Name } = curval;
                return (
                  <tr key={index} className=''>
                    <td className='px-2 py-2'>{curval.Image && <img src={curval.Image} alt={Product_Name} width={50} height={50} />}</td>
                    <td className='px-2 py-2'>{Product_Name}</td>
                    <td className='px-2 py-2'>{Category_Name}</td>
                    <td className='px-2 py-2'>{Description}</td>
                    <td className='px-2 py-2'>{Variation}</td>
                    <td className='px-2 py-2'>{Price}</td>
                    <td><div>{Stock_Status === 1 ? <Image src={assets.scrollon} alt='In-Stock'/> : <Image src={assets.scrolloff} alt='Out-of-Stock'/>}</div></td>
                    <td>
                      <button className='ml-2 text-gray-500'><MdEdit/></button>
                      <button className='ml-3 text-gray-500'><RiDeleteBin5Fill/></button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        <div className="flex justify-end bottom-0 mt-5 h-[20px] items-center">
          <button className="px-2 py-1 bg-gray-50">Previous</button>
          {["1", "2", "3", "4", "5", "6", "7", "Next"].map((curval, index) => {
            return (
              <button key={index} className="px-2 py-1 bg-gray-50">
                {curval}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;

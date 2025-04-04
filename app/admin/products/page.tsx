'use client'
import { TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";
import { SlArrowRight } from "react-icons/sl";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
// import { assets } from '../../../../assests/assets';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [input, setInput] = useState("");
  const [adds, setAdds] = useState([]);
  const [scroll, setScroll] = useState(false);
  const route = useRouter();

  const handleScroll = (e:any) => {
    e.preventDefault();
    setScroll(!scroll);
  };

  // const fetchCategories = async () => {
  //   const refreshtoken = localStorage.getItem("usertoken");
  //   const token = localStorage.getItem("token");

  //   try {
  //     const res = await axios.get("http://192.168.2.181:3000/admin/getcategories", {
  //       headers: {
  //         Authorizations: token,
  //         language: "en",
  //         refresh_token: refreshtoken,
  //       },
  //     });
  //     setAdds(res?.data?.data || []);
  //   } catch (error) {
  //     console.error("Error fetching categories:", error);
  //   }
  // };

  // const handledelete = async (No:any) => {
  //   try {
  //     const res = await axios.delete(`http://192.168.2.181:3000/admin/delete_category?id=${No}`,{
  //       method:"DELETE",
  //     })
  //     console.log("del",res)
  //     // setAdds(prev => prev.filter(item=>item.No !== No))
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // useEffect(() => {
  //   fetchCategories();
  // }, []);

  const handleaddproduct = () => {
      route.push("/admin/products/addproduct")
  }

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
          <button className="px-3 font-bold py-2 bg-amber-300 ml-5 w-auto h-13 " onClick={handleaddproduct}>Add Product</button>
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
          <tbody className="space-y-5">
            {/* {
              adds
                // .filter(item => input === "" || item.Category_Name.toLowerCase().includes(input.toLowerCase()))
                .map((curval) => {
                  const { No, Image, Category_Name, Status } = curval;
                  return (
                    <tr key={No} className="space-y-5">
                      <td className='px-2 py-3'>{No}</td>
                      <td>
                        <img src={Image} alt={Category_Name} className="w-14 h-13 object-cover" />
                      </td>
                      <td>{Category_Name}</td>
                      <td>
                        <button> */}
                        {/* <Image
                          src={scroll ? assets.scrolloff : assets.scrollon}
                          alt="Scroll Status"
                          onClick={(e)=>handleScroll(e)}
                          className="cursor-pointer"
                          height={30}
                          width={30}
            //             /> */}
            {/* //             </button>
            //           </td>
            //           <td>
            //             <button  className="ml-2 text-gray-600 rounded"><MdEdit size={18} /></button>
            //             <button  className="ml-5 text-gray-600 rounded"><RiDeleteBin5Fill size={18} /></button>
            //           </td>
            //         </tr>
            //       );
            //     })
            // } */}
          </tbody>
        </table>

        <div className='flex justify-end bottom-0 mt-5 h-[20px] items-center'>
                    <button className='px-2 py-1 bg-gray-50 '>Previous</button>
                    {
                        ["1","2","3","4","5","6","7","Next"].map((curval,index) => {
                            return (
                                <button key={index} className='px-2 py-1 bg-gray-50'>{curval}</button>
                            )
                        })
                    }
                    {/* {
                        adds.map((curval:any,index:any)=>{
                            return (
                                <button key={index}>
                                    {curval.i}
                                </button>
                            )
                        })
                    }     */}
            </div>
      </div>
    </div>
  );
};

export default Page;

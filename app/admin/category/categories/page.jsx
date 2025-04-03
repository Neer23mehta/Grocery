'use client'
import { TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";
import { SlArrowRight } from "react-icons/sl";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";

const Page = () => {
  const [input, setInput] = useState("");
  const [adds, setAdds] = useState([]);


  const fetchCategories = async () => {
    const refreshtoken = localStorage.getItem("usertoken");
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get("http://192.168.2.181:3000/admin/getcategories", {
        headers: {
          Authorizations: token,
          language: "en",
          refresh_token: refreshtoken,
        },
      });
      setAdds(res?.data?.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col px-2">
          <h1 className="text-3xl font-bold">Category</h1>
          <p className="text-gray-500 mt-2">Dashboard<span className="text-black ml-5">Category</span> </p>
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Search Category"
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="ml-50"
          />
          <button className="px-2 py-2 bg-amber-300 ml-5 w-40 h-13">Add Category</button>
        </div>
      </div>

      <div>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mt-5">
          <thead>
            <tr>
              <th className="px-2 py-2 text-left text-md font-semibold text-black">No.</th>
              <th className="py-2 px-2 text-left text-md font-semibold text-black">Image</th>
              <th className="py-2 px-2 text-left text-md font-semibold text-black">Category</th>
              <th className="py-2 px-2 text-left text-md font-semibold text-black">Status</th>
              <th className="py-2 px-2 text-left text-md font-semibold text-black">Action</th>
            </tr>
          </thead>
          <tbody className='space-y-3'>
            {
              adds
                .filter(item => input === "" || item.Category_Name.toLowerCase().includes(input.toLowerCase()))
                .map((curval) => {
                  const { No, Image, Category_Name, Status } = curval;
                  return (
                    <tr key={No} className='mt-5 space-y-3 '>
                      <td className='px-2 py-2 ml-4 left-4 mt-5'>{No}</td>
                      <td className='mt-5'>
                        <img src={Image} alt={Category_Name} className="w-14 h-13 object-cover " />
                      </td>
                      <td className='mt-5'>{Category_Name}</td>
                      <td>
                        {Status === 1 ? (
                          <span className="text-green-500"></span>
                        ) : (
                          <span className="text-red-500"> </span>
                        )}
                      </td>
                      <td>
                        <button className="ml-2 text-gray-600 rounded"><MdEdit size={18}/>                        </button>
                        <button className=" ml-5 text-gray-600 rounded"><RiDeleteBin5Fill size={18}/>                        </button>
                      </td>
                    </tr>
                  );
                })
            }
          </tbody>
        </table>

        <div className="flex justify-end mt-4">
          <button className="px-4 py-2 bg-gray-300 rounded-md mr-2">Previous</button>
          <button className="px-4 py-2 bg-gray-300 rounded-md">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Page;

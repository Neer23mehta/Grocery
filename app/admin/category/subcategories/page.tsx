'use client'
import { InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";
import { SlArrowRight } from "react-icons/sl";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";

interface Category {
  No: number;
  Image: string;
  Category_Name: string;
  Status: number;
}

const Page: React.FC = () => {
  const [input, setInput] = useState<string>('');
  const [adds, setAdds] = useState<Category[]>([]);
  const [addsub, setaddsub] = useState(false)

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

  const togglebutton = () => {
    setaddsub(!addsub)
  }

  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <div className="">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col px-2">
          <h1 className="text-3xl font-bold">Sub Category</h1>
          <p className="text-gray-500 mt-2">Dashboard<span className="text-black ml-5">Sub Category</span></p>
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Search Sub Category"
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="ml-50"
          />
          <button className="px-2 py-2 bg-amber-300 ml-5 w-40 h-13" onClick={togglebutton}>Add Sub Category</button>
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
          <tbody className="space-y-3">
            {
              adds
                .filter(item => input === "" || item.Category_Name.toLowerCase().includes(input.toLowerCase()))
                .map((curval) => {
                  const { No, Image, Category_Name, Status } = curval;
                  return (
                    <tr key={No} className="mt-5 space-y-3">
                      <td className="px-2 py-2 ml-4 left-4 mt-5">{No}</td>
                      <td className="mt-5">
                        <img src={Image} alt={Category_Name} className="w-14 h-13 object-cover" />
                      </td>
                      <td className="mt-5">{Category_Name}</td>
                      <td>
                        {Status === 1 ? (
                          <span className="text-green-500"></span>
                        ) : (
                          <span className="text-gray-500"></span>
                        )}
                      </td>
                      <td>
                        <button className="ml-2 text-gray-600 rounded">
                          <MdEdit size={18} />
                        </button>
                        <button className="ml-5 text-gray-600 rounded">
                          <RiDeleteBin5Fill size={18} />
                        </button>
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
      {
        addsub ? (
          <div className='flex flex-col justify-center items-center'>
            <form className='bg-white shadow-md z-[1] w-[465px] h-[525px] mb-350 absolute flex flex-col items-center'>
             <div className='flex flex-row'>
             <h1 className='items-center text-2xl ml-20 top-5 mt-3'>Add Sub Category</h1>
             <div className='flex justify-end ml-25'>
             <button className='text-gray-500 h-9 mt-1 text-2xl flex justify-end right-0 left-5'>X</button>
             </div>
             </div>
              <TextField id="outlined-basic" label="Sub Category" variant="outlined" className='mt-10 top-8 w-xs' />

              {/* <InputLabel id="demo-simple-select-helper-label">Category</InputLabel> */}
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={age}
                label="Select Category"
                onChange={handleChange}
                className='px-0 mt-25 w-xs'
              >
                {/* <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem> */}
              </Select>
              <label htmlFor="thumbnail" className="flex items-center justify-center cursor-pointer mb-6">
                    <div className="w-xs h-28 mt-10 flex items-center justify-center bg-gray-100 rounded-lg border-2 border-gray-300 transition-all duration-300 ease-in-out hover:border-gray-500 hover:shadow-lg">
                    </div>
                </label>
              <input
                    type="file"
                    id="thumbnail"
                    className="hidden"
              />

              <button className='bg-amber-300 w-xs h-12'>Save</button>
            </form>
          </div>
        ) : null
      }
    </div>
  );
};

export default Page;

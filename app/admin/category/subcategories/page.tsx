'use client'
import React, { useEffect, useState } from 'react';
import { InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import axios from 'axios';
import { IoSearchSharp } from "react-icons/io5";
import { SlArrowRight } from "react-icons/sl";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Image from 'next/image';
import { assets } from '../../../../assests/assets';

interface Category {
  No: number;
  Image: string;
  Category_Name: string;
  Status: number;
}

const Page = () => {
  const [input, setInput] = useState<string>('');
  const [adds, setAdds] = useState<Category[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false); 
  const [status, setStatus] = useState(false);
  const [image, setImage] = useState("");

  const fetchCategories = async () => {
    const refreshtoken = localStorage.getItem("usertoken");
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get("http://192.168.2.181:3000/admin/get_subcategories?pageNumber=1&pageLimit=10", {
        headers: {
          Authorizations: token,
          language: "en",
          refresh_token: refreshtoken,
        },
      });
      setAdds(res?.data?.data || []);
      console.log("subres",res.data)
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubCategoryDelete = async (id: number) => {
    const refreshtoken = localStorage.getItem("usertoken");
    const token = localStorage.getItem("token");

    try {
      const res = await axios.delete(`http://192.168.2.181:3000/admin/delete_subcategory?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorizations: token,
          language: "en",
          refresh_token: refreshtoken,
        },
      });
      setAdds(prev => prev.filter(items => items.No !== id));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const handleStatus = () => {
    setStatus(!status);
  }

  const formdata = new FormData();
  // formdata.append("SubCategory_Name",in)

  const handleSubCategorySubmit = async (e: any) => {
    e.preventDefault();
    const refreshtoken = localStorage.getItem("usertoken");
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post("http://192.168.2.181:3000/admin/add_subcategory", {
      });
      setOpenModal(false); 
    } catch (error) {
      console.error("Error submitting subcategory:", error);
    }
  }

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
          <button className="px-2 py-2 bg-amber-300 ml-5 w-40 h-13" onClick={() => setOpenModal(true)}>Add Sub Category</button>
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
                        <button className="ml-5 text-gray-600 rounded" onClick={() => handleSubCategoryDelete(No)}>
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

      <div className='flex flex-col justify-center items-center px-10'>
      <Dialog open={openModal} onClose={() => setOpenModal(false)} className='flex flex-col justify-center px-4'>
            <div className='flex justify-end items-end '>
            <button className='text-xl text-gray-400 mr-3 mt-2' onClick={()=>setOpenModal(false)}>X</button>
            </div>
        <div className='flex flex-row justify-center items-center'>
        <h1 className='text-2xl font-bold'>Add Sub Category</h1>
        </div>
        <DialogContent>
          <form onSubmit={handleSubCategorySubmit} className="flex flex-col items-center">
            <div className='flex flex-col justify-start items-start mt-6'>
            <p className='mb-2 text-gray-400'>Sub Category</p>
            <TextField
              id="subcategory-name"
              label="Sub Category"
              variant="outlined"
              className="mt-4 w-xs"
            />
            </div>           

            <div className='flex flex-col justify-start items-start mt-5'>
            <p className='text-gray-400'>Category</p>
            <Select
              labelId="select-category-label"
              id="select-category"
              value={age}
              onChange={handleChange}
              className="mt-2 w-xs h-[45px] text-black"
              label="Select Category"
            >
              <MenuItem value={1}>Vegetable</MenuItem>
              <MenuItem value={2}>Fruit</MenuItem>
              <MenuItem value={3}>Beauty</MenuItem>
              <MenuItem value={4}>Cold Drinks</MenuItem>
              <MenuItem value={5}>Personal Care</MenuItem>
            </Select>
            </div>

            <div className="flex flex-row mt-7">
              <label htmlFor="thumbnail" className="flex items-center justify-center cursor-pointer mb-6">
                <div className="h-[125px] w-[325px] flex items-center justify-center bg-gray-100 rounded-lg border-2 border-gray-300 transition-all duration-300 ease-in-out hover:border-gray-500 hover:shadow-lg">
                  <Image
                      src={image ? URL.createObjectURL(image) : assets.upimg}
                      alt="Upload Thumbnail"
                    className="object-cover rounded-lg"
                    width={100}
                    height={50}
                  />
                </div>
              </label>
              <input
                type="file"
                id="thumbnail"
                className="hidden"
                onChange={(e)=>setImage(e.target.files[0])}
              />
            </div>

            <DialogActions>
              <button type="submit" className='bg-amber-300 px-35 py-3 text-xl font-bold'>
                Save
              </button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      </div>
    </div>
  );
};

export default Page;

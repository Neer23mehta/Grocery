'use client'
import React, { useEffect, useState } from 'react';
import { TextField, Dialog, DialogActions, DialogContent } from '@mui/material';
import axios from 'axios';
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
  const [image, setImage] = useState<File | null>(null);
  const [brand, setBrand] = useState<Category[]>([]);
  const [inputs, setInputs] = useState({
    subcategory: "A",
    category: "",
    status:""
  });

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
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const handleSubCategoryDelete = async (id: number) => {
    const refreshtoken = localStorage.getItem("usertoken");
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://192.168.2.181:3000/admin/delete_subcategory?id=${id}`, {
        headers: {
          Authorizations: token,
          language: "en",
          refresh_token: refreshtoken,
        },
      });
      setAdds(prev => prev.filter(items => items.No !== id));
    } catch (error) {
      console.error("Error deleting subcategory:", error);
    }
  };

  const fetchGetCategory = async () => {
    const refreshtoken = localStorage.getItem('usertoken');
    const token = localStorage.getItem('token');

    try {
      const res = await axios.get('http://192.168.2.181:3000/admin/getcategories?pageNumber=1&pageLimit=10', {
        headers: {
          Authorizations: token,
          language: 'en',
          refresh_token: refreshtoken,
        },
      });
      setBrand(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubCategoryChange = (e: any) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubCategorySubmit = async (e: any) => {
    e.preventDefault();

    const refreshtoken = localStorage.getItem("usertoken");
    const token = localStorage.getItem("token");

    const formdata = new FormData();
    formdata.append("SubCategory_Name", inputs.subcategory);
    formdata.append("fk_category_id", inputs.category);
    formdata.append('status', inputs.status);
    if (image) {
      formdata.append("image", image);
    }

    try {
      await axios.post("http://192.168.2.181:3000/admin/add_subcategory", formdata, {
        headers: {
          Authorizations: token,
          language: 'en',
          refresh_token: refreshtoken,
          'Content-Type': 'multipart/form-data',
        },
      });
      setOpenModal(false);
      fetchCategories(); // Refresh the list
    } catch (error) {
      console.error("Error submitting subcategory:", error);
    }
  };

  useEffect(() => {
    fetchGetCategory();
    fetchCategories();
  }, []);

  return (
    <div className="">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col px-2">
          <h1 className="text-3xl font-bold">Sub Category</h1>
          <p className="text-gray-500 mt-2">Dashboard <span className="text-black ml-5">Sub Category</span></p>
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
          <tbody>
            {
              adds
                .filter(item => input === "" || item.Category_Name.toLowerCase().includes(input.toLowerCase()))
                .map(({ No, Image: ImgUrl, Category_Name, Status }) => (
                  <tr key={No}>
                    <td className="px-2 py-2">{No}</td>
                    <td><img src={ImgUrl} alt={Category_Name} className="w-14 h-13 object-cover" /></td>
                    <td>{Category_Name}</td>
                    <td>{Status === 1 ? <span className="text-green-500">Active</span> : <span className="text-gray-500">Inactive</span>}</td>
                    <td>
                      <button className="ml-2 text-gray-600 rounded"><MdEdit size={18} /></button>
                      <button className="ml-5 text-gray-600 rounded" onClick={() => handleSubCategoryDelete(No)}><RiDeleteBin5Fill size={18} /></button>
                    </td>
                  </tr>
                ))
            }
          </tbody>
        </table>

        <div className="flex justify-end mt-4">
          <button className="px-4 py-2 bg-gray-300 rounded-md mr-2">Previous</button>
          <button className="px-4 py-2 bg-gray-300 rounded-md">Next</button>
        </div>
      </div>

      <Dialog open={openModal} onClose={() => setOpenModal(false)} className='flex flex-col justify-center px-4'>
        <div className='flex justify-end items-end'>
          <button className='text-xl text-gray-400 mr-3 mt-2' onClick={() => setOpenModal(false)}>X</button>
        </div>
        <div className='flex flex-row justify-center items-center shadow-sm'>
          <h1 className='text-2xl font-bold mb-3'>Add Sub Category</h1>
        </div>
        <DialogContent>
          <form onSubmit={handleSubCategorySubmit} className="flex flex-col items-center px-5">
            <div className='flex flex-col justify-start items-start mt-6 w-full'>
              <p className='mb-2 text-gray-400'>Sub Category</p>
              <input type='text' name='subcategory' value={inputs.subcategory} placeholder='Sub Category' onChange={(e)=>handleSubCategoryChange(e)} className='text-gray-400 border border-gray-200 py-2 w-full px-2' />
            </div>
            <div className="flex flex-col mt-5 justify-start items-start w-full">
              <label className="text-gray-400">Category</label>
              <select
                name="category"
                value={inputs.category}
                onChange={handleSubCategoryChange}
                className="border border-gray-200 mt-1 py-2.5 px-2.5 w-full"
              >
                <option value="">Select</option>
                {brand.map((curval) => (
                  <option key={curval.No} value={curval.No}>
                    {curval.Category_Name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-row mt-7">
              <label htmlFor="thumbnail" className="cursor-pointer">
                <div className="h-[125px] w-[325px] flex items-center justify-center bg-gray-100 rounded-lg border-2 border-gray-300 hover:border-gray-500 hover:shadow-lg">
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
                onChange={(e) => setImage(e.target.files?.[0] || null)}
              />
            </div>

            <div className="flex flex-col mt-5">
              <label className="text-gray-400">Status</label>
              <select
                name="status"
                value={inputs.status}
                onChange={handleSubCategoryChange}
                className="border border-gray-200 w-full py-2 px-2.5"
              >
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>

            <DialogActions>
              <button type="submit" className='bg-amber-300 px-10 py-3 text-xl font-bold mt-4'>
                Save
              </button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;

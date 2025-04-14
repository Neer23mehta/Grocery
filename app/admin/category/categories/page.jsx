'use client'
import { Dialog, DialogActions, DialogContent, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { assets } from '../../../../assests/assets';
import Image from 'next/image';
import { toast } from 'react-toastify';

const Page = () => {
  const [input, setInput] = useState("");
  const [adds, setAdds] = useState([]);
  const [addCategory, setAddCategory] = useState(false);
  const [image, setImage] = useState("");
  const [inputs, setInputs] = useState({
    category: "",
    status: "1"
  });

  const fetchCategories = async () => {
    const refreshtoken = localStorage.getItem("usertoken");
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get("http://192.168.2.181:3000/admin/getcategories?pageNumber=1&pageLimit=10", {
        headers: {
          Authorizations: token,
          language: "en",
          refresh_token: refreshtoken,
        },
      });

      const result = res?.data?.data?.result || [];
      setAdds(result);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const refreshtoken = localStorage.getItem("usertoken");
    const token = localStorage.getItem("token");

    const formdata = new FormData();
    formdata.append("category_name", inputs.category);
    formdata.append("status", inputs.status);
    if (image) {
      formdata.append("image", image);
    }

    try {
      const res = await axios.post("http://192.168.2.181:3000/admin/addcategory", formdata, {
        headers: {
          Authorizations: token,
          language: "en",
          refresh_token: refreshtoken
        }
      });
      if (res.data) {
        toast.success("Added Successfully");
        fetchCategories(); 
        setAddCategory(false); 
        setInputs({ category: "", status: "1" });
        setImage("");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async (id) => {
    const refreshtoken = localStorage.getItem("usertoken");
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://192.168.2.181:3000/admin/deletecategory?id=${id}`, {
        headers: {
          Authorizations: token,
          language: "en",
          refresh_token: refreshtoken
        }
      });
      setAdds(prev => prev.filter(item => item.No !== id));
      toast.success("Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  }

  const handleCategoryPost = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col px-2">
          <h1 className="text-3xl font-bold">Category</h1>
          <p className="text-gray-500 mt-2">Dashboard<span className="text-black ml-5">Category</span></p>
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Search Category"
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="ml-12"
          />
          <button className="px-2 py-2 bg-amber-300 ml-5 w-40 h-13" onClick={() => setAddCategory(true)}>Add Category</button>
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
          <tbody className="space-y-5">
            {
              adds
                .filter(item =>
                  input === "" || (item?.Category_Name?.toLowerCase().includes(input.toLowerCase()))
                )
                .map((curval) => {
                  const { No, Image: Img, Category_Name, Status } = curval;
                  return (
                    <tr key={No} className="space-y-5">
                      <td className='px-2 py-3'>{No}</td>
                      <td>
                        <img src={Img} alt={Category_Name} className="w-14 h-13 object-cover" />
                      </td>
                      <td>{Category_Name}</td>
                      <td className='px-2 py-2'>{Status === 1 ? <span><Image src={assets.scrollon} alt='Active'/></span> : <span><Image src={assets.scrolloff} alt='Inactive'/></span>}</td>
                      <td>
                        <button className="ml-2 text-gray-600 rounded"><MdEdit size={18} /></button>
                        <button onClick={() => handleDelete(No)} className="ml-5 text-gray-600 rounded"><RiDeleteBin5Fill size={18} /></button>
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

      {/* Add Category Dialog */}
      <Dialog open={addCategory} onClose={() => setAddCategory(false)}>
        <div className='flex flex-col justify-center bg-white shadow-md'>
          <DialogContent>
            <form onSubmit={handleSubmit} className='bg-white z-[1] flex flex-col px-3'>
              <div className='flex flex-row'>
                <h1 className='items-center text-2xl ml-20'>Add Category</h1>
                <div className='flex justify-end ml-25'>
                  <button
                    type="button"
                    className='text-gray-500 h-9 mb-9 text-2xl flex justify-end right-0 left-20 hover:text-red-700'
                    onClick={() => setAddCategory(false)}
                  >
                    X
                  </button>
                </div>
              </div>
              <div className='flex flex-col justify-start items-start mt-10'>
                <label className='py-2 text-gray-400'>Category Name</label>
                <input
                  type='text'
                  name='category'
                  onChange={handleCategoryPost}
                  value={inputs.category}
                  placeholder='Category Name'
                  required
                  className='border border-gray-200 px-2.5 py-2 w-full'
                />
              </div>

              <div className="flex flex-col mt-5">
                <label className="text-gray-400">Status</label>
                <select
                  name="status"
                  value={inputs.status}
                  onChange={handleCategoryPost}
                  className="border border-gray-200 w-full py-2 px-2.5"
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>

              <div className='flex flex-row mt-7'>
                <label htmlFor="thumbnail" className="flex items-center justify-center cursor-pointer mb-6">
                  <div className="w-[325px] h-[125px] flex items-center justify-center bg-gray-100 rounded-lg border-2 border-gray-300 transition-all duration-300 ease-in-out hover:border-gray-500 hover:shadow-lg">
                    <Image
                      src={image ? URL.createObjectURL(image) : assets.upimg}
                      alt="Upload Thumbnail"
                      width={110}
                      height={100}
                      className="object-cover rounded-lg"
                    />
                  </div>
                </label>

                <input
                  type="file"
                  id="thumbnail"
                  className="hidden"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>

              <DialogActions>
                <button type='submit' className='bg-amber-300 w-xs h-12 mb-8'>Save</button>
              </DialogActions>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
};

export default Page;

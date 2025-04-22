'use client'
import { Dialog, DialogActions, DialogContent, Pagination, Stack, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Image from 'next/image';
import { toast } from 'react-toastify';
import commonGetApis, { deleteApi } from '@/commonapi/Commonapi';
import { assets } from '@/assests/assets';

interface Category {
    Category_Name:string;
    Image:string;
    No:number;
    Status:number;
}

interface Categoryid {
    category:string;
    id:number;
    image:string;
    status:number
}
const Category = () => {
  const [input, setInput] = useState("");
  const [adds, setAdds] = useState<Category []>([]);
  const [addCategory, setAddCategory] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [categoryId, setCategoryId] = useState<Categoryid []>([])
  const [toggleCategory, setToggleCategory] = useState(false)
  const [page, setPage] = useState(1);
  const [totalCount , setTotalCount] = useState(0);
  const [inputss, setInputss] = useState({
    category: "",
    status: "1"
  })
  const [inputs, setInputs] = useState({
    category: "",
    status: "1"
  });

  const fetchCategories = async () => {
    try {
      const res = await commonGetApis(`getcategories?pageNumber=${page}&pageLimit=10`);
      setTotalCount(res?.data?.Total_Count)
      const result = res?.data?.result || [];
      setAdds(result);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const count = Math.ceil(Number(totalCount)/1)

  const handleSubmit = async (e:any) => {
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
        setImage(null);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleIdDataSubmit = async (e:any) => {
    e.preventDefault();
    const refreshtoken = localStorage.getItem("usertoken");
    const token = localStorage.getItem("token");

    const formdata = new FormData();
    formdata.append("category_name", inputss.category);
    formdata.append("status", inputss.status);
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
      if (res.data.status === 200) {
        toast.success("Added")
      }
      else {
        toast.error("Something went Wrong")
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went Wrong")
    }
  }

  const handleDelete = async (id:any) => {
    try {
      await deleteApi(`deletecategory?id=${id}`);
      setAdds(prev => prev.filter(item => item.No !== id));
      toast.success("Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  }
  const handleStatusChange = async (id:number, currentStatus:any) => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("usertoken");

    if (!token || !refreshToken) {
      toast.error("Missing authentication tokens.");
      return;
    }

    const newStatus = currentStatus === 1 ? 0 : 1;

    const formData = new URLSearchParams();
    formData.append("id", String(id));
    formData.append("status", String(newStatus));

    try {
      const res = await axios.post(
        "http://192.168.2.181:3000/admin/status_change1",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorizations": token,
            "language": "en",
            "refresh_token": refreshToken,
          },
        }
      );

      if (res.data) {
        toast.success("Status updated successfully");
        fetchCategories();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("Status change error:", error);
      toast.error("Something went wrong");
    }
  };

  const handleCategoryPost = (e:any) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleCategoryPosts = (e:any) => {
    const { name, value } = e.target;
    setInputss({ ...inputss, [name]: value });
  }
  const handleEditButton = async (No:number) => {
    try {
      const res = await commonGetApis(`getcategory?id=${No}`)
      setCategoryId(res.data.DATA)
      if (categoryId) {
        setToggleCategory(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  console.log("addcate",categoryId)
  useEffect(() => {
    fetchCategories();
  }, [page]);

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
                      <td
                        onClick={() => handleStatusChange(No, Status)} 
                        className='px-2 py-2 cursor-pointer'
                      >
                        {Status === 1 ? (
                          <Image src={assets.scrollon} alt='Active' width={32} height={32} />
                        ) : (
                          <Image src={assets.scrolloff} alt='Inactive' width={32} height={32} />
                        )}
                      </td>
                      <td>
                        <button onClick={() => handleEditButton(No)} className="ml-2 text-gray-600 rounded"><MdEdit size={18} /></button>
                        <button onClick={() => handleDelete(No)} className="ml-5 text-gray-600 rounded"><RiDeleteBin5Fill size={18} /></button>
                      </td>
                    </tr>
                  );
                })
            }
          </tbody>
        </table>
      </div>

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
                  <div className="w-[355px] h-[125px] flex items-center justify-center bg-gray-100 rounded-lg border-2 border-gray-300 transition-all duration-300 ease-in-out hover:border-gray-500 hover:shadow-lg">
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
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                  />
              </div>

              <DialogActions>
                <button type='submit' className='bg-amber-300 w-xs h-12 mb-8 mr-2.5'>Save</button>
              </DialogActions>
            </form>
          </DialogContent>
        </div>
      </Dialog>

      <Dialog open={toggleCategory} onClose={() => setToggleCategory(false)}>
        <div className='flex flex-col justify-center bg-white shadow-md'>
          <DialogContent>
            { categoryId && (
            <form onSubmit={handleIdDataSubmit} className='bg-white z-[1] flex flex-col px-3'>
              <div className='flex flex-row'>
                <h1 className='items-center text-2xl ml-20'>Add Category</h1>
                <div className='flex justify-end ml-25'>
                  <button
                    type="button"
                    className='text-gray-500 h-9 mb-9 text-2xl flex justify-end right-0 left-20 hover:text-red-700'
                    onClick={() => setToggleCategory(false)}
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
                  placeholder={categoryId.category}
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
                  <div className="w-[355px] h-[125px] flex items-center justify-center bg-gray-100 rounded-lg border-2 border-gray-300 transition-all duration-300 ease-in-out hover:border-gray-500 hover:shadow-lg">
                    <img
                      src={image ? URL.createObjectURL(image) : categoryId.image}
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
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImage(e.target.files[0]);
                    }
                  }}
                />
              </div>

              <DialogActions>
                <button type='submit' className='bg-amber-300 w-xs h-12 mb-8 mr-2.5'>Save</button>
              </DialogActions>
            </form>
            )}
          </DialogContent>
        </div>
      </Dialog>

      <div className="flex justify-end bottom-0 mt-5 h-[20px] items-center">
                <Stack spacing={2}>
                  <Pagination variant='outlined' shape='rounded' page={page}
                  onChange={(e, page) => setPage(page)}
                  count ={count}/>
                </Stack>
              </div>

    </div>
  );
};

export default Category;

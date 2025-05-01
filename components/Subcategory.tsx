'use client'
import React, { useEffect, useState } from 'react';
import { TextField, Dialog, DialogActions, DialogContent, Stack, Pagination } from '@mui/material';
import axios from 'axios';
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Image from 'next/image';

import { toast } from 'react-toastify';
import commonGetApis from '@/commonapi/Commonapi';
import { assets } from '@/assests/assets';
import Link from 'next/link';

interface Category {
  No: number;
  Image: string;
  SubCategory_Name: string;
  Category_Name: string;
  Status: number;
  Category_name: string;
}

const Subcategory = () => {
  const [input, setInput] = useState<string>('');
  const [adds, setAdds] = useState<Category[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [brand, setBrand] = useState<Category[]>([]);
  const [editSubcategory, setEditSubcategory] = useState<Category | null>(null);
  const [editSub, setEditSub] = useState(false);
  const [status, setStatus] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0)
  const [inputs, setInputs] = useState({
    subcategory: "",
    category: "",
    status: "1"
  });

  const fetchCategories = async () => {
    const refreshtoken = localStorage.getItem("usertoken");
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(`http://192.168.2.181:3000/admin/get_subcategories?pageNumber=${page}&pageLimit=10`, {
        headers: {
          Authorizations: token,
          language: "en",
          refresh_token: refreshtoken,
        },
      });
      setTotalCount(res?.data?.data?.Total_Count);
      setAdds(res?.data?.data?.result || []);
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
      setBrand(res.data.data.result || []);
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
    formdata.append("subcategory_name", inputs.subcategory);
    formdata.append("fk_category_id", inputs.category);
    formdata.append('status', inputs.status);
    if (image) {
      formdata.append("image", image);
    }

    try {
      const res = await axios.post("http://192.168.2.181:3000/admin/add_subCategory", formdata, {
        headers: {
          Authorizations: token,
          language: 'en',
          refresh_token: refreshtoken,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.data.message == "SUCCESS") {
        toast.success("Successfully Added");
      } else {
        toast.error("Failed To Add");
      }

      setOpenModal(false);
      fetchCategories();
    } catch (error) {
      console.error("Error submitting subcategory:", error);
    }
  };

  const handleSubCategoryUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const refreshtoken = localStorage.getItem("usertoken");
    const token = localStorage.getItem("token");
  
    const formdata = new FormData();
    formdata.append("subcategory_name", inputs.subcategory);
    formdata.append("fk_category_id", inputs.category);
    formdata.append("status", inputs.status);
    formdata.append("id", String(editSubcategory?.No)); // this is key!
  
    if (image) {
      formdata.append("image", image);
    }
  
    try {
      const res = await axios.post("http://192.168.2.181:3000/admin/add_subCategory", formdata, {
        headers: {
          Authorizations: token,
          language: "en",
          refresh_token: refreshtoken,
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (res.data.message === "SUCCESS") {
        toast.success("Successfully updated subcategory");
        setEditSub(false);
        fetchCategories();
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Error updating subcategory");
    }
  };
  
  // const handleSubCategoryChanges = (e:any) => {
  //   const {name,value} = e.target;
  //   setInputss({...inputss,[name]:value})
  // }

  const handleStatusChange = async (id: number, currentStatus: number) => {
    const refreshtoken = localStorage.getItem("usertoken");
    const token = localStorage.getItem("token");

    const newStatus = currentStatus === 1 ? 0 : 1;

    const formData = new URLSearchParams();
    formData.append("id", String(id));
    formData.append("status", String(newStatus));

    try {
      const res = await axios.post(
        "http://192.168.2.181:3000/admin/status_change2",
        formData,
        {
          headers: {
            Authorizations: token,
            language: "en",
            refresh_token: refreshtoken,
          },
        }
      );

      console.log("Status Change Response:", res.data);

      if (res.data) {
        toast.success("Status updated successfully");
        fetchCategories();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error: any) {
      console.error("Error updating status:", error.response?.data || error.message);
      toast.error("Something went wrong");
    }
  };



  const handleEditButton = async (No: any) => {
    try {
      const res = await commonGetApis(`get_subcategory?id=${No}`);
      setEditSubcategory(res.data.DATA);
      setInputs({
        subcategory: res.data.DATA.SubCategory_Name,
        category: String(res.data.DATA.fk_category_id),
        status: String(res.data.DATA.Status),
      });
            if (res.data) {
        setEditSub(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log("ids", editSubcategory)

  const toggleStatus = () => {
    setStatus(!status)
  }

  useEffect(() => {
    fetchGetCategory();
    fetchCategories();
  }, [page]);

   useEffect(() => {
          document.title = "Admin Subcategory";
    }, []);

  console.log("adds123", adds)
  const count = Math.ceil(Number(totalCount) / 10)
  console.log("count123", count)
  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col px-2">
          <h1 className="text-3xl font-bold">Sub Category</h1>
          <p className='text-gray-500 mt-2'><Link href={`/admin/dashboard`}>Dashboard</Link> <span className='ml-2.5'>{`>`}</span><span className='text-black ml-2.5'>Sub Category</span> </p>
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

      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mt-5">
        <thead>
          <tr>
            <th className="px-2 py-2 text-left text-md font-semibold text-black">No.</th>
            <th className="py-2 px-2 text-left text-md font-semibold text-black">Image</th>
            <th className="py-2 px-2 text-left text-md font-semibold text-black">Name</th>
            <th className="py-2 px-2 text-left text-md font-semibold text-black">Category</th>
            <th className="py-2 px-2 text-left text-md font-semibold text-black">Status</th>
            <th className="py-2 px-2 text-left text-md font-semibold text-black">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            adds
              .filter(item => input === "" || item.SubCategory_Name.toLowerCase().includes(input.toLowerCase()))
              .map(({ No, Image: ImgUrl, Category_Name, Status, SubCategory_Name }) => (
                <tr key={No}>
                  <td className="px-2 py-2">{No}</td>
                  <td className='px-2 py-2'><img src={ImgUrl} alt={Category_Name} className="w-14 h-13 object-cover" /></td>
                  <td>{SubCategory_Name}</td>
                  <td>{Category_Name}</td>
                  <td onClick={() => handleStatusChange(No, Status)} className='px-2 py-2'>
                    <div>
                      {Status === 1 ? (
                        <Image src={assets.scrollon} alt='In-Stock' />
                      ) : (
                        <Image src={assets.scrolloff} alt='Out-of-Stock' />
                      )}
                    </div>
                  </td>
                  <td>
                    <button onClick={() => handleEditButton(No)}><MdEdit size={18} /></button>
                    <button className="ml-5" onClick={() => handleSubCategoryDelete(No)}><RiDeleteBin5Fill size={18} /></button>
                  </td>
                </tr>
              ))
          }
        </tbody>
      </table>
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogContent>
          <form onSubmit={handleSubCategorySubmit} className="flex flex-col items-center justify-center px-5">
            <h1 className="text-2xl font-bold mb-3">Add Sub Category</h1>
            <div className='flex flex-col justify-start items-start mt-6 w-full'>
              <p className='mb-2 text-gray-400'>Sub Category</p>
              <input type='text' name='subcategory' value={inputs.subcategory} placeholder='Sub Category' onChange={(e) => handleSubCategoryChange(e)} className='text-gray-400 border border-gray-200 py-2 w-full px-2' />
            </div>
            <div className="flex flex-col mt-5 justify-start items-start w-full">
              <label className="text-gray-400">Category</label>
              <select
                name="category"
                value={inputs.category}
                onChange={(e) => handleSubCategoryChange(e)}
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

            <div className="flex flex-row justify-between space-x-55 items-center mt-5">
              <label className="text-gray-400">Status</label>
              <div
                className="cursor-pointer w-fit"
                onClick={() =>
                  setInputs((prev) => ({
                    ...prev,
                    status: prev.status === "1" ? "0" : "1",
                  }))
                }
              >
                <Image
                  src={inputs.status === "1" ? assets.scrollon : assets.scrolloff}
                  alt="Status"
                  width={42}
                  height={52}
                />
              </div>
            </div>

            <DialogActions>
              <button type="submit" className="bg-amber-300 px-4 py-2">Submit</button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={editSub} onClose={() => setEditSub(false)}>
        <DialogContent>
          {editSubcategory && (
            <form onSubmit={handleSubCategoryUpdate}>
            <div className="flex flex-col items-center">
                <h1 className="text-2xl font-bold mb-3">Subcategory Details</h1>
                <div className="flex flex-row mt-7">
                  <label htmlFor="thumbnail" className="cursor-pointer">
                    <div className="h-[125px] w-[325px] flex items-center justify-center bg-gray-100 rounded-lg border-2 border-gray-300 hover:border-gray-500 hover:shadow-lg">
                      <img
                        src={image ? URL.createObjectURL(image) : editSubcategory.Image}
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
                <div className='flex flex-col justify-start items-start mt-6 w-full'>
                  <p className='mb-2 text-gray-400'>Sub Category</p>
                  <input type='text' name='subcategory' value={inputs.subcategory} placeholder={editSubcategory.SubCategory_Name} onChange={(e) => handleSubCategoryChange(e)} className='text-gray-400 border border-gray-200 py-2 w-full px-2' />
                </div>
                <div className="flex flex-col mt-5 justify-start items-start w-full">
                  <label className="text-gray-400">Category</label>
                  <select
                    name="category"
                    value={inputs.category}
                    onChange={(e) => handleSubCategoryChange(e)}
                    className="border border-gray-200 mt-1 py-2.5 px-2.5 w-full"
                  >
                    <option value="">{editSubcategory.Category_name}</option>
                    {brand.map((curval) => (
                      <option key={curval.No} value={curval.No}>
                        {curval.Category_Name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-row gap-50 justify-between items-stretch mt-9">
                  <label className="text-gray-400">Status</label>
                  <button onClick={toggleStatus}>{status ? <span><Image src={assets.scrollon} alt='Active' /></span> : <span><Image src={assets.scrolloff} alt='Inactive' /></span>}</button>
                </div>
                <DialogActions>
                  <div className='flex justify-center items-center w-full'>
                    <button type='submit' className='bg-amber-400 px-15 py-2 mt-2 font-bold'>Save</button>
                  </div>
                </DialogActions>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <div className="flex justify-end bottom-0 mt-5 h-[20px] items-center">
        <Stack spacing={2}>
          <Pagination variant='outlined' shape='rounded' page={page}
            onChange={(e, page) => setPage(page)}
            count={count} />
        </Stack>
      </div>

    </div>
  );
};

export default Subcategory;

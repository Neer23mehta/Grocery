'use client';
import { Dialog, DialogActions, DialogContent, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent, Stack, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";
import { SlArrowRight } from "react-icons/sl";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { assets } from '../../../assests/assets';

interface Category {
  No: number;
  Image: string;
  Category_Name: string;
  Status: number;
  Brand_Name: string;
  SubCategory_Name: string;
}

const Page = () => {
  const [input, setInput] = useState<string>('');
  const [adds, setAdds] = useState<Category[]>([]);
  const [addSub, setAddSub] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [inputs, setInputs] = useState({
    brand: "",
    category: "",
    subcategory: "",
    No: null,
  });
  const [image, setImage] = useState<File | null>(null);
  const route = useRouter();

  const fetchCategories = async () => {
    const refreshtoken = localStorage.getItem("usertoken");
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get("http://192.168.2.181:3000/admin/get_brands?pageNumber=1&pageLimit=10", {
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

  const handleDelete = async (No: number) => {
    const refreshtoken = localStorage.getItem("usertoken");
    const token = localStorage.getItem("token");
    try {
      const res = await axios.delete(`http://192.168.2.181:3000/admin/delete_brand?id=${No}`, {
        headers: {
          Authorizations: token,
          language: "en",
          refresh_token: refreshtoken,
        },
      });
      setAdds(prev => prev.filter(items => items.No !== No));
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (No: number) => {
    route.push(`/admin/brands/${No}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const refreshtoken = localStorage.getItem("usertoken");
    const token = localStorage.getItem("token");
    const formdata = new FormData();
    formdata.append("Brand", inputs.brand);
    formdata.append("Category_Name", inputs.category);
    formdata.append("SubCategory_Name", inputs.subcategory);
    formdata.append("Image", image as Blob);
    if (inputs.No) formdata.append("No", inputs.No);

    try {
      const res = await axios.post("http://192.168.2.181:3000/admin/add_brand", {
           formdata
          });

          console.log("respost",res)
      if (res.data.success) {
        toast.success(res.data.results);
        setAddSub(false);  
        fetchCategories();  
      } else {
        toast.error("Error while submitting.");
      }
    } catch (error) {
      console.error("Error submitting brand:", error);
      toast.error("Something went wrong.");
    }
  };

  const handleBrandPost = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const fetcgGetCategory = async () => {
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
      setCategory(res?.data?.data[0] || []);
      console.log("getcategory",res.data.data)
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubCategories = async () => {
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
      setSubCategory(res?.data?.data || []);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetcgGetCategory();
    fetchSubCategories();
  }, []);

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col px-2">
          <h1 className="text-3xl font-bold">Brands</h1>
          <p className="text-gray-500 mt-2">Dashboard<span className="text-black ml-5">Brand</span></p>
        </div>
        <div>
          <input
            id="outlined-basic"
            placeholder="Search Brands..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="ml-50 h-12 py-2 px-2 border-1 border-gray-400 bg-white sm:w-[80px] md:w-[120px] lg:w-[190px]"
          />
          <button className="px-2 py-2 bg-amber-300 ml-5 w-40 h-12 font-bold" onClick={() => setAddSub(true)}>Add Brand</button>
        </div>
      </div>

      <div>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mt-5">
          <thead>
            <tr>
              <th className="px-2 py-2 text-left text-md font-semibold text-black">No.</th>
              <th className="py-2 px-2 text-left text-md font-semibold text-black">Image</th>
              <th className="py-2 px-2 text-left text-md font-semibold text-black">Name</th>
              <th className="py-2 px-2 text-left text-md font-semibold text-black">Category</th>
              <th className="py-2 px-2 text-left text-md font-semibold text-black">Sub-Category</th>
              <th className="py-2 px-2 text-left text-md font-semibold text-black">Status</th>
              <th className="py-2 px-2 text-left text-md font-semibold text-black">Action</th>
            </tr>
          </thead>
          <tbody className="space-y-3">
            {adds
              .filter((item) => input === "" || item.Brand_Name.toLowerCase().includes(input.toLowerCase()))
              .map((curval) => {
                const { No, Image, Category_Name, Status, Brand_Name, SubCategory_Name } = curval;
                return (
                  <tr key={No}>
                    <td className="px-2 py-2">{No}</td>
                    <td><img src={Image} alt={Category_Name} className="w-14 h-13 object-cover" /></td>
                    <td className="px-2 py-2">{Brand_Name}</td>
                    <td className="px-2 py-2">{Category_Name}</td>
                    <td className="px-2 py-2">{SubCategory_Name}</td>
                    <td>{Status === 1 ? "Active" : "Inactive"}</td>
                    <td>
                      <button className="ml-2 text-gray-600 rounded" onClick={() => handleEdit(No)}>
                        <MdEdit size={18} />
                      </button>
                      <button className="ml-5 text-gray-600 rounded" onClick={() => handleDelete(No)}>
                        <RiDeleteBin5Fill size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        <div className="flex justify-end mt-4">
          <Stack spacing={0}>
            <Pagination count={10} variant="outlined" shape="rounded" />
          </Stack>
        </div>
      </div>

      <Dialog open={addSub} onClose={() => setAddSub(false)}>
        <DialogContent>
          <form onSubmit={handleSubmit} className="bg-white z-[1] flex flex-col px-5">
            <h1 className="text-2xl ml-20 mt-3">Add Brand</h1>
            <button className="text-gray-500 h-9 mt-1 text-2xl flex justify-end" onClick={() => setAddSub(false)}>X</button>
            
            <div className="flex flex-col mt-10">
              <label className="py-2 text-gray-400">Brand Name</label>
              <input type="text" name="brand" onChange={handleBrandPost} value={inputs.brand} placeholder="Brand Name" required className="border border-gray-200 px-2.5 py-2 w-full" />
            </div>

            <div className="flex flex-col mt-5">
              <label className="text-gray-400">Category</label>
              <select name="category" value={inputs.category} onChange={()=>handleBrandPost} className="border border-gray-200 w-full py-2 focus:outline-none px-2.5">
                <option>Select</option>
                {category?.map((curval) => (
                  <option key={curval.No} value={curval.No}>{curval.Category_Name}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col mt-5">
              <label className="text-gray-400">Sub-Category</label>
              <select name="subcategory" value={inputs.subcategory} onChange={()=>handleBrandPost} className="border border-gray-200 w-full py-2 focus:outline-none px-2.5">
                <option>Select</option>
                {subCategory.map((curval) => (
                  <option key={curval.No} value={curval.No}>{curval.SubCategory_Name}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-row mt-7">
              <label htmlFor="thumbnail" className="cursor-pointer">
                <div className="w-[325px] h-[125px] flex items-center justify-center bg-gray-100 rounded-lg border-2 border-gray-300 transition-all duration-300 ease-in-out hover:border-gray-500 hover:shadow-lg">
                  <Image src={image ? URL.createObjectURL(image) : assets.upimg} alt="Upload Thumbnail" width={110} height={100} className="object-cover rounded-lg" />
                </div>
              </label>
              <input type="file" id="thumbnail" className="hidden" onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} />
            </div>

            <DialogActions>
              <button type="submit" className="bg-amber-300 w-xs h-12 mb-8">Save</button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;

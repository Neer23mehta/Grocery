'use client'
import { InputLabel, MenuItem, Pagination, Select, SelectChangeEvent, Stack, TextField } from '@mui/material';
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
  Brand_Name : string;
  SubCategory_Name : string;
}

const Page = () => {
  const [input, setInput] = useState<string>('');
  const [adds, setAdds] = useState<Category[]>([]);
  const [addSub, setAddSub] = useState(false)
  const [scroll ,setScroll] = useState(false)
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
      console.log("res",res.data)
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleDelete = async (No:number) => {
    const refreshtoken = localStorage.getItem("usertoken");
    const token = localStorage.getItem("token");
      try {
        const res = axios.delete(`http://192.168.2.181:3000/admin/delete_brand?id=${No}`,{
          method:"DELETE",
          headers:{
            Authorizations:token,
            language:"en",
            refresh_token: refreshtoken,
          },
        })
        setAdds(prev => prev.filter(items => items.No !== No))
      } catch (error) {
        console.log(error)
      }
  }

  const handleEdit = (No:number) => {
    route.push(`/admin/brands/${No}`)
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const refreshtoken = localStorage.getItem("usertoken");
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://192.168.2.181:3000/admin/add_brand",{
        method:"POST",
        headers:{
          Authorizations: token,
          language: "en",
          refresh_token: refreshtoken,
        },
      })
      console.log("res",res)
      if (res.data.success) {
        toast.success(res.data.results);
    }
    else{
        toast.error("error");
    }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const toggleButton = () => {
    setAddSub(!addSub)
  }

  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const handleScroll = () => {
    setScroll(!scroll);
  }

  const handleRemove = () => {
    setAddSub(!addSub)
  }
  return (
    <div className="">
    <div className={`${addSub ? "opacity-35" : "opacity-100"}`}>
    <div className={`flex flex-row justify-between items-center ${addSub ? "opacity-25" : "opacity-100" }`}>
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
          <button className="px-2 py-2 bg-amber-300 ml-5 w-40 h-12 font-bold" onClick={toggleButton}>Add Brand</button>
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
            {
              adds
                .filter(item => input === "" || item.Brand_Name.toLowerCase().includes(input.toLowerCase()))
                .map((curval) => {
                  const { No, Image, Category_Name, Status,Brand_Name,SubCategory_Name } = curval;
                  return (
                    <tr key={No} className="mt-5 space-y-3">
                      <td className="px-2 py-2 ml-4 left-4 mt-5">{No}</td>
                      <td className="mt-5">
                        <img src={Image} alt={Category_Name} className="w-14 h-13 object-cover" />
                      </td>
                      <td className="px-2 py-2 ml-4 left-4 mt-5">{Brand_Name}</td>
                      <td className="mt-5 ml-4 left-4 px-2 py-2">{Category_Name}</td>
                      <td className="mt-5 px-2 py-2">{SubCategory_Name}</td>
                      <td>
                        {/* {Status === 1 ? (
                          <Image src={assets.scrollon} alt="Status"/>
                        ) : (
                          <Image src={assets.scrolloff} alt="Status"/>
                        )} */}
                      </td>
                      <td>
                        <button className="ml-2 text-gray-600 rounded" onClick={()=>handleEdit(No)}>
                          <MdEdit size={18} />
                        </button>
                        <button className="ml-5 text-gray-600 rounded" onClick={()=>handleDelete(No)}>
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
          {/* <button className="px-4 py-2 bg-gray-300 rounded-md mr-2">Previous</button> */}
          {/* <button className="px-4 py-2 bg-gray-300 rounded-md">Next</button> */}

            {/* <Stack spacing={0}>
              <Pagination count={10} variant='outlined'/>
            </Stack> */}
              {/* <button className='px-2 py-1 bg-gray-50 '>
                    {
                        ["Previous","1","2","3","4","5","6","7","Next"].map((curval,index) => {
                            return (
                                <button key={index} className='px-2 py-1 bg-gray-50 border-0'>{curval}</button>
                            )
                        })
                    }
              </button> */}
        </div>
      </div>
      </div>
      {
        addSub ? (
          <div className='flex flex-col justify-center items-center mt-200'>
            <form onSubmit={handleSubmit} className='bg-white shadow-md z-[1] w-[465px] h-auto mb-350 absolute flex flex-col items-center'>
             <div className='flex flex-row'>
             <h1 className='items-center text-2xl ml-20 top-5 mt-3'>Add Brand</h1>
             <div className='flex justify-end ml-25'>
             <button className='text-gray-500 h-9 mt-1 text-2xl flex justify-end right-0 left-20' onClick={handleRemove}>X</button>
             </div>
             </div>
              <TextField id="outlined-basic" label="Brand Name" variant="outlined" className='mt-10 top-8 w-xs mb-10' />

              {/* <InputLabel id="demo-simple-select-helper-label">Category</InputLabel> */}
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={age}
                label="Select Category"
                onChange={handleChange}
                className='px-0 mt-20 w-xs text-black'
              >
                {/* <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem> */}
              </Select>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={age}
                label="Select Category"
                onChange={handleChange}
                className='px-0 mt-10 w-xs text-black'
              >
                {/* <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem> */}
              </Select>

              {/* <p className='text-xl text-gray-400'> Sub Category</p>
              <select name='subcategory' >
                  <option>Select</option>
                  {/* <option>Select</option> */}
              {/* </select>  */}
      <div className='flex flex-row mt-7'>
          <label htmlFor="thumbnail" className="flex items-center justify-center cursor-pointer mb-6">
                    <div className="w-[325px] h-[125px] flex items-center justify-center bg-gray-100 rounded-lg border-2 border-gray-300 transition-all duration-300 ease-in-out hover:border-gray-500 hover:shadow-lg">
                        <Image
                            src={assets.upimg}
                            alt="Upload Thumbnail"
                            // width={110}
                            // height={100}
                            className="object-cover rounded-lg"
                        />
                    </div>
                </label>

                <input
                    type="file"
                    id="thumbnail"
                    className="hidden"
                />
          </div>
          {/* <div className='flex flex-row justify-between items-center'>
            Status 
            <Image src={scroll ? assets.scrolloff : assets.scrollon} onClick={handleScroll}/>
          </div> */}
              <button type='submit' className='bg-amber-300 w-xs h-12 mb-8'>Save</button>
            </form>
          </div>
        ) : null
      }
    </div>
  );
};

export default Page;

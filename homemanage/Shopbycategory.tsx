'use client'
import React, { useEffect, useState } from 'react'
import { assets } from '@/assests/assets'
import Image from 'next/image'
import { Dialog, DialogActions, DialogContent } from '@mui/material'
import { toast } from 'react-toastify'
import commonGetApis, { deleteApi } from '@/commonapi/Commonapi'
import axios from 'axios'

interface Category {
  id: number;
  shop_by_category: {
    id: number;
    image: string;
    offer: string;
    category_name: string;
    category: any;
  }[];
}

interface Add {
  Category_Name: string
  No: number
}

const Shopbycategory = () => {
  const [category, setCategory] = useState<Category[]>([])
  const [newCategory, setNewCategory] = useState(false)
  const [image, setImage] = useState<File | null>(null)
  const [adds, setAdds] = useState<Add[]>([])
  const [input, setInput] = useState({
    category: "",
    offer: "",
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  }

  const handleRemoveCategory = async (id: number) => {
    try {
      const res = await deleteApi(`delete_home_management?id=${id}&fk_section_id=2`)
      if (res.data) {
        setCategory((prev) =>
          prev.map(item => ({
            ...item,
            shop_by_category: item.shop_by_category.filter(ad => ad.id !== id)
          }))
        )
        toast.success("Deleted Successfully")
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong")
    }
  }

  const handleToggleCategory = async () => {
    setNewCategory(!newCategory)
  }

  const fetchGetById = async (id: number) => {
    try {
      const res = await commonGetApis(`get_home_management_by_id?fk_section_id=4&id=${id}`)
      if (res.data) {
        // You can handle detailed view here if needed
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong")
    }
  }

  const fetchShopByCategory = async () => {
    try {
      const res = await commonGetApis("get_all_home_management?fk_section_id=2");
      setCategory(res?.data?.result || [])
    } catch (error) {
      console.log(error)
      toast.error("Something went Wrong")
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await commonGetApis('getcategories?pageNumber=1&pageLimit=10');
      const result = res?.data?.result || [];
      setAdds(result);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  const handleCategoryChange = (e: any) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const refreshtoken = localStorage.getItem('usertoken')
    const token = localStorage.getItem('token')

    const formdata = new FormData();
    formdata.append("fk_section_id", "2");
    formdata.append("fk_category_id", input.category);
    formdata.append("offer", input.offer);
    if (image) formdata.append("image", image)

    try {
      const res = await axios.post("http://192.168.2.181:3000/admin/add_home_management", formdata, {
        headers: {
          Authorizations: token!,
          language: 'en',
          refresh_token: refreshtoken!,
          'Content-Type': 'multipart/form-data',
        },
      })
      toast.success("Category added successfully");
      fetchShopByCategory();
      setNewCategory(false);
      setInput({ category: "", offer: "" });
      setImage(null);
    } catch (error) {
      console.log(error)
      toast.error("Something went Wrong")
    }
  }

  useEffect(() => {
    fetchShopByCategory();
    fetchCategories();
  }, [])

  return (
    <div className='w-full'>
      <div className='flex flex-col mt-5 px-4 bg-white shadow-lg w-full'>
        <div className='flex flex-row items-center'>
          <h1 className='mt-5 font-bold text-xl'>Shop by Category</h1>
          <Image src={assets.edit} alt='edit' className='mt-5 flex justify-end ml-4' width={17} height={25} />
        </div>

        {/* Horizontal Scroll Container */}
        <div className='w-full overflow-x-auto mt-5'>
          <div className='flex gap-5 min-w-max'>
            {category?.map((curval, index) => (
              <div key={index} className="flex gap-5">
                {curval.shop_by_category.map((ad, idx) => (
                  <div key={ad.id} className="relative">
                    <button
                      onClick={() => handleRemoveCategory(ad.id)}
                      className="absolute top-5 right-1 z-10"
                    >
                      <Image
                        src={assets.cancel}
                        alt="remove"
                        width={26}
                        height={26}
                        className="cursor-pointer"
                      />
                    </button>
                    <img
                      src={ad.image}
                      alt={`banner-${idx}`}
                      className="h-[131px] w-[125px] object-cover mt-5 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200"
                      onClick={() => fetchGetById(ad.id)}
                    />
                    <p className='text-sm mt-2'>{ad.category.category_name}</p>
                    <p className='text-sm text-gray-500'>{`Min ${ad.offer}% Off`}</p>
                  </div>
                ))}
              </div>
            ))}
            {/* Add New Card */}
            <div className='flex justify-center items-center h-[131px] mt-3 border rounded-md border-gray-300 mb-[38px] w-[125px] cursor-pointer'>
              <Image src={assets.add} alt='Image' className='px-2 py-8' onClick={handleToggleCategory} />
            </div>
          </div>
        </div>
      </div>

      {/* Add Category Dialog */}
      <Dialog open={newCategory} onClose={() => setNewCategory(false)}>
        <div className='flex flex-col justify-center items-center'>
          <DialogContent>
            <form onSubmit={handleSubmit} className='flex flex-col bg-white py-6 px-10 justify-center items-center'>
              <h1 className='text-2xl font-bold'>Shop By Category</h1>

              <div className='flex flex-col justify-start mt-5 space-y-5'>
                <p className='font-bold'>Add Image</p>
                <div className='w-[300px] h-[150px] px-10 py-2 border border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-50 transition'>
                  <label htmlFor="thumbnail" className="cursor-pointer text-center">
                    <div className="flex items-center justify-center rounded-lg">
                      <Image
                        src={image ? URL.createObjectURL(image) : assets.add}
                        alt="Upload Thumbnail"
                        width={image ? 200 : 50}
                        height={image ? 100 : 50}
                        className="object-cover rounded-lg"
                      />
                    </div>
                  </label>
                  <input
                    type="file"
                    id="thumbnail"
                    className="hidden"
                    onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                  />
                </div>

                <div className='flex flex-col'>
                  <label className='text-gray-400'>Select Category</label>
                  <select
                    value={input.category}
                    name='category'
                    className='font-bold px-3 py-2 mt-2 border-1 border-gray-200 text-black'
                    onChange={handleCategoryChange}
                  >
                    <option value="">Select</option>
                    {adds.map((curVal, index) => (
                      <option key={index} value={curVal.No}>{curVal.Category_Name}</option>
                    ))}
                  </select>
                </div>

                <div className='flex flex-col'>
                  <label className='text-gray-400'>Offer</label>
                  <input
                    type='text'
                    name='offer'
                    value={input.offer}
                    onChange={handleCategoryChange}
                    placeholder='e.g. 10% Off'
                    className='font-bold border-1 border-gray-200 mt-2 py-2 px-3 text-black'
                  />
                </div>
              </div>

              <DialogActions>
                <div className='flex justify-center items-center mt-5'>
                  <button type='submit' className='px-6 py-2 bg-amber-400 font-bold'>Submit</button>
                </div>
              </DialogActions>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  )
}

export default Shopbycategory

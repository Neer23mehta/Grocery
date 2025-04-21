'use client'
import React, { useEffect, useState } from 'react'
import { assets } from '@/assests/assets'
import Image from 'next/image'
import { Dialog, DialogActions, DialogContent } from '@mui/material'
import { toast } from 'react-toastify'
import commonGetApis, { deleteApi } from '@/commonapi/Commonapi'
import axios from 'axios'

const Shopbycategory = () => {
  const [category, setCategory] = useState([])
  const [newCategory, setNewCategory] = useState(false)
  const [image, setImage] = useState<File | null>(null)
  const [input, setInput] = useState({
    shopbycategory: "",
  })

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  }

  // Delete Api
  const handleRemoveCategory = async (id: number) => {
    try {
      const res = await deleteApi(`delete_slider_with_shop_by_category?id=${id}`)

      if (res.data) {
        // setCategory((prev) => prev.filter((item) => item.id !== id))
        // toast.success("Deleted Successfully")
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong")
    }
  }
  const handleToggleCategory = async () => {
    setNewCategory(!newCategory)
  }

  // Get by Id Api have to attack it on the Image
  const fetchGetById = async (id: number) => {
    try {
      const res = await commonGetApis(`get_slider_with_shop_by_category_by_id?id=${id}`)

      // if(res.data){

      // }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong")
    }
  }

  const fetchShopByCategory = async () => {
    try {
      const res = await commonGetApis("get_slider_with_shop_by_category");
      setCategory(res?.data?.result)
    } catch (error) {
      console.log(error)
      toast.error("Something went Wrong")
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const refreshtoken = localStorage.getItem('usertoken')
    const token = localStorage.getItem('token')

    const formdata = new FormData();
    formdata.append("fk_section_id", "2");
    formdata.append("fk_category_id", "");
    formdata.append("offer", "");
    if (image)
      formdata.append("image", image)

    try {
      const res = axios.post("http://192.168.2.181:3000/admin/add_slider_with_shop_by_category", formdata, {
        headers: {
          Authorizations: token,
          language: 'en',
          refresh_token: refreshtoken,
          'Content-Type': 'multipart/form-data',
        },
      })
    } catch (error) {
      console.log(error)
      toast.error("Something went Wrong")
    }
  }

  useEffect(() => {
    fetchShopByCategory();
  }, [])
  console.log("cate123", category)
  return (
    <div className='w-full'>
      <div className='flex flex-col mt-5 px-4 bg-white shadow:md w-full '>
        <div className='flex flex-row items-center'>
          <h1 className='mt-5 font-bold text-xl'>Shop by Category</h1>
          <Image src={assets.edit} alt='edit' className='mt-5 flex justify-end ml-4' width={17} height={25} />
        </div>
        <div className='flex flex-row justify-around items-center mb-5 mt-3 space-x-2.5 w-full overflow-x-auto'>
          <div>
            {

            }
          </div>
          <div className='flex justify-center items-center h-[131px] border border-gray-300 mb-[38px] w-[125px]'>
            <Image src={assets.add} alt='Image' className='px-2 py-8' onClick={handleToggleCategory} />
          </div>
        </div>
      </div>
      <Dialog open={newCategory} onClose={() => setNewCategory(false)}>
        <div className='flex flex-col justify-center items-center'>
          <DialogContent>
            <form onSubmit={handleSubmit} className='flex flex-col bg-white py-6 px-10 justify-center items-center' >
              <h1 className='text-2xl font-bold'>Shop By Category</h1>
              <div className='flex flex-col justify-start mt-5 space-y-5'>
                <p className='mt-3 font-bold'> Add Image</p>
                <div className='w-[300px] h-[150px] px-10 py-2 border border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-50 transition'>
                  <label htmlFor="thumbnail" className="cursor-pointer text-center">
                    <div className="flex items-center justify-center rounded-lg">
                      <Image
                        src={image ? URL.createObjectURL(image) : assets.add}
                        alt="Upload Thumbnail"
                        width={image ? 300 : 50}
                        height={image ? 150 : 50}
                        className="object-cover rounded-lg"
                      />
                    </div>
                  </label>
                  <input
                    type="file"
                    id="thumbnail"
                    className="hidden"
                    onChange={(e) =>
                      setImage(e.target.files ? e.target.files[0] : null)
                    }
                  />
                </div>
                <div className='flex flex-col space-x-5 justify-start '>
                  <label className='text-gray-400 mt-5'>Title Name</label>
                  <input type='text' name='shopbycategory' required value={input.shopbycategory} placeholder='for ex Shop By Category' className='font-bold border-1 border-gray-200 mt-2 py-2 px-3 text-black' onChange={handleChange} />
                </div>
                <div className='flex flex-col space-x-5 justify-start '>
                  <label className='text-gray-400'>Select Category</label>
                  <select className='font-bold px-3 py-2 mt-2 border-1 border-gray-200 text-black'>Select Category</select>
                  {

                  }
                </div>
                <div className='flex flex-col space-x-5 justify-start '>

                  <label className='text-gray-400'>Offer</label>
                  <input type='text' name='offer' placeholder='for ex 10% Off' className='font-bold border-1 border-gray-200 mt-2 py-2 px-3 text-black' />
                </div>
              </div>
              <DialogActions>
                <div className='flex justify-center items-center mt-5'>
                  <button className='px-25 py-2 bg-amber-400 font-bold'>Submit</button>
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
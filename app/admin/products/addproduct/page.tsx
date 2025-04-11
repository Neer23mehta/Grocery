'use client'
import React from 'react'
import { assets } from '@/assests/assets'
import { FormControl, InputLabel, Select, TextField } from '@mui/material'
import { useFormik } from 'formik'
import Image from 'next/image'
import * as Yup from 'yup';

const Page = () => {

  const initialValues = {
    name:"",
    category:"",
    subcategory:"",
    brand:"",
    variation:"",
    price:"",
    discount:"",
    discountprice:"",
    title:"",
    description:""
  }

  const handleAllSchema = Yup.object({
    name:Yup.string().min(1).max(25).required("Name Must Required"),
    category: Yup.string().required("Category Must Required"),
    
  })
  // const {values,touched,handleBlur,handleChange,handleReset,handleSubmit} = useFormik({
  //   initialValues:initialValues,

  // })

  const handleProductAdd = () => {

  }

  const handleOtherInfoAdd = () => {

  }

  const handleProductsCancel = () => {

  }
  return (
    <div className='bg-white shadow-md h-auto flex flex-col'>
      <div className='mt-7 ml-5 w-full flex flex-row'>
        <h1 className='font-bold h-[28px] text-xl'>Add Product</h1>
      </div>
      <div className='flex flex-row space-x-9'>
        <div className='flex flex-col ml-5 mt-3'>
          <p className='text-gray-400 mb-2'>Item Name</p>
          <TextField id="outlined-basic" label="Name" variant="outlined" className='mt-3' />
        </div>
        <div className='flex flex-col ml-5 mt-3'>
          <p className='text-gray-400 mb-2'>Category</p>
         <select className='min-w-full py-4 w-[235px] border-1 border-gray-300 rounded-md text-black px-2 focus:outline-none' name='select'>Select
          <option>Select</option>
         </select>
        </div>
        <div className='flex flex-col ml-5 mt-3'>
          <p className='text-gray-400 mb-2'>Sub Category</p>
          <select className='min-w-full py-4 w-[235px] border-1 border-gray-300 rounded-md text-black px-2 focus:scale-none focus:outline-none' name='select'>Select
          <option className='bg-white'>Select</option>
         </select>
        </div>
        <div className='flex flex-col ml-5 mt-3'>
          <p className='text-gray-400 mb-2'>Brand</p>
          <select className='min-w-full py-4 w-[235px] border-1 border-gray-300 rounded-md text-black px-2 focus:outline-none' name='select'>Select
          <option>Select</option>
         </select>
        </div>
      </div>
      <div className='mt-10 ml-5 justify-between items-center flex flex-row'>
        <h1 className='font-bold h-[28px] text-xl'>Product Details</h1>
        <button onClick={handleProductAdd} className='text-3xl mr-20 rounded-full h-5 shadow-md'>+</button>
      </div>
      <div className='flex flex-row space-x-9'>
        <div className='flex flex-col ml-5 mt-3'>
          <p className='text-gray-400 mb-2'>Variation</p>
          <TextField id="outlined-basic" label="Product qnty." variant="outlined" className='mt-3' />
        </div>
        <div className='flex flex-col ml-5 mt-3'>
          <p className='text-gray-400 mb-2'>Product Price</p>
          <TextField id="outlined-basic" label="Price" variant="outlined" className='mt-3' />
        </div>
        <div className='flex flex-col ml-5 mt-3'>
          <p className='text-gray-400 mb-2'>discount (%)</p>
          <TextField id="outlined-basic" label="Discount" variant="outlined" className='mt-3' />
        </div>
        <div className='flex flex-col ml-5 mt-3'>
          <p className='text-gray-400 mb-2'>Discount Price</p>
          <TextField id="outlined-basic" label="Price" variant="outlined" className='mt-3' />
          </div>
          </div>
          <div className='mt-10 ml-5 flex flex-row justify-between items-center'>
        <h1 className='font-bold h-[28px] text-xl'>Other Info</h1>
        <button onClick={handleOtherInfoAdd} className='text-3xl mr-20 rounded-full h-5 shadow-md'>+</button>
      </div>
      <div className='flex flex-row space-x-9'>
        <div className='flex flex-col ml-5 mt-3 w-full'>
          <p className='text-gray-400 mb-2'>Title Name</p>
          <TextField id="outlined-basic" label="Title" variant="outlined" className='mt-3 w-full' />
        </div>
        <div className='flex flex-col mr-19 mt-3 w-full'>
          <p className='text-gray-400 mb-2'>Description</p>
          <TextField id="outlined-basic" label="Price" variant="outlined" className='mt-3 w-full' />
        </div>
          </div>
          <div className='flex flex-row ml-5 mt-7'>
          <label htmlFor="thumbnail" className="flex items-center justify-center cursor-pointer mb-6">
                    <div className="w-auto h-auto flex items-center justify-center bg-gray-100 rounded-lg border-2 border-gray-300 transition-all duration-300 ease-in-out hover:border-gray-500 hover:shadow-lg">
                        <Image
                            src={assets.upimg}
                            alt="Upload Thumbnail"
                            // width={110}
                            // height={100}
                            className="object-cover rounded-lg"
                        />
                    </div>
                </label>
          <p className='text-gray-400 ml-3'>Dimension (512x512)
            <br />
            Size Upto 2MB
          </p>
                <input
                    type="file"
                    id="thumbnail"
                    className="hidden"
                />
          </div>
          <div className='flex flex-row justify-center items-center space-x-5 mt-3 mb-5'>
              <button type='submit' className='px-15 font-bold py-3 bg-amber-400'>Save</button>
              <button onClick={handleProductsCancel} className='px-15 font-bold py-2.5 bg-white border-1'>Cancel</button>
          </div>
    </div>
  )
}

export default Page
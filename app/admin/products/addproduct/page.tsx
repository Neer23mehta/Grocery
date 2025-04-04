import { assets } from '@/assests/assets'
import { FormControl, InputLabel, Select, TextField } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className='bg-white shadow-md h-auto w-auto flex flex-col'>
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
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
            >
            </Select>
          </FormControl>
        </div>
        <div className='flex flex-col ml-5 mt-3'>
          <p className='text-gray-400 mb-2'>Sub Category</p>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
            >
            </Select>
          </FormControl>
        </div>
        <div className='flex flex-col ml-5 mt-3'>
          <p className='text-gray-400 mb-2'>Brand</p>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
            >
            </Select>
          </FormControl>
        </div>
      </div>
      <div className='mt-10 ml-5 w-full flex flex-row'>
        <h1 className='font-bold h-[28px] text-xl'>Product Details</h1>
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
          <div className='mt-10 ml-5 w-full flex flex-row'>
        <h1 className='font-bold h-[28px] text-xl'>Product Details</h1>
      </div>
      <div className='flex flex-row space-x-9'>
        <div className='flex flex-col ml-5 mt-3'>
          <p className='text-gray-400 mb-2'>Variation</p>
          <TextField id="outlined-basic" label="Product qnty." variant="outlined" className='mt-3' />
        </div>
        <div className='flex flex-col ml-5 mt-3'>
          <p className='text-gray-400 mb-2'>Description</p>
          <TextField id="outlined-basic" label="Price" variant="outlined" className='mt-3' />
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

                <input
                    type="file"
                    id="thumbnail"
                    className="hidden"
                />
          </div>
          <div className='flex flex-row justify-center items-center space-x-5 mt-7 mb-5'>
              <button className='px-15 font-bold py-3 bg-amber-400'>Save</button>
              <button className='px-15 font-bold py-2.5 bg-white border-1'>Cancel</button>
          </div>
    </div>
  )
}

export default page
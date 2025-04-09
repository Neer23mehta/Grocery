import { assets } from '@/assests/assets'
import Image from 'next/image'
import React from 'react'

const Page = () => {
  return (
    //  <div className='flex flex-col justify-center items-center'>
    //     <form className='flex flex-col bg-white mt-25 py-6 px-15 justify-center items-center' >
    //   <h1 className='text-2xl font-bold'>Add Section</h1>
    //   <div className='flex flex-col justify-start mt-5 space-y-5'>
    //   <div className='flex flex-row space-x-5 justify-start '>
    //   <input type='radio'/>
    //   <label>Slider with images</label>
    //   </div>
    //   <div className='flex flex-row space-x-5 justify-start '>
    //   <input type='radio'/>
    //   <label>Grid view with image,title & discount</label>
    //   </div>
    //   <div className='flex flex-row space-x-5 justify-start '>
    //   <input type='radio'/>
    //   <label>Slider with products</label>
    //   </div>
    //   <div className='flex flex-row space-x-5 justify-start '>
    //   <input type='radio'/>
    //   <label>Grid view with images</label>
    //   </div>
    //   </div>
    //   <div className='flex justify-center items-center mt-5'>
    //     <button className='px-25 py-2 bg-amber-400 font-bold'>Submit</button>
    //   </div>
    //     </form>
    //   </div> 
    // <div className='flex flex-col justify-center items-center'>
    //   <form className='flex flex-col bg-white mt-25 py-6 px-15 justify-center items-center' >
    //     <h1 className='text-2xl font-bold'>Shop By Category</h1>
    //     <div className='flex flex-col justify-start mt-5 space-y-5'>
    //       <div className='flex flex-col space-x-5 justify-start '>

    //         <label className='text-gray-400 mt-5'>Title Name</label>
    //         <input type='text' name='shopbycategory' placeholder='for ex Shop By Category' className='font-bold border-1 border-gray-200 mt-2 py-2 px-3 text-black' />
    //       </div>
    //       <div className='flex flex-col space-x-5 justify-start '>
    //         <label className='text-gray-400'>Select Category</label>
    //         <select className='font-bold px-3 py-2 mt-2 border-1 border-gray-200 text-black'>Select Category</select>
    //         {/* <option>Bakery, Cakes & Dairy </option> */}
    //       </div>
    //       <div className='flex flex-col space-x-5 justify-start '>

    //         <label className='text-gray-400'>Offer</label>
    //         <input type='text' name='offer' placeholder='for ex 10% Off' className='font-bold border-1 border-gray-200 mt-2 py-2 px-3 text-black' />
    //       </div>
    //     </div>
    //     <div className='flex justify-center items-center mt-5'>
    //       <button className='px-25 py-2 bg-amber-400 font-bold'>Submit</button>
    //     </div>
    //   </form>
    // </div>
       <div className='flex flex-col justify-center items-center'>
      <form  className='flex flex-col bg-white mt-10 py-6 px-15 justify-center items-center' >
        <h1 className='text-2xl font-bold mb-1  '>Add Coupon</h1>
        <div className='flex flex-col justify-start mt-5 space-y-5'>
          <div className='flex flex-col space-x-5 justify-start '>

            <label className='text-gray-400 mt-6'>Coupon Name</label>
            <input type='text' name='product' placeholder='Name' className='font-bold border-1 border-gray-200 mt-2 py-2 px-3 text-black' />
          </div>
          <div className='flex flex-col space-x-5 justify-start '>
            <label className='text-gray-400'>Minimum Purchase</label>
            <input type='text' name='product' placeholder='Minimum Purchase' className='font-bold border-1 border-gray-200 mt-2 py-2 px-3 text-black' />
          </div>
          <div className='flex flex-col space-x-5 justify-start '>
            <label className='text-gray-400'>Discount Price</label>
            <input type='text' name='product' placeholder='Discount Price' className='font-bold border-1 border-gray-200 mt-2 py-2 px-3 text-black' />
          </div>
          <div className='flex flex-col space-x-5 justify-start '>

            <label className='text-gray-400'>Date</label>
            <input type='date' name='date' placeholder='From - to' className='font-bold border-1 border-gray-200 mt-2 py-2 px-3 text-gray-400' />
          </div>
          <div className='flex flex-col space-x-5 justify-start '>

            <label className='text-gray-400'>Coupon Code</label>
            <input type='text' name='offer' placeholder='Coupon Code' className='font-bold border-1 border-gray-200 mt-2 py-2 px-3 text-black' />
          </div>
        </div>
        <div className='flex justify-center items-center mt-5'>
          <button className='px-28 py-2 bg-amber-400 font-bold'>Submit</button>
        </div>
      </form>
    </div>
 
  )
}

export default Page
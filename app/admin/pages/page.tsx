// import { assets } from '@/assests/assets'
// import Newpassword from '../../../components/Newpassword'
// import Image from 'next/image'
// import React from 'react'

// const Page = () => {
  
//   return (
//     //  <div className='flex flex-col justify-center items-center'>
//     //     <form className='flex flex-col bg-white mt-25 py-6 px-15 justify-center items-center' >
//     //   <h1 className='text-2xl font-bold'>Add Section</h1>
//     //   <div className='flex flex-col justify-start mt-5 space-y-5'>
//     //   <div className='flex flex-row space-x-5 justify-start '>
//     //   <input type='radio'/>
//     //   <label>Slider with images</label>
//     //   </div>
//     //   <div className='flex flex-row space-x-5 justify-start '>
//     //   <input type='radio'/>
//     //   <label>Grid view with image,title & discount</label>
//     //   </div>
//     //   <div className='flex flex-row space-x-5 justify-start '>
//     //   <input type='radio'/>
//     //   <label>Slider with products</label>
//     //   </div>
//     //   <div className='flex flex-row space-x-5 justify-start '>
//     //   <input type='radio'/>
//     //   <label>Grid view with images</label>
//     //   </div>
//     //   </div>
//     //   <div className='flex justify-center items-center mt-5'>
//     //     <button className='px-25 py-2 bg-amber-400 font-bold'>Submit</button>
//     //   </div>
//     //     </form>
//     //   </div> 
//     // <div className='flex flex-col justify-center items-center'>
//     //   <form className='flex flex-col bg-white mt-25 py-6 px-15 justify-center items-center' >
//     //     <h1 className='text-2xl font-bold'>Shop By Category</h1>
//     //     <div className='flex flex-col justify-start mt-5 space-y-5'>
//     //       <div className='flex flex-col space-x-5 justify-start '>

//     //         <label className='text-gray-400 mt-5'>Title Name</label>
//     //         <input type='text' name='shopbycategory' placeholder='for ex Shop By Category' className='font-bold border-1 border-gray-200 mt-2 py-2 px-3 text-black' />
//     //       </div>
//     //       <div className='flex flex-col space-x-5 justify-start '>
//     //         <label className='text-gray-400'>Select Category</label>
//     //         <select className='font-bold px-3 py-2 mt-2 border-1 border-gray-200 text-black'>Select Category</select>
//     //         {/* <option>Bakery, Cakes & Dairy </option> */}
//     //       </div>
//     //       <div className='flex flex-col space-x-5 justify-start '>

//     //         <label className='text-gray-400'>Offer</label>
//     //         <input type='text' name='offer' placeholder='for ex 10% Off' className='font-bold border-1 border-gray-200 mt-2 py-2 px-3 text-black' />
//     //       </div>
//     //     </div>
//     //     <div className='flex justify-center items-center mt-5'>
//     //       <button className='px-25 py-2 bg-amber-400 font-bold'>Submit</button>
//     //     </div>
//     //   </form>
//     // </div>
//     //    <div className='flex flex-col justify-center items-center'>
//     //   <form className='flex flex-col bg-white mt-1 py-1 px-4 lg:w-[450px] md:w-auto sm:w-auto justify-center items-center' >
//     //         <div className='flex justify-end items-end '>
//     //           <Image src={assets.can} alt='remove' className='ml-95'/>
//     //         </div>
//     //     <h1 className='text-2xl font-bold mb-1  '>Configration</h1>
//     //     <div className='flex flex-col justify-start mt-5 space-y-5'>
//     //       <div className='flex flex-row space-x-5 justify-between '>
//     //       <button className='px-2 py-3 bg-white shadow-md underline-offset-1'>Manage Delivery</button>
//     //       <button className='px-2 py-3 bg-white shadow-md underline-offset-1'>Manage Tax</button>
//     //       </div>
//     //       <div className='flex flex-col space-x-5 justify-start '>
//     //         <label className='text-gray-400'>Free Delivery Upto</label>
//     //         <input type='text' name='product' placeholder='Free Delivery Upto' className='font-bold border-1 border-gray-200 mt-2 py-2 px-3 text-black' />
//     //       </div>
//     //       <div className='flex flex-col space-x-5 justify-start '>
//     //         <label className='text-gray-400'>Delivery Charge</label>
//     //         <input type='text' name='product' placeholder='Delivery Charge' className='font-bold border-1 border-gray-200 mt-2 py-2 px-3 text-black' />
//     //       </div>
//     //     </div>
//     //     <div className='flex justify-center items-center mt-5'>
//     //       <button className='px-28 py-2 bg-amber-400 font-bold mb-3' type='submit'>Update</button>
//     //     </div>
//     //   </form>
//     // </div>
//     <div>
//       {/* <Newpassword/> */}
//           <div className='flex flex-col justify-center items-center'>
//        <form className='flex flex-col bg-white mt-1 py-1 px-4 lg:w-[450px] md:w-auto sm:w-auto justify-center items-center' >
//              <div className='flex justify-end items-end '>
//                <Image src={assets.can} alt='remove' className='ml-95'/>
//              </div>
//          <h1 className='text-2xl font-bold mb-1  '>Logout</h1>
//          <div className='flex flex-col justify-start mt-10 space-y-5'>
//            <div className='flex flex-col text-center justify-center items-center '>
//             <p className='text-gray-400'>Are you sure you want to
//               <br /> logout ? </p>
//            </div>         
//          </div>
//          <div className='flex justify-center items-center mt-5'>
//            <button className='px-28 py-2 bg-amber-400 font-bold mb-3' type='submit'>Logout</button>
//         </div>
//       </form>
//     </div>
//     // <div className='flex flex-col justify-center items-center'>
//     //       <form className='flex flex-col bg-white mt-25 py-6 px-15 justify-center items-center' >
//     //     <h1 className='text-3xl font-bold'>Home Management</h1>
//     //     <div className='flex flex-row items-center space-x-5 text-x mt-2'>
//     //       <p className='text-gray-400'>Dashboard</p> <span>{`>`}</span><p>Home Management</p>
//     //     </div>
//     //     <div className='flex justify-center items-center mt-5'>

//     //     <label htmlFor="thumbnail" className="flex items-center justify-center cursor-pointer mb-6">
//     //                     <div className="w-28 h-28 flex items-center justify-center bg-gray-100 rounded-lg grayscale transition-all duration-300 ease-in-out hover:border-gray-500 hover:shadow-lg">
//     //                         <Image
//     //                             src={assets.basket}
//     //                             alt="Upload Thumbnail"
//     //                             width={110}
//     //                             height={110}
//     //                             className="object-cover rounded-lg"
//     //                         />
//     //                     </div>
//     //                 </label>

//     //                 <input
//     //                     type="file"
//     //                     id="thumbnail"
//     //                     className="hidden"
//     //                 />
//     //     </div>
//     //     <div className='flex justify-center items-center mt-3'>
//     //       <button className='px-10 py-2 bg-amber-400 font-bold'>Add Section</button>
//     //     </div>
//     //       </form>
//     //     </div> 
//     </div>
              {/* <button onClick={handleToggleStatus}><Image src={status ? assets.scrollon : assets.scrolloff}/></button> */}

//   )
// }

// export default Page


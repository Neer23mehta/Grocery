'use client'
import { assets } from '@/assests/assets'
import Image from 'next/image'
import React, { useState } from 'react'
import { MdEdit } from "react-icons/md";

const Page = () => {
  const [product, setProduct] = useState(false)
  const [banner, setBanner] = useState("")
  const [category, setCategory] = useState("")
  const [newCategory, setNewCategory] = useState(false)
  const [section, setSection] = useState(false)

  const handleNewProduct = () => {
    setProduct(!product)
  }

  const handleNewBanner = () => {

  }

  const handleRemoveBanner = () => {

  }

  const handleRemoveCategory = () => {

  }

  const handleToggleCategory = () => {
    setNewCategory(!newCategory)
  }

  const toggleSection = () => {
    setSection(!section)
  }
  return (
    <div>
      <div className={`flex flex-row justify-between items-center relative ${newCategory||section||product ? "opacity-35" : "opacity-100"} `}>
        <div className={`flex flex-col px-2 ${newCategory||section||product ? "opacity-35" : "opacity-100"}`}>
          <h1 className='text-3xl font-bold'>Home Management</h1>
          <p className='text-gray-500 mt-2'>Dashboard <span className='text-black ml-5'>Home Management</span> </p>
        </div>
        <div className='flex flex-col justify-end items-end'>
          <button className='bg-amber-300 px-5 py-2 font-bold' onClick={toggleSection}>Add Section</button>
        </div>
      </div>

      <div className='flex flex-col mt-5 px-4 bg-white shadow:md'>
        <div className='flex flex-row justify-between items-center'>
          <h1 className='mt-5 font-bold text-xl'>Banner Slider</h1>
          <Image src={assets.del} alt='delete' className='mt-5 flex justify-end' width={17} height={25} />
        </div>
        <div className='flex flex-row justify-around items-center mb-5 mt-3'>
          <Image src={assets.banner} alt='banner' height={130} width={380} />
          <Image src={assets.banner} alt='banner' height={130} width={380} />
          <div className='h-[130px] w-[380px] flex items-center justify-center'>
            <Image src={assets.add} alt='banner' onClick={handleNewBanner} />
          </div>
          <ul>
            {/* {
              <div className='h-[130px] w-[380px] flex items-center justify-center'>
                <Image src={assets.cancel} alt='remove' className='absolute ml-25' onClick={handleRemoveBanner}/>
                <Image src={} alt='banner' />
              </div>
            } */}
          </ul>
        </div>
      </div>
      <div className='flex flex-col mt-5 px-4 bg-white shadow:md'>
        <div className='flex flex-row items-center'>
          <h1 className='mt-5 font-bold text-xl'>Shop by Category</h1>
          <Image src={assets.edit} alt='delete' className='mt-5 flex justify-end ml-4' width={17} height={25} />
        </div>
        <div className='flex flex-row justify-around items-center mb-5 mt-3'>
          <div className=''>
            <Image src={assets.cancel} alt='remove' className='absolute ml-25 ' />
            <Image src={assets.imj} alt='Image' className='px-2 py-8 border border-gray-300' />
            <p className='text-xs py-1 font-bold'>Vegetables & Fruits { }</p>
            <p className='text-gray-400 text-xs '>Min 20% Off{ }</p>
          </div>
          <div className=''>
            <Image src={assets.cancel} alt='remove' className='absolute ml-25' />
            <Image src={assets.imj} alt='Image' className='px-2 py-8 border border-gray-300 relative' />
            <p className='text-xs py-1 font-bold'>Vegetables & Fruits { }</p>
            <p className='text-gray-400 text-xs '>Min 20% Off{ }</p>
          </div>
          <div className=''>
            <Image src={assets.cancel} alt='remove' className='absolute ml-25' />
            <Image src={assets.imj} alt='Image' className='px-2 py-8 border border-gray-300 relative' />
            <p className='text-xs py-1 font-bold'>Vegetables & Fruits { }</p>
            <p className='text-gray-400 text-xs '>Min 20% Off{ }</p>
          </div>
          <div className=''>
            <Image src={assets.cancel} alt='remove' className='absolute ml-25' />
            <Image src={assets.imj} alt='Image' className='px-2 py-8 border border-gray-300 relative' />
            <p className='text-xs py-1 font-bold'>Vegetables & Fruits { }</p>
            <p className='text-gray-400 text-xs '>Min 20% Off{ }</p>
          </div>
          <div className=''>
            <Image src={assets.cancel} alt='remove' className='absolute ml-25' />
            <Image src={assets.imj} alt='Image' className='px-2 py-8 border border-gray-300 relative' />
            <p className='text-xs py-1 font-bold'>Vegetables & Fruits { }</p>
            <p className='text-gray-400 text-xs'>Min 20% Off{ }</p>
          </div>
          <div className=''>
            <Image src={assets.cancel} alt='remove' className='absolute ml-25' />
            <Image src={assets.imj} alt='Image' className='px-2 py-8 border border-gray-300 relative' />
            <p className='text-xs py-1 font-bold'>Vegetables & Fruits { }</p>
            <p className='text-gray-400 text-xs '>Min 20% Off{ }</p>
          </div>
          <div className=''>
            <Image src={assets.cancel} alt='remove' className='absolute ml-25' onClick={handleRemoveCategory} />
            <Image src={assets.imj} alt='Image' className='px-2 py-8 border border-gray-300 relative' />
            <p className='text-xs py-1 font-bold'>Vegetables & Fruits { }</p>
            <p className='text-gray-400 text-xs '>Min 20% Off{ }</p>
          </div>
          <div className='flex justify-center items-center h-[131px] border border-gray-300 mb-[38px] w-[125px]'>
            <Image src={assets.add} alt='Image' className='px-2 py-8' onClick={handleToggleCategory} />
          </div>
          <div>
            <ul>
              {

              }
            </ul>
          </div>
        </div>
      </div>
      <div className='py-5 px-3 bg-white shadow:md mt-5'>
        <div className='flex flex-row justify-between items-center'>
          <div className='flex flex-row'>
            <h1 className='text-2xl font-bold'>Products</h1>
            <button className='text-gray-500 ml-3'>                <MdEdit size={23} />                </button>
          </div>
          <div className='flex flex-row space-x-3.5'>
            <Image src={assets.ad} alt='add' width={20} height={29} onClick={handleNewProduct} />
            <Image src={assets.del} alt='delete' className='flex justify-end' width={17} height={25} />
          </div>
        </div>

        <table className="min-w-full bg-white rounded-lg overflow-hidden mt-5">
          <thead>
            <tr>
              <th className="py-2 px-2 text-left text-md font-semibold text-black">Image</th>
              <th className="px-2 py-2 text-left text-md font-semibold text-black">Product Name</th>
              <th className="px-2 py-2 text-left text-md font-semibold text-black">Category</th>
              <th className="px-5 py-2 text-left text-md font-semibold text-black">Description</th>
              <th className="px-2 py-2 text-left text-md font-semibold text-black">Variation</th>
              <th className="py-2 px-2 text-left text-md font-semibold text-black">Price</th>
              <th className="py-2 px-2 text-left text-md font-semibold text-black">Stock</th>
              <th className="py-2 px-2 text-left text-md font-semibold text-black">Action</th>
            </tr>
          </thead>
          <tbody className=''>
            {/* {
              adds
                // .filter(item => input === "" || item.Category_Name.toLowerCase().includes(input.toLowerCase()))
                .map((curval) => {
                  const { No, Image, Category_Name, Status } = curval;
                  return (
                    <tr key={No} className="space-y-5">
                      <td className='px-2 py-3'>{No}</td>
                      <td>
                        <img src={Image} alt={Category_Name} className="w-14 h-13 object-cover" />
                      </td>
                      <td>{Category_Name}</td>
                      <td>
                        <button> */}
            {/* <Image
                          src={scroll ? assets.scrolloff : assets.scrollon}
                          alt="Scroll Status"
                          onClick={(e)=>handleScroll(e)}
                          className="cursor-pointer"
                          height={30}
                          width={30}
            //             /> */}
            {/* //             </button>
            //           </td>
            //           <td>
            //             <button  className="ml-2 text-gray-600 rounded"><MdEdit size={18} /></button>
            //             <button  className="ml-5 text-gray-600 rounded"><RiDeleteBin5Fill size={18} /></button>
            //           </td>
            //         </tr>
            //       );
            //     })
            // } */}
          </tbody>
        </table>
      </div>
      <div className='flex flex-col mt-5 px-4 bg-white shadow:md'>
        <div className='flex flex-row justify-between items-center'>
          <div className='flex flex-row'>
            <h1 className='mt-5 font-bold text-xl'>Advertisement</h1>
            <button className='text-gray-500 ml-3 mt-5'>                <MdEdit size={20} />                </button>
          </div>
          <Image src={assets.del} alt='delete' className='mt-5 flex justify-end' width={17} height={25} />
        </div>
        <div className='flex flex-row justify-around items-center mb-5 mt-3 space-x-2 gap-5'>
          <Image src={assets.newimg} alt='banner' className='border bg-contain ' />
          <Image src={assets.add} alt='banner' className='border-1' />
          <Image src={assets.add} alt='banner' />
          <Image src={assets.add} alt='banner' />
          <ul>
            {

            }
          </ul>
        </div>
      </div>

      <div className='flex flex-col mt-5 px-4 bg-white shadow:md'>
        <div className='flex flex-row justify-between items-center'>
          <div className='flex flex-row'>
            <h1 className='mt-5 font-bold text-xl'>Brands</h1>
            <button className='text-gray-500 ml-3 mt-5'>                <MdEdit size={20} />                </button>
          </div>
          <Image src={assets.del} alt='delete' className='mt-5 flex justify-end' width={17} height={25} />
        </div>
        <div className='flex flex-row justify-start items-center mb-5 mt-3 space-x-2 gap-5'>
          <Image src={assets.simg} alt='banner' className='border bg-contain ' />
          <Image src={assets.add} alt='banner' className='border-1' />
          <Image src={assets.add} alt='banner' />
          {/* <Image src={assets.add} alt='banner'/> */}
          {/* <Image src={assets.add} alt='banner'/> */}
          {/* <Image src={assets.add} alt='banner'/> */}
          {/* <Image src={assets.add} alt='banner'/> */}
          {/* <Image src={assets.add} alt='banner'/> */}
          {/* <Image src={assets.add} alt='banner'/> */}
          <ul>
            {

            }
          </ul>
        </div>
      </div>
      {/* {
              newCategory ? (
                 <div className='flex flex-col justify-center items-center absolute ml-25 mb-100'>
      <form className='flex flex-col bg-white mt-25 py-6 px-15 justify-center items-center' >
        <h1 className='text-2xl font-bold'>Shop By Category</h1>
        <div className='flex flex-col justify-start mt-5 space-y-5'>
          <div className='flex flex-col space-x-5 justify-start '>

            <label className='text-gray-400 mt-5'>Title Name</label>
            <input type='text' name='shopbycategory' placeholder='for ex Shop By Category' className='font-bold border-1 border-gray-200 mt-2 py-2 px-3 text-black' />
          </div>
          <div className='flex flex-col space-x-5 justify-start '>
            <label className='text-gray-400'>Select Category</label>
            <select className='font-bold px-3 py-2 mt-2 border-1 border-gray-200 text-black'>Select Category</select>
          </div>
          <div className='flex flex-col space-x-5 justify-start '>

            <label className='text-gray-400'>Offer</label>
            <input type='text' name='offer' placeholder='for ex 10% Off' className='font-bold border-1 border-gray-200 mt-2 py-2 px-3 text-black' />
          </div>
        </div>
        <div className='flex justify-center items-center mt-5'>
          <button className='px-25 py-2 bg-amber-400 font-bold'>Submit</button>
        </div>
      </form>
    </div>
              ) : null
            } */}
      {/* {
              product ? (
                <div className='flex flex-col justify-center items-center'>
                <form className='flex flex-col bg-white mt-10 py-6 px-15 justify-center items-center' >
                  <h1 className='text-2xl font-bold'>Add Product</h1>
                  <div className='flex flex-col justify-start mt-5 space-y-5'>
                    <div className='flex flex-col space-x-5 justify-start '> */}
      {/*           
                      <label className='text-gray-400 mt-5'>Title Name</label>
                      <input type='text' name='product' placeholder='Our Product' className='font-bold border-1 border-gray-200 mt-2 py-2 px-3 text-black' />
                    </div>
                    <div className='flex flex-col space-x-5 justify-start '>
                      <label className='text-gray-400'>Category</label>
                      <select className=' px-3 py-2 mt-2 border-1 border-gray-200 text-black'>Select Category
                        <option>Select </option>
                      </select>
                    </div>
                    <div className='flex flex-col space-x-5 justify-start '>
                      <label className='text-gray-400'>Sub Category</label>
                      <select className=' px-3 py-2 mt-2 border-1 border-gray-200 text-black'>Select Category
                      <option>Select </option>
                      </select>
                    </div>
                    <div className='flex flex-col space-x-5 justify-start '>
          
                      <label className='text-gray-400'>Product Name</label>
                      <input type='text' name='offer' placeholder='Product Name' className='font-bold border-1 border-gray-200 mt-2 py-2 px-3 text-black' />
                    </div>
                  </div>
                  <div className='flex justify-center items-center mt-5'>
                    <button className='px-28 py-2 bg-amber-400 font-bold'>Submit</button>
                  </div>
                </form>
              </div>
              ):null
            } */}
      {/* {
        section ? (
          <div className='flex flex-col justify-center items-center'>
            <form className='flex flex-col bg-white mt-25 py-6 px-15 justify-center items-center' >
              <h1 className='text-2xl font-bold'>Add Section</h1>
              <div className='flex flex-col justify-start mt-5 space-y-5'>
                <div className='flex flex-row space-x-5 justify-start '>
                  <input type='radio' />
                  <label>Slider with images</label>
                </div>
                <div className='flex flex-row space-x-5 justify-start '>
                  <input type='radio' />
                  <label>Grid view with image,title & discount</label>
                </div>
                <div className='flex flex-row space-x-5 justify-start '>
                  <input type='radio' />
                  <label>Slider with products</label>
                </div>
                <div className='flex flex-row space-x-5 justify-start '>
                  <input type='radio' />
                  <label>Grid view with images</label>
                </div>
              </div>
              <div className='flex justify-center items-center mt-5'>
                <button className='px-25 py-2 bg-amber-400 font-bold'>Submit</button>
              </div>
            </form>
          </div>
        ):null
            } */}
    </div>
    // <div className='flex flex-col justify-center items-center'>
    //       <form className='flex flex-col bg-white mt-25 py-6 px-15 justify-center items-center' >
    //     <h1 className='text-3xl font-bold'>Home Management</h1>
    //     <div className='flex flex-row items-center space-x-5 text-x mt-2'>
    //       <p className='text-gray-400'>Dashboard</p> <span>{`>`}</span><p>Home Management</p>
    //     </div>
    //     <div className='flex justify-center items-center mt-5'>

    //     <label htmlFor="thumbnail" className="flex items-center justify-center cursor-pointer mb-6">
    //                     <div className="w-28 h-28 flex items-center justify-center bg-gray-100 rounded-lg grayscale transition-all duration-300 ease-in-out hover:border-gray-500 hover:shadow-lg">
    //                         <Image
    //                             src={assets.basket}
    //                             alt="Upload Thumbnail"
    //                             width={110}
    //                             height={110}
    //                             className="object-cover rounded-lg"
    //                         />
    //                     </div>
    //                 </label>

    //                 <input
    //                     type="file"
    //                     id="thumbnail"
    //                     className="hidden"
    //                 />
    //     </div>
    //     <div className='flex justify-center items-center mt-3'>
    //       <button className='px-10 py-2 bg-amber-400 font-bold'>Add Section</button>
    //     </div>
    //       </form>
    //     </div> 
  )
}

export default Page
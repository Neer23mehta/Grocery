'use client'
import React, { useEffect, useState } from 'react'
import { assets } from '@/assests/assets'
import commonGetApis from '@/commonapi/Commonapi';
import { Dialog, DialogActions, DialogContent } from '@mui/material';
import Image from 'next/image';
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";

interface Product {
  Product_Name: string;
  Description: string;
  Image: string;
  Price: string;
  Stock_Status: number;
  Variation: string;
  Category_Name: string;
}

const Page = () => {
  const [product, setProduct] = useState(false)
  const [banner, setBanner] = useState("")
  const [category, setCategory] = useState("")
  const [adds, setAdds] = useState<Product []>([]);
  const [newCategory, setNewCategory] = useState(false)
  const [section, setSection] = useState(false)

  const handleNewProduct = () => {
    setProduct(!product)
  }

  const fetchGetBanner = async () => {
    try {

    } catch (error) {
      console.log("error", error)
    }
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

  const fetchGetProducts = async () => {
    try {
      const res = await commonGetApis("get_products?pageNumber=1&pageLimit=10");
      setAdds(res?.data.result || [])
    } catch (error) {
      console.log(error)
    }
  }
console.log("res",adds)
  useEffect (() => {
    fetchGetProducts();
  }, [])

  const handleDeleteProduct = () => {

  }
  return (
    <div>
      <div className={`flex flex-row justify-between items-center relative ${newCategory || section || product ? "opacity-35" : "opacity-100"} `}>
        <div className={`flex flex-col px-2 ${newCategory || section || product ? "opacity-35" : "opacity-100"}`}>
          <h1 className='text-3xl font-bold'>Home Management</h1>
          <p className='text-gray-500 mt-2'>Dashboard <span className='text-black ml-5'>Home Management</span> </p>
        </div>
        <div className='flex flex-col justify-end items-end'>
          <button className='bg-amber-300 px-5 py-2 font-bold' onClick={toggleSection}>Add Section</button>
        </div>
      </div>

      <div className='flex flex-col mt-5 px-4 bg-white shadow:md overflow-scroll scroll-smooth'>
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
        <div className='flex flex-row justify-around items-center mb-5 mt-3 space-x-2.5 overflow-scroll'>
          <div className=''>
            <Image src={assets.cancel} alt='remove' className='absolute ' />
            <Image src={assets.imj} alt='Image' className='px-2 py-8 border border-gray-300' />
            <p className='text-xs py-1 font-bold'>Vegetables & Fruits { }</p>
            <p className='text-gray-400 text-xs '>Min 20% Off{ }</p>
          </div>
          <div className=''>
            <Image src={assets.cancel} alt='remove' className='absolute ' />
            <Image src={assets.imj} alt='Image' className='px-2 py-8 border border-gray-300 relative' />
            <p className='text-xs py-1 font-bold'>Vegetables & Fruits { }</p>
            <p className='text-gray-400 text-xs '>Min 20% Off{ }</p>
          </div>
          <div className=''>
            <Image src={assets.cancel} alt='remove' className='absolute ' />
            <Image src={assets.imj} alt='Image' className='px-2 py-8 border border-gray-300 relative' />
            <p className='text-xs py-1 font-bold'>Vegetables & Fruits { }</p>
            <p className='text-gray-400 text-xs '>Min 20% Off{ }</p>
          </div>
          <div className=''>
            <Image src={assets.cancel} alt='remove' className='absolute ' />
            <Image src={assets.imj} alt='Image' className='px-2 py-8 border border-gray-300 relative' />
            <p className='text-xs py-1 font-bold'>Vegetables & Fruits { }</p>
            <p className='text-gray-400 text-xs '>Min 20% Off{ }</p>
          </div>
          <div className=''>
            <Image src={assets.cancel} alt='remove' className='absolute ' />
            <Image src={assets.imj} alt='Image' className='px-2 py-8 border border-gray-300 relative' />
            <p className='text-xs py-1 font-bold'>Vegetables & Fruits { }</p>
            <p className='text-gray-400 text-xs'>Min 20% Off{ }</p>
          </div>
          <div className=''>
            <Image src={assets.cancel} alt='remove' className='absolute ' />
            <Image src={assets.imj} alt='Image' className='px-2 py-8 border border-gray-300 relative' />
            <p className='text-xs py-1 font-bold'>Vegetables & Fruits { }</p>
            <p className='text-gray-400 text-xs '>Min 20% Off{ }</p>
          </div>
          <div className=''>
            <Image src={assets.cancel} alt='remove' className='absolute' onClick={handleRemoveCategory} />
            <Image src={assets.imj} alt='Image' className='px-2 py-8 border border-gray-300 relative' />
            <p className='text-xs py-1 font-bold'>Vegetables & Fruits { }</p>
            <p className='text-gray-400 text-xs '>Min 20% Off{ }</p>
          </div>
          <div className=''>
            <Image src={assets.cancel} alt='remove' className='absolute' onClick={handleRemoveCategory} />
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
         <tbody className="">
                    {adds
                      .map((curval, index) => {
                        const { Product_Name, Description, Price, Stock_Status, Variation, Category_Name } = curval;
                        return (
                          <tr key={index} className=''>
                            <td className='px-2 py-2'>{curval.Image && <img src={curval.Image} alt={Product_Name} width={50} height={50} />}</td>
                            <td className='px-2 py-2'>{Product_Name}</td>
                            <td className='px-2 py-2'>{Category_Name}</td>
                            <td className='px-2 py-2'>{Description}</td>
                            <td className='px-2 py-2'>{Variation}</td>
                            <td className='px-2 py-2'>{Price}</td>
                            {/* <td>{Stock_Status === 1 ? <span className="text-green-500"><Image src={assets.scrollon} alt='active'/></span> : <span className="text-gray-500"><Image src={assets.scrolloff} alt='inactive'/></span>}</td> */}
                            {/* <td>{}</td> */}
                            <td className='px-2 py-2'><div>{Stock_Status === 1 ?<Image src={assets.scrollon} alt='In Stock'/>: <Image src={assets.scrolloff} alt='Out of Stock'/>}</div></td>
                            <td>
                              <button className='ml-2 text-gray-500'><MdEdit/></button>
                              <button onClick={handleDeleteProduct} className='ml-3 text-gray-500'><RiDeleteBin5Fill/></button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
        </table>
      </div>
      <div className='flex flex-col mt-5 px-4 bg-white shadow:md overflow-scroll scroll-smooth'>
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

      <div className='flex flex-col mt-5 px-4 bg-white shadow:md scroll-smooth overflow-scroll'>
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

      <Dialog open={newCategory} onClose={() => setNewCategory(false)}>
        <div className='flex flex-col justify-center items-center'>
          <DialogContent>
            <form className='flex flex-col bg-white py-6 px-10 justify-center items-center' >
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
              <DialogActions>
                <div className='flex justify-center items-center mt-5'>
                  <button className='px-25 py-2 bg-amber-400 font-bold'>Submit</button>
                </div>
              </DialogActions>
            </form>
          </DialogContent>
        </div>
      </Dialog>

      <Dialog open={product} onClose={() => setProduct(false)}>
        <div className='flex flex-col justify-center items-center'>
          <DialogContent>
            <form className='flex flex-col bg-white py-2 px-5 justify-center items-center' >
              <h1 className='text-2xl font-bold'>Add Product</h1>
              <div className='flex flex-col justify-start mt-5 space-y-5'>
                <div className='flex flex-col space-x-5 justify-start '>

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
              <DialogActions>
                <div className='flex justify-center items-center mt-5'>
                  <button className='px-28 py-2 bg-amber-400 font-bold'>Submit</button>
                </div>
              </DialogActions>
            </form>
          </DialogContent>
        </div>
      </Dialog>


      <Dialog open={section} onClose={() => setSection(false)}>
        <div className='flex flex-col justify-center items-center'>
          <DialogContent>
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

export default Page
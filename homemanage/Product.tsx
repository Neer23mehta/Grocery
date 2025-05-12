import React, { useEffect, useState } from 'react'
import { assets } from '@/assests/assets'
import Image from 'next/image'
import { MdEdit } from "react-icons/md";
import commonGetApis from '@/commonapi/Commonapi';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Dialog, DialogActions, DialogContent } from '@mui/material';

interface Product {
  Product_Name: string;
  Description: string;
  Image: string;
  Price: string;
  Stock_Status: number;
  Variation: string;
  Category_Name: string;
}

const Product = () => {
  const [product, setProduct] = useState(false)
  const [adds, setAdds] = useState<Product[]>([]);

  const handleNewProduct = () => {
    setProduct(!product)
  }
  const handleDeleteProduct = () => {

  }
  const fetchGetProducts = async () => {
    try {
      const res = await commonGetApis("get_products?pageNumber=1&pageLimit=10");
      setAdds(res?.data.result || [])
    } catch (error) {
      console.log(error)
    }
  }
  console.log("res", adds)
  useEffect(() => {
    fetchGetProducts();
  }, [])
  return (
    <div>
      <div className='py-5 px-3 bg-white shadow:md mt-5'>
        <div className='flex flex-row justify-between items-center'>
          <div className='flex flex-row'>
            <h1 className='text-2xl font-bold'>Products</h1>
            <button className='text-gray-500 ml-3'><MdEdit size={23} /></button>
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
                    <td className='px-2 py-2'>
                      {curval.Image && (
                        <Image
                          src={curval.Image} 
                          alt={Product_Name}  
                          width={50}           
                          height={50}          
                          className="object-cover"  
                        />
                      )}
                    </td>                                    <td className='px-2 py-2'>{Product_Name}</td>
                    <td className='px-2 py-2'>{Category_Name}</td>
                    <td className='px-2 py-2'>{Description}</td>
                    <td className='px-2 py-2'>{Variation}</td>
                    <td className='px-2 py-2'>{Price}</td>
                    {/* <td>{Stock_Status === 1 ? <span className="text-green-500"><Image src={assets.scrollon} alt='active'/></span> : <span className="text-gray-500"><Image src={assets.scrolloff} alt='inactive'/></span>}</td> */}
                    {/* <td>{}</td> */}
                    <td className='px-2 py-2'><div>{Stock_Status === 1 ? <Image src={assets.scrollon} alt='In Stock' /> : <Image src={assets.scrolloff} alt='Out of Stock' />}</div></td>
                    <td>
                      <button className='ml-2 text-gray-500'><MdEdit /></button>
                      <button onClick={handleDeleteProduct} className='ml-3 text-gray-500'><RiDeleteBin5Fill /></button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

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

    </div>
  )
}

export default Product
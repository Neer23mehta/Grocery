'use client'
import { Dialog, DialogActions, DialogContent, Pagination, Stack, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";
import { SlArrowRight } from "react-icons/sl";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { assets } from '@/assests/assets';
import commonGetApis from '@/commonapi/Commonapi';
import { toast } from 'react-toastify';

interface Product {
  Product_Name: string;
  Description: string;
  Image: string;
  Price: string;
  Stock_Status: number;
  Variation: string;
  Category_Name: string;
  Id: number;
}

interface ApiResponse {
  data: Product[];
}

const Page = () => {
  const [input, setInput] = useState<string>("");
  const [adds, setAdds] = useState<Product[]>([]);
  const [scroll, setScroll] = useState<boolean>(false);
  const [product, setProduct] = useState(false);
  const [productIdData, setProductIdData] = useState("");
  const [inputss, setInputss] = useState({
    name: "",
    category: "",
    description: "",
    variation: "",
    price: "",
    stock: "",
  })
  const [image, setImage] = useState("")
  const route = useRouter();

  const handleScroll = (e: React.WheelEvent) => {
    e.preventDefault();
    setScroll(!scroll);
  };

  const fetchCategories = async () => {

    try {
      const res = await commonGetApis("get_products?pageNumber=1&pageLimit=10");
      setAdds(res?.data.result || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  console.log("res", adds)
  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddProduct = () => {
    route.push("/admin/products/addproduct");
  };

  const handleStatusChange = async (id: number, currentStatus: number) => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('usertoken');

    if (!token || !refreshToken) {
      toast.error("Missing authentication tokens.");
      return;
    }

    const newStatus = currentStatus === 1 ? 0 : 1; 

    const formData = new URLSearchParams();
    formData.append('id', String(id));
    formData.append('stock_status', String(newStatus));

    try {
      const res = await axios.post(
        "http://192.168.2.181:3000/admin/status_change",
        formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Language': 'en',
            'Authorizations': token,
            'refresh_token': refreshToken,
          },
        }
      );

      toast.success("Stock status updated successfully");
      fetchCategories();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update stock status.");
    }
  };


  const handleProductEdit = async (Id: any) => {
    try {
      const res = await commonGetApis(`get_product_by_id?id=${Id}`)
      setProductIdData(res?.data?.DATA);
      if (productIdData) {
        setProduct(true)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went Wrong")
    }
  };

  const handleProductPosts = (e: any) => {
    const { name, value } = e.target
    setInputss({ ...inputss, [name]: value, })
  }

  const handleIdDataSubmit = () => {

  }
  console.log("proid", productIdData)
  return (
    <div className="">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col px-2">
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-gray-500 mt-2">Dashboard<span className="text-black ml-5">Products</span></p>
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Search Product"
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="ml-12 bg-white"
          />
          <button className="px-3 font-bold py-2 bg-amber-300 ml-5 w-auto h-13 " onClick={handleAddProduct}>Add Product</button>
        </div>
      </div>

      <div>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mt-5">
          <thead>
            <tr>
              <th className="py-2 px-2 text-left text-md font-semibold text-black">Image</th>
              <th className="px-2 py-2 text-left text-md font-semibold text-black">Product Name</th>
              <th className="px-2 py-2 text-left text-md font-semibold text-black">Category</th>
              <th className="px-2 py-2 text-left text-md font-semibold text-black">Description</th>
              <th className="px-2 py-2 text-left text-md font-semibold text-black">Variation</th>
              <th className="py-2 px-2 text-left text-md font-semibold text-black">Price</th>
              <th className="py-2 px-2 text-left text-md font-semibold text-black">Stock</th>
              <th className="py-2 px-2 text-left text-md font-semibold text-black">Action</th>
            </tr>
          </thead>
          <tbody className="">
            {adds
              .filter((item) => input === "" || item.Product_Name.toLowerCase().includes(input.toLowerCase()))
              .map((curval, index) => {
                const { Product_Name, Description, Price, Stock_Status, Variation, Category_Name, Id } = curval;
                return (
                  <tr key={index} className=''>
                    <td className='px-2 py-2'>{curval.Image && <img src={curval.Image} alt={Product_Name} width={50} height={50} />}</td>
                    <td className='px-2 py-2'>{Product_Name}</td>
                    <td className='px-2 py-2'>{Category_Name}</td>
                    <td className='px-2 py-2'>{Description}</td>
                    <td className='px-2 py-2'>{Variation}</td>
                    <td className='px-2 py-2'>{Price}</td>
                    <td onClick={() => handleStatusChange(Id, Stock_Status)} className='px-2 py-2'>
                      <div>
                        {Stock_Status === 1 ? (
                          <Image src={assets.scrollon} alt='In-Stock' />
                        ) : (
                          <Image src={assets.scrolloff} alt='Out-of-Stock' />
                        )}
                      </div>
                    </td>
                    <td>
                      <button onClick={() => handleProductEdit(Id)} className='ml-2 text-gray-500'><MdEdit /></button>
                      <button className='ml-3 text-gray-500'><RiDeleteBin5Fill /></button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        <Dialog open={product} onClose={() => setProduct(false)}>
          <div className='flex flex-col justify-center items-center'>
            <DialogContent>
              {productIdData && (
                <div className="flex flex-col items-center px-5 justify-center">
                  <form onSubmit={handleIdDataSubmit} className='flex flex-col justify-center items-center'>
                    <h1 className="text-2xl font-bold mb-3">Category Details</h1>
                    <div className='flex flex-row mt-7'>
                      <label htmlFor="thumbnail" className="flex items-center justify-center cursor-pointer mb-6">
                        <div className="w-[325px] h-[125px] flex items-center justify-center bg-gray-100 rounded-lg border-2 border-gray-300 transition-all duration-300 ease-in-out hover:border-gray-500 hover:shadow-lg">
                          <img
                            src={image ? URL.createObjectURL(image) : productIdData.Image}
                            alt="Upload Thumbnail"
                            width={110}
                            height={100}
                            className="object-cover rounded-lg"
                          />
                        </div>
                      </label>
                      <input
                        type="file"
                        id="thumbnail"
                        className="hidden"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </div>
                    <div className='border border-gray-400 h-[30px] flex justify-center'>
                      <input className='focus:outline-none px-3' type='text' value={inputss.category} placeholder={productIdData.Category_Name} name='category' onChange={handleProductPosts} />
                    </div>
                    <div className="flex flex-col mt-5">
                      <label className="text-gray-400">Status</label>
                      <select
                        name="stock"
                        value={inputss.stock}
                        onChange={handleProductPosts}
                        className="border border-gray-200 w-full py-2 px-2.5"
                      >
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                      </select>
                    </div>
                    <DialogActions>
                      <div className='flex flex-row justify-center items-center'>
                        <button type="submit" className="bg-amber-300 px-4 py-2 items-center flex">Save</button>
                      </div>
                    </DialogActions>
                  </form>
                </div>
              )}
            </DialogContent>
          </div>
        </Dialog>
        <div className="flex justify-end bottom-0 mt-5 h-[20px] items-center">
          <Stack spacing={2}>
            <Pagination count={10} variant='outlined' shape='rounded' />
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default Page;

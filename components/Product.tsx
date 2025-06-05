'use client'
import React, { useEffect, useState } from 'react';
import { InputAdornment, Pagination, Stack, TextField } from '@mui/material';
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { assets } from '@/assests/assets';
import commonGetApis, { commonPostApis, deleteApi } from '@/commonapi/Commonapi';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { IoSearchSharp } from "react-icons/io5";
import orderBy from 'lodash/orderBy';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Product {
  Product_Name: string;
  Description: string;
  Image: string;
  Price: string;
  Stock_Status: number;
  Variation: string;
  Category_Name: string;
  Id: number;
  Product_var_id: number;
}

interface Newproduct {
  Category_Name: string;
  Image: boolean;
}
const Products = () => {
  const [input, setInput] = useState<string>("");
  const [adds, setAdds] = useState<Product[]>([]);
  const [productIdData, setProductIdData] = useState<Newproduct | null>(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState("");
  const [sortField, setSortField] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [product, setProduct] = useState("")
  const route = useRouter();

  useEffect(() => {
    const refreshToken = localStorage.getItem("usertoken");
    if (!refreshToken) {
      route.replace('/');
    }
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await commonGetApis(`get_products?pageNumber=${page}&pageLimit=10`);
      setTotalCount(res.data.Total_Count)
      setAdds(res?.data?.result || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // const {} = useQuery({
  //   queryKey: ['products',page],
  //   queryFn: async () => {
  //     const res = await commonGetApis(`get_products?pageNumber=${page}&pageLimit=10`)
  //     return res.data;
  //   },
  //   // onSuccess: (data) => {
  //   //   setAdds(data.result);
  //   // }
  // })

  const count = Math.ceil(Number(totalCount) / 10)

  const handleAddProduct = () => {
    route.push("/admin/addproduct");
  };

  const handleStatusChange = async (id: number, currentStatus: number) => {
    const newStatus = currentStatus === 1 ? 0 : 1;

    setAdds((prevAdds) =>
      prevAdds.map((product) =>
        product.Product_var_id === id ? { ...product, Stock_Status: newStatus } : product
      )
    );

    const formData = new URLSearchParams();
    formData.append('id', String(id));
    formData.append('stockStatus', String(newStatus));

    try {
      const res = await commonPostApis("status_change", formData);

      if (res.data) {
        toast.success("Stock status updated successfully");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update stock status.");
      setAdds((prevAdds) =>
        prevAdds.map((product) =>
          product.Product_var_id === id ? { ...product, Stock_Status: currentStatus } : product
        )
      );
    }
  };

  const handleProductEdit = async (Id: number) => {
    try {
      const res = await commonGetApis(`get_product_by_id?id=${Id}`)
      setProductIdData(res?.data?.DATA);
    } catch (error) {
      console.log(error)
      toast.error("Something went Wrong")
    }
  };
  // console.log("PrID", productIdData)
  const handleIdDelete = async (id: number) => {
    try {
      const res = await deleteApi(`deleteproductvariation?id=${id}`)
      if (res.data) {
        setAdds((prev) => prev.filter((items) => items.Product_var_id !== id))
        toast.success("Deleted Successfully")
      }
    } catch (error) {
      console.log(error)
    }
  }

  // const {data} = useQuery({
  //   queryKey: ["product", "page", "input"],
  //   queryFn: async () => {
  //     const res = await commonGetApis(`get_products?pageNumber=${page}&pageLimit=10&search=${input}`);
  //     return res.data;
  //   },
  //   keepPreviousData: true,
  //   staleTime: 100000,
  // });

  // console.log("neerdata123",data)

  const setExportData = () => {
    if (!adds.length) {
      toast.warning("No data to export");
      return;
    }

    const headers = ["Product_Name", "Description", "Price", "Stock_Status", "Variation", "Category_Name", "Product_var_id"];
    const rows = adds.map(item => [
      item.Product_var_id,
      item.Product_Name,
      item.Description,
      item.Price,
      item.Variation,
      item.Category_Name,
      item.Stock_Status === 1 ? "Active" : "Inactive"
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "brands_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSortItems = (field: keyof Product) => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    const sortedData = orderBy([...adds], [field], [newOrder]);
    setAdds(sortedData);
    setSortField(field);
    setSortOrder(newOrder);
    toast.info(`${newOrder.toLocaleUpperCase()}ENDING ORDER`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  useEffect(() => {
    fetchCategories();
  }, [input, page]);

  return (
    <div className="">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col px-2">
          <h1 className="text-3xl font-bold">Products</h1>
          <p className='text-gray-500 mt-2'><Link href={`/admin/dashboard`}>Dashboard</Link> <span className='ml-2.5'>{`>`}</span><span className='text-black ml-2.5'>Products</span> </p>
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Search Product"
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value.trim())}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IoSearchSharp size={20} />
                </InputAdornment>
              ),
            }}
          />
          <button className="px-3 font-bold py-2 bg-amber-300 ml-5 w-auto h-13 cursor-pointer" onClick={handleAddProduct}>Add Product</button>
          <button
            className="px-2 py-3 bg-green-700 ml-1 w-20 font-bold cursor-pointer"
            onClick={() => setExportData()}
          >
            Export
          </button>
        </div>
      </div>

      <div>
        <table className="min-w-full bg-white shadow-md overflow-hidden mt-5">
          <thead>
            <tr>
              <th className="py-4 px-7 text-left text-md font-semibold text-black">Image</th>
              <th className="px-2 py-4 text-left text-md font-semibold text-black">
                <div className='flex items-center'>
                  Product Name
                  <Image src={assets.sort} alt="sort" height={13} width={13} className="ml-1" onClick={() => handleSortItems("Product_Name")} />
                </div>
              </th>
              <th className="px-2 py-4 text-left text-md font-semibold text-black">
                <div className='flex items-center'>
                  Category
                  <Image src={assets.sort} alt="sort" height={13} width={13} className="ml-1" onClick={() => handleSortItems("Category_Name")} />
                </div>
              </th>
              <th className="px-4 py-4 text-left text-md font-semibold text-black">Description</th>
              <th className="px-2 py-4 text-left text-md font-semibold text-black">Variation</th>
              <th className="py-2 px-4 text-left text-md font-semibold text-black">
                <div className='flex items-center'>
                  Price
                  <Image src={assets.sort} alt="sort" height={13} width={13} className="ml-1" onClick={() => handleSortItems("Price")} />
                </div>
              </th>
              <th className="py-2 px-4 text-left text-md font-semibold text-black">Stock</th>
              <th className="py-2 px-4 text-left text-md font-semibold text-black">Action</th>
            </tr>
          </thead>
          <tbody className="">
            {adds
              .filter((item) => input === "" || item.Product_Name.toLowerCase().includes(input.toLowerCase()))
              .map((curval, index) => {
                const { Product_Name, Description, Price, Stock_Status, Variation, Category_Name, Product_var_id } = curval;
                return (
                  <tr key={index} className=''>
                    <td className='px-5 py-2'>
                      {curval.Image && (
                        <Zoom>
                          <Image
                            src={curval.Image}
                            alt={Product_Name}
                            width={50}
                            height={50}
                            className="object-cover h-[50px] w-[70px]"
                          />
                        </Zoom>
                      )}
                    </td>
                    <td className='px-3 py-2'>{Product_Name}</td>
                    <td className='px-3 py-2'>{Category_Name}</td>
                    <td className='px-3 py-2'>{Description}</td>
                    <td className='px-3 py-2'>{Variation}</td>
                    <td className='px-4 py-2'>{Price}</td>
                    <td onClick={() => handleStatusChange(Product_var_id, Stock_Status)} className='px-3.5 py-2 cursor-pointer'>
                      <div>
                        {Stock_Status === 1 ? (
                          <Image src={assets.scrollon} alt='In-Stock' />
                        ) : (
                          <Image src={assets.scrolloff} alt='Out-of-Stock' />
                        )}
                      </div>
                    </td>
                    <td>
                      <button onClick={() => handleProductEdit(Product_var_id)} className='ml-4 text-gray-500'> <Link href={`/admin/products/${Product_var_id}`}><MdEdit /></Link></button>
                      <button onClick={() => handleIdDelete(Product_var_id)} className='ml-3 text-gray-500 cursor-pointer'><RiDeleteBin5Fill /></button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="flex justify-end bottom-0 mt-5 h-[20px] items-center">
          <Stack spacing={2}>
            <Pagination variant='outlined' shape='rounded'
              count={count}
              page={page}
              onChange={(e, page) => setPage(page)}
              hideNextButton={!!input}
              hidePrevButton={!!input}
            />
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default Products;

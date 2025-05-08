'use client';
import { Dialog, DialogActions, DialogContent, InputAdornment, Pagination, Stack, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import Image from 'next/image';
import commonGetApis, { commonPostApis, deleteApi } from '@/commonapi/Commonapi';
import { assets } from '@/assests/assets';
import Link from 'next/link';
import { AxiosError } from 'axios';
import { IoSearchSharp } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import orderBy from 'lodash/orderBy';

interface Category {
  No: number;
  Image: string;
  Category_Name: string;
  Status: number;
  Brand_Name: string;
  SubCategory_Name: string;
  Category_name: string;
  SubCategory_name: string;
}

interface SUBCATEGORY {
  No: number;
  SubCategory_Name: string;
  Category_Name: string;
  SubCategory_name: string;
}

const Brand = () => {
  const [input, setInput] = useState<string>('');
  const [adds, setAdds] = useState<Category[]>([]);
  const [addSub, setAddSub] = useState(false);
  const [brand, setBrand] = useState<Category[]>([]);
  const [subCategory, setSubCategory] = useState<SUBCATEGORY[]>([]);
  const [brandId, setBrandId] = useState<Category | null>(null);
  const [toggleBrand, setToggleBrand] = useState(false)
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState("");
  const [sortField, setSortField] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [inputs, setInputs] = useState<{
    brand: string;
    category: string;
    subcategory: string;
    No: number | null;
    status: string;
  }>({
    brand: '',
    category: '',
    subcategory: '',
    No: null,
    status: '1',
  });

  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();
  useEffect(() => {
    const refreshToken = localStorage.getItem("usertoken");
    if (!refreshToken) {
      router.replace('/');
    }
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await commonGetApis(`get_brands?pageNumber=${page}&pageLimit=10&search=${input}`);
      setAdds(res?.data?.result || []);
      setTotalCount(res?.data?.Total_Count);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  const handleDelete = async (No: number) => {
    try {
      await deleteApi(`delete_brand?id=${No}`);
      setAdds((prev) => prev.filter((items) => items.No !== No));
      toast.success("Deleted Successfully")
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async (No: number) => {
    try {
      const res = await commonGetApis(`get_brand?id=${No}`);
      const data = res.data.DATA;
      if (data) {
        setBrandId(data);
        setInputs({
          brand: data.Brand_Name,
          category: String(data.fk_category_id),
          subcategory: String(data.fk_subcategory_id),
          No: data.No,
          status: String(data.Status),
        });
        setToggleBrand(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append('brand_name', inputs.brand);
    formdata.append('fk_category_id', inputs.category);
    formdata.append('fk_subcategory_id', inputs.subcategory);
    formdata.append('status', inputs.status);

    if (image) formdata.append('image', image);

    if (inputs.No) {
      formdata.append('id', String(inputs.No));
    }
    try {
      const res = await commonPostApis('add_brand', formdata);
      if (res.data) {
        toast.success("Added")
      }
      else {
        toast.error("Unsuccessfull")
      }
      setAddSub(false);
      setToggleBrand(false);
      setInputs({
        brand: '',
        category: '',
        subcategory: '',
        No: null,
        status: '1',
      });
      setImage(null);
      fetchCategories();
    } catch (error) {
      console.error('Error submitting brand:', error);
      toast.error('Something went wrong.');
    }
  };


  const handleBrandPost = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };
  const fetchGetCategory = async () => {
    try {
      const res = await commonGetApis('getcategories?pageNumber=1&pageLimit=10');
      setBrand(res.data.result || []);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSubCategories = async () => {
    try {
      const res = await commonGetApis('get_subcategories?pageNumber=1&pageLimit=10');
      setSubCategory(res?.data?.result || []);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };
  const handleStatusChange = async (id: number, currentStatus: number) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    const formData = new URLSearchParams();
    formData.append('id', String(id));
    formData.append('status', String(newStatus));
    try {
      const res = await commonPostApis('status_change3', formData);

      if (res.data) {
        toast.success('Status updated successfully');
        fetchCategories();
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Full Error:', axiosError);
      if (axiosError.response) {
        console.error('Response Error:', axiosError.response);
        console.error('Response Data:', axiosError.response.data);
      }
    }
  }

  const setExportData = () => {
    if (!adds.length) {
      toast.warning("No data to export");
      return;
    }

    const headers = ["No", "Brand_Name", "Category_Name", "SubCategory_Name", "Status"];
    const rows = adds.map(item => [
      item.No,
      item.Brand_Name,
      item.Category_Name,
      item.SubCategory_Name,
      item.Status === 1 ? "Active" : "Inactive"
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

  const handleSortItems = (field: keyof Category) => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    const sortedData = orderBy([...adds], [field], [newOrder]);
    setAdds(sortedData);
    setSortField(field);
    setSortOrder(newOrder);
    toast.info(`${newOrder.toLocaleUpperCase()}ENDING ORDER`, {
      position: "top-center",
      autoClose: 2000,
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
    fetchGetCategory();
    fetchSubCategories();
    document.title = "Admin Brands"
  }, [input, page]);

  const count = Math.ceil(Number(totalCount) / 10)
  return (
    <div className="">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col px-2">
          <h1 className="text-3xl font-bold">Brands</h1>
          <p className='text-gray-500 mt-2'><Link href={`/admin/dashboard`}>Dashboard</Link> <span className='ml-2.5'>{`>`}</span><span className='text-black ml-2.5'>Brands</span> </p>
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Search User"
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
          <button
            className="px-2 py-2 bg-amber-300 ml-5 w-30 h-12 font-bold cursor-pointer"
            onClick={() => setAddSub(true)}
          >
            Add Brand
          </button>
          <button
            className="px-2 py-2 bg-green-700 ml-1 w-20 h-12 font-bold cursor-pointer"
            onClick={() => setExportData()}
          >
            Export
          </button>
        </div>
      </div>
      <div>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mt-5">
          <thead>
            <tr>
              <th className="px-7 py-4 text-left text-md font-semibold text-black">
                <div className='flex items-center'>
                  No.
                  <Image src={assets.sort} alt="sort" height={13} width={13} className="ml-1" onClick={() => handleSortItems("No")} />
                </div>
              </th>
              <th className="py-4 px-2 text-left text-md font-semibold text-black">Image</th>
              <th className="py-4 px-2 text-left text-md font-semibold text-black">
                <div className="flex items-center cursor-pointer" onClick={() => handleSortItems('Brand_Name')}>
                  Name
                  <Image src={assets.sort} alt="sort" height={13} width={13} className="ml-1" />
                </div>
              </th>
              <th className="py-4 px-2 text-left text-md font-semibold text-black">
                <div className="flex items-center cursor-pointer" onClick={() => handleSortItems('Category_Name')}>
                  Category
                  <Image src={assets.sort} alt="sort" height={13} width={13} className="ml-1" />
                </div>
              </th>
              <th className="py-4 px-2 text-left text-md font-semibold text-black">
                <div className='flex items-center'>
                  Sub-Category
                  <Image src={assets.sort} alt="sort" height={13} width={13} className="ml-1" onClick={() => handleSortItems('SubCategory_Name')} />
                </div>
              </th>
              <th className="py-4 px-2 text-left text-md font-semibold text-black">Status</th>
              <th className="py-4 px-2 text-left text-md font-semibold text-black">Action</th>
            </tr>
          </thead>
          <tbody>
            {adds
              .filter(
                (item) =>
                  input === '' ||
                  item.Brand_Name.toLowerCase().includes(input.toLowerCase())
              )
              .map((curval) => {
                const { No, Image: img, Category_Name, Status, Brand_Name, SubCategory_Name, } = curval;
                return (
                  <tr key={No}>
                    <td className="px-7 py-2">{No}</td>
                    <td className='px-1 py-2'>
                      <Image
                        src={img}
                        alt={Category_Name}
                        width={56}
                        height={52}
                        className="object-cover w-14 h-13 rounded-md"
                        unoptimized
                      />
                    </td>
                    <td className="px-2 py-2">{Brand_Name}</td>
                    <td className="px-2 py-2">{Category_Name}</td>
                    <td className="px-2 py-2">{SubCategory_Name}</td>
                    <td
                      className="cursor-pointer px-2"
                      onClick={() => handleStatusChange(No, Status)}
                    >
                      {Status === 1 ? (
                        <span title="Click to deactivate">
                          <Image src={assets.scrollon} alt="Active" />
                        </span>
                      ) : (
                        <span title="Click to activate">
                          <Image src={assets.scrolloff} alt="Inactive" />
                        </span>
                      )}
                    </td>
                    <td>
                      <button
                        className="ml-2 text-gray-600 rounded cursor-pointer"
                        onClick={() => handleEdit(No)}
                      >
                        <MdEdit size={18} />
                      </button>
                      <button
                        className="ml-5 text-gray-600 rounded cursor-pointer"
                        onClick={() => handleDelete(No)}
                      >
                        <RiDeleteBin5Fill size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        <div className="flex justify-end mt-4">
          <Stack spacing={2}>
            <Pagination count={count} page={page} onChange={(e, page) => setPage(page)} variant="outlined" shape="rounded"
              hideNextButton={!!input}
              hidePrevButton={!!input}
            />
          </Stack>
        </div>
      </div>

      <Dialog open={addSub} onClose={() => setAddSub(false)}>
        <DialogContent>
          <form
            onSubmit={handleSubmit}
            className="bg-white z-[1] flex flex-col px-5"
          >
            <button
              className="text-gray-500 text-2xl flex justify-end hover:text-red-700"
              onClick={() => setAddSub(false)}
            >
              X
            </button>
            <h1 className="text-2xl ml-25">Add Brand</h1>


            <div className="flex flex-col mt-10">
              <label className="py-2 text-gray-400">Brand Name</label>
              <input
                type="text"
                name="brand"
                onChange={handleBrandPost}
                value={inputs.brand}
                placeholder="Brand Name"
                required
                className="border border-gray-200 px-2.5 py-2 w-full"
              />
            </div>

            <div className="flex flex-col mt-5">
              <label className="text-gray-400">Category</label>
              <select
                name="category"
                value={inputs.category}
                onChange={handleBrandPost}
                className="border border-gray-200 w-full py-2 px-2"
              >
                <option value="">Select</option>
                {brand.map((curval) => (
                  <option key={curval.No} value={curval.No}>
                    {curval.Category_Name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col mt-5">
              <label className="text-gray-400">Sub-Category</label>
              <select
                name="subcategory"
                value={inputs.subcategory}
                onChange={handleBrandPost}
                className="border border-gray-200 w-full py-2 px-2.5"
              >
                <option value="">Select</option>
                {subCategory.map((curval) => (
                  <option key={curval.No} value={curval.No}>
                    {curval.SubCategory_Name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-row justify-between mt-5">
              <label className="text-gray-400">Status</label>
              <div
                className="cursor-pointer w-fit"
                onClick={() =>
                  setInputs((prev) => ({
                    ...prev,
                    status: prev.status === "1" ? "0" : "1",
                  }))
                }
              >
                <Image
                  src={inputs.status === "1" ? assets.scrollon : assets.scrolloff}
                  alt="Status"
                  width={42}
                  height={42}
                />
              </div>
            </div>

            <div className="flex flex-row mt-7">
              <label htmlFor="thumbnail" className="cursor-pointer">
                <div className="w-[325px] h-[125px] flex items-center justify-center bg-gray-100 rounded-lg border-2 border-gray-300 hover:border-gray-500 hover:shadow-lg">
                  <Image
                    src={image ? URL.createObjectURL(image) : assets.upimg}
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
                onChange={(e) =>
                  setImage(e.target.files ? e.target.files[0] : null)
                }
              />
            </div>

            <DialogActions>
              <button type="submit" className="bg-amber-300 w-xs h-12 mb-8">
                Save
              </button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={toggleBrand} onClose={() => setToggleBrand(false)}>
        <DialogContent>
          {brandId && (
            <form
              onSubmit={handleSubmit}
              className="bg-white z-[1] flex flex-col px-5"
            >
              <h1 className="text-2xl ml-20 mt-3">Add Brand</h1>
              <button
                className="text-gray-500 h-9 mt-1 text-2xl flex justify-end"
                onClick={() => setToggleBrand(false)}
              >
                X
              </button>

              <div className="flex flex-col mt-10">
                <label className="py-2 text-gray-400">Brand Name</label>
                <input
                  type="text"
                  name="brand"
                  onChange={handleBrandPost}
                  value={inputs.brand}
                  placeholder={brandId.Brand_Name}
                  required
                  className="border border-gray-200 px-2.5 py-2 w-full"
                />
              </div>

              <div className="flex flex-col mt-5">
                <label className="text-gray-400">Category</label>
                <select
                  name="category"
                  value={inputs.category}
                  onChange={handleBrandPost}
                  className="border border-gray-200 w-full py-2 px-2"
                >
                  <option value="">{brandId.Category_name}</option>
                  {brand.map((curval) => (
                    <option key={curval.No} value={curval.No}>
                      {curval.Category_Name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col mt-5">
                <label className="text-gray-400">Sub-Category</label>
                <select
                  name="subcategory"
                  value={inputs.subcategory}
                  onChange={handleBrandPost}
                  className="border border-gray-200 w-full py-2 px-2.5"
                >
                  <option value="">{brandId.SubCategory_name}</option>
                  {subCategory.map((curval) => (
                    <option key={curval.No} value={curval.No}>
                      {curval.SubCategory_Name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-row justify-between mt-5">
                <label className="text-gray-400">Status</label>
                <div
                  className="cursor-pointer w-fit"
                  onClick={() =>
                    setInputs((prev) => ({
                      ...prev,
                      status: prev.status === "1" ? "0" : "1",
                    }))
                  }
                >
                  <Image
                    src={inputs.status === "1" ? assets.scrollon : assets.scrolloff}
                    alt="Status"
                    width={42}
                    height={42}
                  />
                </div>
              </div>

              <div className="flex flex-row mt-7">
                <label htmlFor="thumbnail" className="cursor-pointer">
                  <div className="w-[325px] h-[125px] flex items-center justify-center bg-gray-100 rounded-lg border-2 border-gray-300 hover:border-gray-500 hover:shadow-lg">
                    <Image
                      src={image ? URL.createObjectURL(image) : brandId?.Image || '/placeholder.png'}
                      alt="Upload Thumbnail"
                      width={110}
                      height={100}
                      className="object-cover rounded-lg"
                      unoptimized
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

              <DialogActions>
                <button type="submit" className="bg-amber-300 w-xs h-12 mb-8">
                  Save
                </button>
              </DialogActions>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Brand;

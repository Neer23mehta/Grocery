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
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { useFormik } from 'formik';
import * as Yup from 'yup';
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
  const fetchCategories = async () => {
    try {
      const res = await commonGetApis(`get_brands?pageNumber=${page}&pageLimit=10&search=${input}`);
      setAdds(res?.data?.result || []);
      setTotalCount(res?.data?.totalCount);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  const handleDelete = async (No: number) => {
    try {
      const res = await deleteApi(`delete_brand?id=${No}`);
      setAdds((prev) => prev.filter((items) => items.No !== No));
      toast.success(`${res.data.message}`)
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async (No: number) => {
    setToggleBrand(true);
    try {
      const res = await commonGetApis(`get_brand?id=${No}`);
      const data = res.data.data;
      if (data) {
        setBrandId(data);
        setInputs({
          brand: data.Brand_Name,
          category: String(data.fk_category_id),
          subcategory: String(data.fk_subcategory_id),
          No: data.No,
          status: String(data.Status),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('brandName', inputs.brand);
    formdata.append('fkCategoryId', inputs.category);
    formdata.append('fkSubcategoryId', inputs.subcategory);
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
      "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
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
  const formik = useFormik({
    initialValues: {
      brand: '',
      category: '',
      subcategory: '',
      image: null,
      status: '1',
    },
    validationSchema: Yup.object({
      brand: Yup.string().required('Brand Name is required'),
      category: Yup.string().required('Category is required'),
      subcategory: Yup.string().required('Sub-Category is required'),
      image: Yup.mixed().required('Thumbnail is required'),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const formdata = new FormData();
      formdata.append('brandName', values.brand);
      formdata.append('fkCategoryId', values.category);
      formdata.append('fkSubcategoryId', values.subcategory);
      formdata.append('status', values.status);
      if (values.image) {
        formdata.append("image", values.image);
      }
      try {
        const res = await commonPostApis("add_brand", formdata);
        if (res.data) {
          toast.success(`${res.data.message}`);
          resetForm();
          setAddSub(false);
          setToggleBrand(false);
          fetchCategories();
        } else {
          toast.error(`${res.data.message}`);
        }
      } catch (error) {
        console.error("Error submitting subcategory:", error);
        toast.error(`${error}`);
      } finally {
        setSubmitting(false);
      }
    },
  });
  useEffect(() => {
    fetchCategories();
    fetchGetCategory();
    fetchSubCategories();
  }, [input, page]);
  const count = Math.ceil(Number(totalCount) / 10)
  return (
    <div className="">
      <div className="flex md:flex-row flex-col md:justify-between md:items-center">
        <div className="flex flex-col px-2">
          <h1 className="text-3xl font-bold">Brands</h1>
          <p className='text-gray-500 mt-2'><Link href={`/admin/dashboard`}>Dashboard</Link> <span className='ml-2.5'>{`>`}</span><span className='text-black ml-2.5'>Brands</span> </p>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className='flex flex-row px-2 py-3 text-md border border-gray-300 bg-white items-center'>
            <IoSearchSharp size={20} />
            <input type='text' placeholder=' Search Brands...' value={input} onChange={(e) => setInput(e.target.value.trim())} className='outline-none px-2 w-full text-xs md:text-[18px]' />
          </div>
          <button
            className="px-2 py-2 bg-amber-300 ml-5 w-30 h-12 text-xs md:text-[17px] font-bold cursor-pointer"
            onClick={() => setAddSub(true)}>
            Add Brand
          </button>
          <button
            className="px-2 py-2 bg-green-700 ml-1 w-20 h-12 text-xs md:text-[17px] font-bold cursor-pointer"
            onClick={() => setExportData()}>
            Export
          </button>
        </div>
      </div>
      <div>
        <div className="w-full overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg mt-5">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm md:text-md font-semibold text-black whitespace-nowrap">
                  <div className='flex items-center'>
                    No.
                    <Image src={assets.sort} alt="sort" height={13} width={13} className="ml-1 cursor-pointer" onClick={() => handleSortItems("No")} />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm md:text-md font-semibold text-black whitespace-nowrap">Image</th>
                <th className="px-4 py-3 text-left text-sm md:text-md font-semibold text-black whitespace-nowrap">
                  <div className="flex items-center cursor-pointer" onClick={() => handleSortItems('Brand_Name')}>
                    Name
                    <Image src={assets.sort} alt="sort" height={13} width={13} className="ml-1" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm md:text-md font-semibold text-black whitespace-nowrap">
                  <div className="flex items-center cursor-pointer" onClick={() => handleSortItems('Category_Name')}>
                    Category
                    <Image src={assets.sort} alt="sort" height={13} width={13} className="ml-1" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm md:text-md font-semibold text-black whitespace-nowrap">
                  <div className='flex items-center cursor-pointer' onClick={() => handleSortItems('SubCategory_Name')}>
                    Sub-Category
                    <Image src={assets.sort} alt="sort" height={13} width={13} className="ml-1" />
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm md:text-md font-semibold text-black whitespace-nowrap">Status</th>
                <th className="px-4 py-3 text-left text-sm md:text-md font-semibold text-black whitespace-nowrap">Action</th>
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
                  const { No, Image: img, Category_Name, Status, Brand_Name, SubCategory_Name } = curval;
                  return (
                    <tr key={No} className="border-b border-gray-50">
                      <td className="px-4 py-3 text-sm whitespace-nowrap">{No}</td>
                      <td className="px-4 py-3">
                        <Zoom>
                          <Image
                            src={img}
                            alt={Category_Name}
                            width={56}
                            height={52}
                            className="object-cover w-14 h-13 rounded-md"
                            unoptimized />
                        </Zoom>
                      </td>
                      <td className="px-4 py-3 text-sm whitespace-nowrap">{Brand_Name}</td>
                      <td className="px-4 py-3 text-sm whitespace-nowrap">{Category_Name}</td>
                      <td className="px-4 py-3 text-sm whitespace-nowrap">{SubCategory_Name}</td>
                      <td className="px-4 py-3 text-sm whitespace-nowrap cursor-pointer" onClick={() => handleStatusChange(No, Status)}>
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
                      <td className="px-4 py-3 text-sm whitespace-nowrap">
                        <button
                          className="mr-3 text-gray-600 rounded cursor-pointer"
                          onClick={() => handleEdit(No)}>
                          <MdEdit size={18} />
                        </button>
                        <button
                          className="text-gray-600 rounded cursor-pointer"
                          onClick={() => handleDelete(No)}>
                          <RiDeleteBin5Fill size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        {adds.length === 0 && (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">No Brands found</p>
          </div>
        )}
        <div className="flex justify-end mt-4">
          <Stack spacing={2}>
            <Pagination count={count} page={page} onChange={(e, page) => setPage(page)} variant="outlined" shape="rounded"
              hideNextButton={!!input}
              hidePrevButton={!!input} />
          </Stack>
        </div>
      </div>
      <Dialog open={addSub} onClose={() => setAddSub(false)}>
        <DialogContent>
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white z-[1] flex flex-col px-5 w-full max-w-md mx-auto">
            <button
              type="button"
              className="text-gray-500 text-2xl flex justify-end hover:text-red-700 self-end"
              onClick={() => setAddSub(false)}>
              X
            </button>
            <h1 className="text-2xl text-center">Add Brand</h1>
            <div className="flex flex-col mt-10">
              <label className="py-2 text-gray-400">Brand Name</label>
              <input
                type="text"
                name="brand"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.brand}
                placeholder="Brand Name"
                className="border border-gray-200 px-2.5 py-2 w-full" />
              {formik.touched.brand && formik.errors.brand && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.brand}</div>
              )}
            </div>
            <div className="flex flex-col mt-5">
              <label className="text-gray-400">Category</label>
              <select
                name="category"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border border-gray-200 w-full py-2 px-2">
                <option value="">Select</option>
                {brand.map((curval) => (
                  <option key={curval.No} value={curval.No}>
                    {curval.Category_Name}
                  </option>
                ))}
              </select>
              {formik.touched.category && formik.errors.category && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.category}</div>
              )}
            </div>
            <div className="flex flex-col mt-5">
              <label className="text-gray-400">Sub-Category</label>
              <select
                name="subcategory"
                value={formik.values.subcategory}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="border border-gray-200 w-full py-2 px-2.5">
                <option value="">Select</option>
                {subCategory.map((curval) => (
                  <option key={curval.No} value={curval.No}>
                    {curval.SubCategory_Name}
                  </option>
                ))}
              </select>
              {formik.touched.subcategory && formik.errors.subcategory && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.subcategory}</div>
              )}
            </div>
            <div className="flex flex-row justify-between items-center mt-5">
              <label className="text-gray-400">Status</label>
              <div
                className="cursor-pointer w-fit"
                onClick={() =>
                  formik.setFieldValue('status', formik.values.status === '1' ? '0' : '1')
                }>
                <Image
                  src={formik.values.status === "1" ? assets.scrollon : assets.scrolloff}
                  alt="Status"
                  width={42}
                  height={42} />
              </div>
            </div>
            <div className="flex flex-col mt-7">
              <label htmlFor="thumbnail" className="cursor-pointer">
                <div className="w-full sm:w-[355px] h-[125px] bg-gray-100 rounded-lg border-2 border-gray-300 flex items-center flex-col justify-center mx-auto">
                  <Image
                    src={formik.values.image ? URL.createObjectURL(formik.values.image) : assets.upimg}
                    alt="Upload"
                    width={210}
                    height={150} />
                  <input
                    type="file"
                    id="thumbnail"
                    className="hidden"
                    onChange={(e) => formik.setFieldValue('image', e.currentTarget.files?.[0] || null)} />
                </div>
              </label>
              {formik.touched.image && formik.errors.image && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.image}</div>
              )}
            </div>
            <button
              type="submit"
              className="bg-amber-300 w-full h-12 mt-3 font-bold text-xl mb-8">
              Save
            </button>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={toggleBrand} onClose={() => setToggleBrand(false)}>
        <DialogContent>
          {brandId && (
            <form
              onSubmit={handleSubmit}
              className="bg-white z-[1] flex flex-col px-5 w-full max-w-md mx-auto">
              <div className="flex justify-between items-center mt-3">
                <h1 className="text-2xl">Add Brand</h1>
                <button
                  type="button"
                  className="text-gray-500 text-2xl hover:text-red-700"
                  onClick={() => setToggleBrand(false)}>
                  X
                </button>
              </div>
              <div className="flex flex-col mt-10">
                <label className="py-2 text-gray-400">Brand Name</label>
                <input
                  type="text"
                  name="brand"
                  onChange={handleBrandPost}
                  value={inputs.brand}
                  placeholder={brandId.Brand_Name}
                  required
                  className="border border-gray-200 px-2.5 py-2 w-full" />
              </div>
              <div className="flex flex-col mt-5">
                <label className="text-gray-400">Category</label>
                <select
                  name="category"
                  value={inputs.category}
                  onChange={handleBrandPost}
                  className="border border-gray-200 w-full py-2 px-2">
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
                  className="border border-gray-200 w-full py-2 px-2.5">
                  <option value="">{brandId.SubCategory_name}</option>
                  {subCategory.map((curval) => (
                    <option key={curval.No} value={curval.No}>
                      {curval.SubCategory_Name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-row justify-between items-center mt-5">
                <label className="text-gray-400">Status</label>
                <div
                  className="cursor-pointer w-fit"
                  onClick={() =>
                    setInputs((prev) => ({
                      ...prev,
                      status: prev.status === "1" ? "0" : "1",
                    }))
                  }>
                  <Image
                    src={inputs.status === "1" ? assets.scrollon : assets.scrolloff}
                    alt="Status"
                    width={42}
                    height={42} />
                </div>
              </div>
              <div className="flex flex-col items-center mt-7">
                <label htmlFor="thumbnail" className="cursor-pointer w-full sm:w-[325px]">
                  <div className="h-[125px] flex items-center justify-center bg-gray-100 rounded-lg border-2 border-gray-300 hover:border-gray-500 hover:shadow-lg">
                    <Image
                      src={
                        image
                          ? URL.createObjectURL(image)
                          : brandId?.Image || '/placeholder.png'
                      }
                      alt="Upload Thumbnail"
                      width={110}
                      height={100}
                      className="object-cover rounded-lg"
                      unoptimized />
                  </div>
                </label>
                <input
                  type="file"
                  id="thumbnail"
                  className="hidden"
                  onChange={(e) =>
                    setImage(e.target.files ? e.target.files[0] : null)
                  } />
              </div>
              <button
                type="submit"
                className="bg-amber-300 w-full h-12 mt-5 font-bold text-lg mb-8">
                Save
              </button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default Brand;



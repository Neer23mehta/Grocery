'use client'
import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, Pagination, Stack, useMediaQuery, Theme } from '@mui/material';
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import Image from 'next/image';
import { toast } from 'react-toastify';
import commonGetApis, { commonPostApis, deleteApi } from '@/commonapi/Commonapi';
import { assets } from '@/assests/assets';
import Link from 'next/link';
import { IoSearchSharp } from "react-icons/io5";
import { useRouter } from 'next/navigation';
import orderBy from 'lodash/orderBy';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
interface Category {
  Category_Name: string;
  Image: string;
  No: number;
  Status: number;
}
interface Categoryid {
  category: string;
  id: number;
  image: string;
  status: number;
}
const Category = () => {
  const [input, setInput] = useState<string>('');
  const [adds, setAdds] = useState<Category[]>([]);
  const [addCategory, setAddCategory] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [categoryId, setCategoryId] = useState<Categoryid | null>(null);
  const [toggleCategory, setToggleCategory] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [inputss, setInputss] = useState({ category: "", status: "1" });
  const [inputs, setInputs] = useState({ category: "", status: "1" });
  const [sortField, setSortField] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const router = useRouter();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.between('sm', 'md'));
  const fetchCategories = async (searchText: string = '') => {
    try {
      const res = await commonGetApis(`getcategories?pageNumber=${page}&pageLimit=10&search=${input}`);
      setTotalCount(res?.data?.totalCount);
      setAdds(res?.data?.result || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  const handleIdDataSubmit = async (e: React.FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("id", String(id));
    formdata.append("categoryName", inputss.category);
    formdata.append("status", inputss.status);
    if (image) formdata.append("image", image);
    try {
      const res = await commonPostApis("addcategory", formdata);
      if (res.data) {
        toast.success(`${res.data.message}`);
        fetchCategories();
        setToggleCategory(false);
        setImage(null);
        setInputss({ category: "", status: "1" });
      } else {
        toast.error(`${res.data.message}`);
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Something went wrong");
    }
  };
  const handleDelete = async (id: number) => {
    try {
      const res = await deleteApi(`deletecategory?id=${id}`);
      setAdds(prev => prev.filter(item => item.No !== id));
      setTimeout(() => {
        toast.success(`${res.data.message}`);
      }, 5000);
    } catch (error) {
      console.error(error);
      toast.error(`${error}`);
    }
  };
  const handleStatusChange = async (id: number, currentStatus: number) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    const formData = new URLSearchParams();
    formData.append("id", String(id));
    formData.append("status", String(newStatus));
    try {
      const res = await commonPostApis("status_change1", formData);
      if (res.data) {
        toast.success(`${res.data.message}`);
        fetchCategories();
      } else {
        toast.error(`${res.data.message}`);
      }
    } catch (error) {
      console.error("Status change error:", error);
      toast.error(`${error}`);
    }
  };
  const handleCategoryPosts = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputss({ ...inputss, [name]: value });
  };
  const handleEditButton = async (No: number) => {
    setToggleCategory(true);
    try {
      const res = await commonGetApis(`getcategory?id=${No}`);
      const data = res.data.data;
      if (data) {
        setCategoryId(data);
        setInputss({ category: data.category, status: String(data.status) });
      }
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };
  const setExportData = () => {
    if (!adds.length) {
      toast.warning("No data to export");
      return;
    }
    const headers = ["No", "Category_Name", "Status"];
    const rows = adds.map(item => [
      item.No,
      item.Category_Name,
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
      category: '',
      status: '1',
      image: null,
    },
    validationSchema: Yup.object({
      category: Yup.string().required('Category is required'),
      image: Yup.mixed().required('Thumbnail image is required'),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const formdata = new FormData();
      formdata.append("categoryName", values.category);
      formdata.append("status", values.status);
      if (values.image) {
        formdata.append("image", values.image);
      }
      try {
        const res = await commonPostApis("addcategory", formdata);
        if (res.data) {
          toast.success(`${res.data.message}`);
          resetForm();
          setAddCategory(false);
          fetchCategories();
        } else {
          toast.error("Failed To Add");
        }
      } catch (error) {
        console.error("Error submitting subcategory:", error);
        toast.error("Something went wrong");
      } finally {
        setSubmitting(false);
      }
    },
  });
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchCategories(input.trim());
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [input, page]);
  const count = Math.ceil(totalCount / 10);
  return (
    <div className="p-1 md:p-4 overflow-x-hidden overflow-y-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div className="flex flex-col px-2">
          <h1 className="text-2xl md:text-3xl font-bold">Category</h1>
          <p className='text-gray-500 text-sm md:text-base mt-1 md:mt-2'>
            <Link href={`/admin/dashboard`}>Dashboard</Link>
            <span className='mx-1 md:ml-2.5'>{`>`}</span>
            <span className='text-black'>Category</span>
          </p>
        </div>
        <div className="w-full md:w-auto flex flex-col md:flex-row gap-2">
          <div className='flex flex-row px-2 py-3.5 text-md border border-gray-300 bg-white items-center'>
            <IoSearchSharp size={20} />
            <input type='text' placeholder=' Search Category...' value={input} onChange={(e) => setInput(e.target.value.trim())} className='outline-none px-2' />
          </div>
          <div className="md:flex md:gap-2 flex justify-between">
            <button
              className="md:px-2 md:py-2 bg-amber-300 w-fit px-5 md:w-35 h-10 md:h-13 cursor-pointer font-bold text-sm md:text-base"
              onClick={() => setAddCategory(true)}>
              {isMobile ? 'Add' : 'Add Category'}
            </button>
            <button
              className="md:px-2 md:py-2 bg-green-700 w-fit px-5 md:w-35 h-10 md:h-13 cursor-pointer font-bold text-sm md:text-base"
              onClick={() => setExportData()}>
              {isMobile ? 'Export' : 'Export'}
            </button>
          </div>
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full bg-white shadow-md overflow-hidden mt-5">
          <thead>
            <tr className="bg-gray-50 py-2 h-15">
              <th className="px-4 py-2 text-left text-sm font-semibold text-black">
                <div className="flex items-center">
                  No.
                  <Image src={assets.sort} alt='sort' height={13} width={13} className='ml-1 cursor-pointer' onClick={() => handleSortItems("No")} />
                </div>
              </th>
              <th className="py-2 px-2 text-left text-sm font-semibold text-black">Image</th>
              <th className="py-2 px-2 text-left text-sm font-semibold text-black">
                <div className="flex items-center">
                  Category
                  <Image src={assets.sort} alt='sort' height={13} width={13} className='ml-1 cursor-pointer' onClick={() => handleSortItems("Category_Name")} />
                </div>
              </th>
              <th className="py-2 px-2 text-left text-sm font-semibold text-black">Status</th>
              <th className="py-2 px-2 text-left text-sm font-semibold text-black">Action</th>
            </tr>
          </thead>
          <tbody>
            {adds
              .filter(item => input.trim() === "" || item.Category_Name.toLowerCase().includes(input.trim().toLowerCase()))
              .map(({ No, Image: Img, Category_Name, Status }) => (
                <tr key={No} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className='px-4 py-3 text-sm'>{No}</td>
                  <td className='py-2 px-2'>
                    <Zoom>
                      <Image
                        src={Img}
                        alt={Category_Name}
                        width={56}
                        height={52}
                        className="object-cover rounded-md md:h-[60px] md:w-[60px]"
                        unoptimized />
                    </Zoom>
                  </td>
                  <td className='px-2 py-2 text-sm'>{Category_Name}</td>
                  <td
                    onClick={() => handleStatusChange(No, Status)}
                    className='px-2 py-2 cursor-pointer'>
                    <Image
                      src={Status === 1 ? assets.scrollon : assets.scrolloff}
                      alt={Status === 1 ? 'Active' : 'Inactive'}
                      width={42}
                      height={42} />
                  </td>
                  <td className="px-2 py-2">
                    <div className="flex gap-2 md:gap-4">
                      <button
                        onClick={() => handleEditButton(No)}
                        className="text-gray-600 rounded cursor-pointer"
                        aria-label="Edit">
                        <MdEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(No)}
                        className="text-gray-600 rounded cursor-pointer"
                        aria-label="Delete">
                        <RiDeleteBin5Fill size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {adds.length === 0 && (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">No categories found</p>
        </div>
      )}
      <div className="flex justify-center md:justify-end mt-5">
        <Stack spacing={2}>
          <Pagination
            variant='outlined'
            shape='rounded'
            count={count}
            page={page}
            onChange={(e, page) => setPage(page)}
            hidePrevButton={!!input}
            hideNextButton={!!input}
            size={isMobile ? "small" : "medium"} />
        </Stack>
      </div>
      <Dialog open={addCategory} onClose={() => setAddCategory(false)}>
        <DialogContent>
          <form onSubmit={formik.handleSubmit} className="flex flex-col px-3 w-full max-w-md mx-auto">
            <h1 className="text-2xl text-center">Add Category</h1>
            <input
              type="text"
              name="category"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category}
              placeholder="Category Name"
              className="border mt-5 border-gray-200 px-2.5 py-2 w-full" />
            {formik.touched.category && formik.errors.category && (
              <div className="text-red-500 text-sm p-2">{formik.errors.category}</div>
            )}
            <div className="flex flex-row justify-between items-center mt-5">
              <label className="text-gray-400">Status</label>
              <div
                className="cursor-pointer w-fit"
                onClick={() =>
                  formik.setFieldValue('status', formik.values.status === '1' ? '0' : '1')}>
                <Image
                  src={formik.values.status === '1' ? assets.scrollon : assets.scrolloff}
                  alt="Status"
                  width={42}
                  height={52} />
              </div>
            </div>
            <label htmlFor="thumbnail" className="mt-6 cursor-pointer">
              <div className="w-full sm:w-[355px] h-[125px] bg-gray-100 rounded-lg border-2 border-gray-300 flex flex-col items-center justify-center mx-auto">
                <Image
                  src={formik.values.image ? URL.createObjectURL(formik.values.image) : assets.upimg}
                  alt="Upload"
                  width={180}
                  height={155} />
                <input
                  type="file"
                  id="thumbnail"
                  className="hidden"
                  onChange={(e) => formik.setFieldValue('image', e.currentTarget.files?.[0] || null)} />
                {formik.touched.image && formik.errors.image && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.image}</div>
                )}
              </div>
            </label>
            <button type="submit" className="bg-amber-300 w-full h-12 mb-4 mt-4 font-bold text-xl">
              Save
            </button>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={toggleCategory} onClose={() => setToggleCategory(false)}>
        <DialogContent>
          {categoryId && (
            <form
              onSubmit={(e) => handleIdDataSubmit(e, categoryId.id)}
              className="flex flex-col px-3 w-full max-w-md mx-auto">
              <h1 className="text-2xl text-center">Edit Category</h1>
              <input
                type="text"
                name="category"
                onChange={handleCategoryPosts}
                value={inputss.category}
                placeholder="Category Name"
                required
                className="border mt-5 border-gray-200 px-2.5 py-2 w-full" />
              <div className="flex flex-row justify-between items-center mt-5">
                <label className="text-gray-400">Status</label>
                <div
                  className="cursor-pointer"
                  onClick={() =>
                    setInputss(prev => ({
                      ...prev,
                      status: prev.status === "1" ? "0" : "1",
                    }))
                  }>
                  <Image
                    src={inputss.status === "1" ? assets.scrollon : assets.scrolloff}
                    alt="Status"
                    width={42}
                    height={42} />
                </div>
              </div>
              <label htmlFor="thumbnail" className="mt-6 cursor-pointer">
                <div className="w-full sm:w-[355px] h-[125px] bg-gray-100 rounded-lg border-2 border-gray-300 flex items-center justify-center mx-auto">
                  <Image
                    src={image ? URL.createObjectURL(image) : categoryId.image}
                    alt="Upload"
                    width={110}
                    height={100}
                    unoptimized={!!image} />
                </div>
              </label>
              <input
                type="file"
                id="thumbnail"
                className="hidden"
                onChange={(e) => setImage(e.target.files?.[0] || null)} />
              <DialogActions className="flex justify-center">
                <button
                  type="submit"
                  className="bg-amber-300 w-full h-12 mb-4 mt-4 font-bold text-lg">
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
export default Category;
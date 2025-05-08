'use client'
import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, InputAdornment, Pagination, Stack, TextField } from '@mui/material';
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

  useEffect(() => {
    const refreshToken = localStorage.getItem("usertoken");
    if (!refreshToken) {
      router.replace('/');
    }
  }, []);

  const fetchCategories = async (searchText: string = '') => {
    try {
      const res = await commonGetApis(`getcategories?pageNumber=${page}&pageLimit=10&search=${input}`);
      setTotalCount(res?.data?.Total_Count || 0);
      setAdds(res?.data?.result || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const count = Math.ceil(totalCount / 10);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("category_name", inputs.category);
    formdata.append("status", inputs.status);
    if (image) formdata.append("image", image);

    try {
      const res = await commonPostApis("addcategory", formdata);
      if (res.data) {
        toast.success("Added Successfully");
        fetchCategories();
        setAddCategory(false);
        setInputs({ category: "", status: "1" });
        setImage(null);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleIdDataSubmit = async (e: React.FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("id", String(id));
    formdata.append("category_name", inputss.category);
    formdata.append("status", inputss.status);
    if (image) formdata.append("image", image);

    try {
      const res = await commonPostApis("addcategory", formdata);
      if (res.data) {
        toast.success("Category updated successfully");
        fetchCategories();
        setToggleCategory(false);
        setImage(null);
        setInputss({ category: "", status: "1" });
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteApi(`deletecategory?id=${id}`);
      setAdds(prev => prev.filter(item => item.No !== id));
      toast.success("Deleted Successfully");
    } catch (error) {
      console.log(error);
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
        toast.success("Status updated successfully");
        fetchCategories();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("Status change error:", error);
      toast.error("Something went wrong");
    }
  };

  const handleCategoryPost = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setInputs({ ...inputs, [name]: value });
  };

  const handleCategoryPosts = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputss({ ...inputss, [name]: value });
  };

  const handleEditButton = async (No: number) => {
    try {
      const res = await commonGetApis(`getcategory?id=${No}`);
      const data = res?.data?.DATA;
      if (data) {
        setCategoryId(data);
        setInputss({ category: data.category, status: String(data.status) });
        setToggleCategory(true);
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
    const delayDebounce = setTimeout(() => {
      fetchCategories(input.trim());
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [input, page]);

  return (
    <div className="">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col px-2">
          <h1 className="text-3xl font-bold">Category</h1>
          <p className='text-gray-500 mt-2'>
            <Link href={`/admin/dashboard`}>Dashboard</Link>
            <span className='ml-2.5'>{`>`}</span>
            <span className='text-black ml-2.5'>Category</span>
          </p>
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Search Category"
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
            className="px-2 py-2 bg-amber-300 ml-5 w-35 h-13 cursor-pointer font-bold"
            onClick={() => setAddCategory(true)}
          >
            Add Category
          </button>
          <button
            className="px-2 py-2 bg-green-700 ml-1 w-20 h-13 font-bold cursor-pointer"
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
              <th className="px-7 py-2 text-left text-md font-semibold text-black flex flex-row items-center">No.<span><Image src={assets.sort} alt='sort' height={13} width={13} className='ml-1' onClick={() => handleSortItems("No")} /></span></th>
              <th className="py-2 px-2 text-left text-md font-semibold text-black">Image</th>
              <th className="py-2 px-2 text-left text-md font-semibold text-black flex flex-row items-center">Category<span><Image src={assets.sort} alt='sort' height={13} width={13} className='ml-1' onClick={() => handleSortItems("Category_Name")} /></span></th>
              <th className="py-2 px-2 text-left text-md font-semibold text-black">Status</th>
              <th className="py-2 px-2 text-left text-md font-semibold text-black">Action</th>
            </tr>
          </thead>
          <tbody className="space-y-5">
            {
              adds
                .filter(item => input.trim() === "" || item.Category_Name.toLowerCase().includes(input.trim().toLowerCase()))
                .map(({ No, Image: Img, Category_Name, Status }) => (
                  <tr key={No}>
                    <td className='px-7 py-3'>{No}</td>
                    <td className='py-2 px-2'>
                      <Image
                        src={Img}
                        alt={Category_Name}
                        width={56}
                        height={52}
                        className="object-cover rounded-md h-[60px] w-[60px]"
                        unoptimized
                      />
                    </td>
                    <td className='px-2 py-2'>{Category_Name}</td>
                    <td
                      onClick={() => handleStatusChange(No, Status)}
                      className='px-2 py-2 cursor-pointer'
                    >
                      <Image
                        src={Status === 1 ? assets.scrollon : assets.scrolloff}
                        alt={Status === 1 ? 'Active' : 'Inactive'}
                        width={42}
                        height={42}
                      />
                    </td>
                    <td>
                      <button onClick={() => handleEditButton(No)} className="ml-2 text-gray-600 rounded cursor-pointer"><MdEdit size={18} /></button>
                      <button onClick={() => handleDelete(No)} className="ml-5 text-gray-600 rounded cursor-pointer"><RiDeleteBin5Fill size={18} /></button>
                    </td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>

      <div className="flex justify-end bottom-0 mt-5 h-[20px] items-center">
        <Stack spacing={2}>
          <Pagination variant='outlined' shape='rounded'
            count={count}
            page={page}
            onChange={(e, page) => setPage(page)}
            hidePrevButton={!!input}
            hideNextButton={!!input}
          />
        </Stack>
      </div>

      {/* ✅ Add Category Dialog */}
      <Dialog open={addCategory} onClose={() => setAddCategory(false)}>
        <DialogContent>
          <form onSubmit={handleSubmit} className='flex flex-col px-3'>
            <h1 className='text-2xl text-center'>Add Category</h1>
            <input
              type='text'
              name='category'
              onChange={handleCategoryPost}
              value={inputs.category}
              placeholder='Category Name'
              required
              className='border mt-5 border-gray-200 px-2.5 py-2 w-full'
            />
            <div className="flex flex-row justify-between px-2 mt-5">
              <label className="text-gray-400">Status</label>
              <div className="cursor-pointer" onClick={() => setInputs(prev => ({ ...prev, status: prev.status === "1" ? "0" : "1" }))}>
                <Image src={inputs.status === "1" ? assets.scrollon : assets.scrolloff} alt="Status" width={42} height={42} />
              </div>
            </div>
            <label htmlFor="thumbnail" className="mt-6 cursor-pointer">
              <div className="w-[355px] h-[125px] bg-gray-100 rounded-lg border-2 border-gray-300 flex items-center justify-center">
                <Image src={image ? URL.createObjectURL(image) : assets.upimg} alt="Upload" width={110} height={100} />
              </div>
            </label>
            <input type="file" id="thumbnail" className="hidden" onChange={(e) => setImage(e.target.files?.[0] || null)} />
            <DialogActions>
              <button type='submit' className='bg-amber-300 w-xs h-12 mb-4 mt-4'>Save</button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {/* ✅ Edit Category Dialog */}
      <Dialog open={toggleCategory} onClose={() => setToggleCategory(false)}>
        <DialogContent>
          {categoryId && (
            <form onSubmit={(e) => handleIdDataSubmit(e, categoryId.id)} className='flex flex-col px-3'>
              <h1 className='text-2xl text-center'>Edit Category</h1>
              <input
                type='text'
                name='category'
                onChange={handleCategoryPosts}
                value={inputss.category}
                placeholder='Category Name'
                required
                className='border mt-5 border-gray-200 px-2.5 py-2 w-full'
              />
              <div className="flex flex-row justify-between mt-5">
                <label className="text-gray-400">Status</label>
                <div className="cursor-pointer" onClick={() => setInputss(prev => ({ ...prev, status: prev.status === "1" ? "0" : "1" }))}>
                  <Image src={inputss.status === "1" ? assets.scrollon : assets.scrolloff} alt="Status" width={42} height={42} />
                </div>
              </div>
              <label htmlFor="thumbnail" className="mt-6 cursor-pointer">
                <div className="w-[355px] h-[125px] bg-gray-100 rounded-lg border-2 border-gray-300 flex items-center justify-center">
                  <Image src={image ? URL.createObjectURL(image) : categoryId.image} alt="Upload" width={110} height={100} unoptimized={!!image} />
                </div>
              </label>
              <input type="file" id="thumbnail" className="hidden" onChange={(e) => setImage(e.target.files?.[0] || null)} />
              <DialogActions>
                <button type='submit' className='bg-amber-300 w-xs h-12 mb-4 mt-4'>Save</button>
              </DialogActions>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Category;

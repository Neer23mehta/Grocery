'use client'
import React, { useEffect, useState } from 'react';
import { TextField, Dialog, DialogActions, DialogContent, Stack, Pagination, InputAdornment } from '@mui/material';
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
import 'react-medium-image-zoom/dist/styles.css'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface Category {
  No: number;
  Image: string;
  SubCategory_Name: string;
  Category_Name: string;
  Status: number;
  Category_name: string;
}

const Subcategory = () => {
  const [input, setInput] = useState<string>('');
  const [adds, setAdds] = useState<Category[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [brand, setBrand] = useState<Category[]>([]);
  const [editSubcategory, setEditSubcategory] = useState<Category | null>(null);
  const [editSub, setEditSub] = useState(false);
  const [status, setStatus] = useState(false);
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [totalCount, setTotalCount] = useState(0)
  const [deletes, setDeletes] = useState("");
  const [inputs, setInputs] = useState({
    subcategory: "",
    category: "",
    status: "1"
  });

  const route = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    const refreshToken = localStorage.getItem("usertoken");
    if (!refreshToken) {
      route.replace('/');
    }
  }, []);

  const fetchCategories = async () => {

    try {
      const res = await commonGetApis(`get_subcategories?pageNumber=${page}&pageLimit=10&search=${input}`);
      setTotalCount(res?.data?.totalCount);
      setAdds(res?.data?.result || []);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const handleSubCategoryDelete = async (id: number) => {
    try {
      const res = await deleteApi(`delete_subcategory?id=${id}`);
      setAdds(prev => prev.filter(items => items.No !== id));
      if (res.data) {
        toast.success(`${res.data.message}`)
      }
    } catch (error) {
      console.error("Error deleting subcategory:", error);
    }
  };

  const fetchGetCategory = async () => {
    try {
      const res = await commonGetApis('getcategories?pageNumber=1&pageLimit=10');
      setBrand(res.data.result || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubCategoryChange = (
    e: React.ChangeEvent<HTMLElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    const { name, value } = target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("subcategoryName", inputs.subcategory);
    formdata.append("fkCategoryId", inputs.category);
    formdata.append('status', inputs.status);
    if (image) {
      formdata.append("image", image);
    }

    try {
      const res = await commonPostApis("add_subCategory", formdata);
      if (res.data) {
        toast.success("Successfully Added");
      } else {
        toast.error("Failed To Add");
      }

      setOpenModal(false);
      fetchCategories();
    } catch (error) {
      console.error("Error submitting subcategory:", error);
    }
  };

  const handleSubCategoryUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("subcategoryName", inputs.subcategory);
    formdata.append("fkCategoryId", inputs.category);
    formdata.append("status", inputs.status);
    formdata.append("id", String(editSubcategory?.No));

    if (image) {
      formdata.append("image", image);
    }

    try {
      const res = await commonPostApis("add_subCategory", formdata);

      if (res.data) {
        toast.success("Successfully updated subcategory");
        setEditSub(false);
        fetchCategories();
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Error updating subcategory");
    }
  };

  // const handleSubCategoryChanges = (e:any) => {
  //   const {name,value} = e.target;
  //   setInputss({...inputss,[name]:value})
  // }

  const handleStatusChange = async (id: number, currentStatus: number) => {
    const newStatus = currentStatus === 1 ? 0 : 1;

    const formData = new URLSearchParams();
    formData.append("id", String(id));
    formData.append("status", String(newStatus));

    try {
      const res = await commonPostApis("status_change2", formData,);
      if (res.data) {
        toast.success("Status updated successfully");
        fetchCategories();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const handleEditButton = async (No: number) => {
    setEditSub(true);
    try {
      const res = await commonGetApis(`get_subcategory?id=${No}`);
      setEditSubcategory(res.data.data);
      setInputs({
        subcategory: res.data.DATA.SubCategory_Name,
        category: String(res.data.DATA.fk_category_id),
        status: String(res.data.DATA.Status),
      });
      if (res.data) {
        // setEditSub(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(editSubcategory)
  const toggleStatus = () => {
    setStatus(!status)
  }
  const setExportData = () => {
    if (!adds.length) {
      toast.warning("No data to export");
      return;
    }

    const headers = ["No", "Category_Name", "Status", " SubCategory_Name"];
    const rows = adds.map(item => [
      item.No,
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

  // const {data,isLoading,isError,refetch} = useQuery({
  //   queryKey: ["subcategories", page, input],
  //   queryFn: async () => {
  //     const res = await commonGetApis(`get_subcategories?pageNumber=${page}&pageLimit=10&search=${input}`);
  //     return res.data;
  //   },
  //   keepPreviousData: true,
  //   staleTime: 10000,
  // });

  // useEffect(() => {
  //   if (data?.result) {
  //     setAdds(data.result);
  //     setTotalCount(data.Total_Count);
  //   }
  // }, [data]);  

  // const addSubcategoryMutation = useMutation({
  //   mutationFn: async () => {
  //     const formdata = new FormData();
  //     formdata.append("subcategory_name", inputs.subcategory);
  //     formdata.append("fk_category_id", inputs.category);
  //     formdata.append('status', inputs.status);
  //     if (image) formdata.append("image", image);

  //     const res = await commonPostApis("add_subCategory", formdata);
  //     return res;
  //   },
  //   onSuccess: () => {
  //     toast.success("Successfully Added");
  //     setOpenModal(false);
  //     queryClient.invalidateQueries({ queryKey: ["subcategories"] });
  //   },
  //   onError: () => toast.error("Failed To Add"),
  // });  

  // const deleteMutation = useMutation({
  //   mutationFn: async (id) => {
  //     const res = await deleteApi(`delete_subcategory/${id}`);
  //     return res.data;
  //   },
  //   onSuccess:() => {
  //     toast.success("Deleted Successfully");
  //     queryClient.invalidateQueries({ queryKey: ["subcategories"] });
  //   },
  //   onError: () => {
  //     toast.error("Something went Wrong")
  //   }
  // });

  // const getByIdMutation = useMutation({
  //   mutationFn: async (id) => {
  //     const res = await commonGetApis(`get_subcategory/${id}`);
  //     return res.data;
  //   },
  //   onSuccess: (data) => {
  //     setEditSubcategory(data.DATA);
  //     setInputs({
  //       subcategory: data.DATA.SubCategory_Name,
  //       category: String(data.DATA.fk_category_id),
  //       status: String(data.DATA.Status),
  //     });
  //     setEditSub(true);
  //   },
  //   onError: (error) => {
  //     console.error("Failed to fetch subcategory", error);
  //     toast.error("Failed to fetch subcategory data");
  //   }
  // })

  // const {} = useFormik({
  //   initialValues:
  // })



  // Validation Schema
  const formik = useFormik({
    initialValues: {
      subcategory: '',
      category: '',
      status: '1',
      image: null,
    },
    validationSchema: Yup.object({
      subcategory: Yup.string().required('Sub Category is required'),
      category: Yup.string().required('Category is required'),
      image: Yup.mixed().required('Thumbnail image is required'),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const formdata = new FormData();
      formdata.append("subcategoryName", values.subcategory);
      formdata.append("fkCategoryId", values.category);
      formdata.append("status", values.status);
      if (values.image) {
        formdata.append("image", values.image);
      }

      try {
        const res = await commonPostApis("add_subCategory", formdata);
        if (res.data) {
          toast.success(`${res.data.message}`);
          resetForm();
          setOpenModal(false);
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
    fetchGetCategory();
    fetchCategories();
    document.title = "Admin Subcategory";
  }, [input, page]);

  const count = Math.ceil(Number(totalCount) / 10)
  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center items-start">
        <div className="flex flex-col md:px-2">
          <h1 className="md:text-3xl text-2xl font-bold">Sub Category</h1>
          <p className='text-gray-500 mt-2'><Link href={`/admin/dashboard`}>Dashboard</Link> <span className='ml-2.5'>{`>`}</span><span className='text-black ml-2.5'>Sub Category</span> </p>
        </div>
        <div className="flex flex-col md:mt-0 mt-2 md:flex-row justify-between items-start md:items-center">
          <div className='flex flex-row px-2 py-3 text-md border border-gray-300 bg-white items-center'>
            <IoSearchSharp size={20} />
            <input type='text' placeholder=' Search Sub Category...' value={input} onChange={(e) => setInput(e.target.value.trim())} className='outline-none px-2' />
          </div>
          <div className={`flex flex-row gap-2 w-full mt-2.5 md:mt-0 md:w-auto justify-between`}>
            <button className="px-2 py-2 bg-amber-300 font-bold md:ml-5 md:w-40 h-12 cursor-pointer" onClick={() => setOpenModal(true)}>Add Sub Category</button>
            <button
              className="px-2 py-2 bg-green-700 ml-1 w-20 h-12 font-bold cursor-pointer"
              onClick={() => setExportData()}
            >
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mt-5 text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-50">
              <th className="whitespace-nowrap px-3 sm:px-7 py-3 sm:py-4 text-left font-semibold text-black">
                <div className="flex items-center">
                  No.
                  <Image src={assets.sort} alt="sort" height={13} width={13} className="ml-1 cursor-pointer" onClick={() => handleSortItems("No")} />
                </div>
              </th>
              <th className="whitespace-nowrap py-3 sm:py-4 px-2 text-left font-semibold text-black">Image</th>
              <th className="whitespace-nowrap py-3 sm:py-4 px-2 text-left font-semibold text-black">
                <div className="flex items-center">
                  Name
                  <Image src={assets.sort} alt="sort" height={13} width={13} className="ml-1 cursor-pointer" onClick={() => handleSortItems("SubCategory_Name")} />
                </div>
              </th>
              <th className="whitespace-nowrap py-3 sm:py-4 px-2 text-left font-semibold text-black">
                <div className="flex items-center">
                  Category
                  <Image src={assets.sort} alt="sort" height={13} width={13} className="ml-1 cursor-pointer" onClick={() => handleSortItems("Category_Name")} />
                </div>
              </th>
              <th className="whitespace-nowrap py-3 sm:py-4 px-2 text-left font-semibold text-black">Status</th>
              <th className="whitespace-nowrap py-3 sm:py-4 px-2 text-left font-semibold text-black">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              adds
                .filter(item => input === "" || item.SubCategory_Name.toLowerCase().includes(input.toLowerCase()))
                .map(({ No, Image: ImgUrl, Category_Name, Status, SubCategory_Name }) => (
                  <tr key={No} className="border-t border-gray-100 hover:bg-gray-50 transition duration-150">
                    <td className="whitespace-nowrap px-3 sm:px-7 py-2">{No}</td>
                    <td className='whitespace-nowrap px-2 py-3'>
                      <Zoom>
                        <Image
                          src={ImgUrl}
                          alt={Category_Name}
                          width={56}
                          height={52}
                          className="rounded h-[52px] w-[56px] object-cover cursor-zoom-in" />
                      </Zoom>
                    </td>
                    <td className='whitespace-nowrap px-2'>{SubCategory_Name}</td>
                    <td className='whitespace-nowrap px-2'>{Category_Name}</td>
                    <td className='whitespace-nowrap px-2 py-2 cursor-pointer' onClick={() => handleStatusChange(No, Status)}>
                      {Status === 1 ? (
                        <Image src={assets.scrollon} alt='In-Stock' />
                      ) : (
                        <Image src={assets.scrolloff} alt='Out-of-Stock' />
                      )}
                    </td>
                    <td className='whitespace-nowrap px-2 py-2'>
                      <button onClick={() => handleEditButton(No)} className='mr-2 text-gray-400 hover:text-gray-600'><MdEdit size={18} /></button>
                      <button onClick={() => handleSubCategoryDelete(No)} className='text-gray-400 hover:text-gray-600'><RiDeleteBin5Fill size={18} /></button>
                    </td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col w-full max-w-md md:min-w-sm bg-white rounded-lg p-4 md:px-10 sm:p-6 mx-auto"
        >
          <div className='flex justify-end items-end'>
            <button
              type="button"
              className="text-xl md:text-2xl font-bold text-gray-600 hover:text-gray-800"
              onClick={() => setOpenModal(false)}
            >
              X
            </button>
          </div>
          <div className="flex justify-center items-center mb-7 border-b border-gray-100">
            <h1 className="font-bold text-lg sm:text-2xl mb-3">Add Sub Category</h1>
          </div>

          <div className="flex flex-col mb-4">
            <label className="text-sm text-gray-600 mb-1">Sub Category</label>
            <input
              type="text"
              name="subcategory"
              placeholder="Sub Category"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.subcategory}
              className="border border-gray-300 rounded px-3 py-2 text-sm"
            />
            {formik.touched.subcategory && formik.errors.subcategory && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.subcategory}</p>
            )}
          </div>

          <div className="flex flex-col mb-4">
            <label className="text-sm text-gray-600 mb-1">Category</label>
            <select
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border border-gray-300 rounded px-3 py-2 text-sm"
            >
              <option value="">Select</option>
              {brand.map((curval) => (
                <option key={curval.No} value={curval.No}>
                  {curval.Category_Name}
                </option>
              ))}
            </select>
            {formik.touched.category && formik.errors.category && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.category}</p>
            )}
          </div>

          <div className="flex flex-col items-center mb-4">
            <label htmlFor="thumbnail" className="cursor-pointer w-full">
              <div className="h-[125px] w-full flex items-center justify-center bg-gray-100 rounded-lg border-2 border-gray-300 hover:border-gray-500 hover:shadow-md">
                <Image
                  src={
                    formik.values.image
                      ? URL.createObjectURL(formik.values.image)
                      : assets.upimg
                  }
                  alt="Upload Thumbnail"
                  className="object-cover rounded-lg"
                  width={210}
                  height={155}
                />
              </div>
            </label>
            <input
              type="file"
              id="thumbnail"
              className="hidden"
              onChange={(e) =>
                formik.setFieldValue('image', e.currentTarget.files?.[0] || null)
              }
            />
            {formik.touched.image && formik.errors.image && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.image}</p>
            )}
          </div>

          <div className="flex items-center justify-between mb-5">
            <label className="text-sm text-gray-600">Status</label>
            <div
              className="cursor-pointer"
              onClick={() =>
                formik.setFieldValue('status', formik.values.status === '1' ? '0' : '1')
              }
            >
              <Image
                src={
                  formik.values.status === '1' ? assets.scrollon : assets.scrolloff
                }
                alt="Status"
                width={42}
                height={52}
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-amber-400 hover:bg-amber-500 text-black text-lg font-semibold py-2 rounded"
          >
            Submit
          </button>
        </form>
      </Dialog>

      <Dialog open={editSub} onClose={() => setEditSub(false)}>
        <DialogContent>
          {editSubcategory && (
            <form onSubmit={handleSubCategoryUpdate}
              className="flex flex-col w-full max-w-md md:min-w-sm bg-white rounded-lg md:p-4 space-y-5 md:px-10 sm:p-6 mx-auto"
            >
              <div className="flex justify-between items-center mb-5">
                <h1 className="text-lg sm:text-2xl ml-5 font-bold">Subcategory Details</h1>
                <button
                  type="button"
                  className="text-xl md:text-2xl  mb-10 font-bold text-gray-600 hover:text-gray-800"
                  onClick={() => setEditSub(false)}
                >
                  X
                </button>
              </div>
              <div className="w-full">
                <label htmlFor="thumbnail" className="cursor-pointer block">
                  <div className="h-[125px] w-full max-w-xs mx-auto flex items-center justify-center bg-gray-100 rounded-lg border-2 border-gray-300 hover:border-gray-500 hover:shadow-md">
                    <Image
                      src={image ? URL.createObjectURL(image) : editSubcategory.Image}
                      alt="Upload Thumbnail"
                      className="object-cover rounded-lg"
                      width={100}
                      height={50}
                    />
                  </div>
                </label>
                <input
                  type="file"
                  id="thumbnail"
                  className="hidden"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Sub Category</label>
                <input
                  type="text"
                  name="subcategory"
                  value={inputs.subcategory}
                  placeholder={editSubcategory.SubCategory_Name}
                  onChange={handleSubCategoryChange}
                  className="border border-gray-300 px-3 py-2 rounded text-sm"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-gray-600 mb-1">Category</label>
                <select
                  name="category"
                  value={inputs.category}
                  onChange={handleSubCategoryChange}
                  className="border border-gray-300 px-3 py-2 rounded text-sm"
                >
                  <option value="">{editSubcategory.Category_name}</option>
                  {brand.map((curval) => (
                    <option key={curval.No} value={curval.No}>
                      {curval.Category_Name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between items-center">
                <label className="text-sm text-gray-600">Status</label>
                <button
                  type="button"
                  onClick={toggleStatus}
                  className="focus:outline-none"
                >
                  {status ? (
                    <Image src={assets.scrollon} alt="Active" width={42} height={52} />
                  ) : (
                    <Image src={assets.scrolloff} alt="Inactive" width={42} height={52} />
                  )}
                </button>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-amber-400 hover:bg-amber-500 text-black font-bold text-md w-full py-2 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <div className="flex justify-end bottom-0 mt-5 h-[20px] items-center">
        <Stack spacing={2}>
          <Pagination variant='outlined' shape='rounded' page={page}
            onChange={(e, page) => setPage(page)}
            count={count}
            hideNextButton={!!input}
            hidePrevButton={!!input}
          />
        </Stack>
      </div>

    </div>
  );
};

export default Subcategory;

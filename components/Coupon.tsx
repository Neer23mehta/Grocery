'use client'
import React, { useEffect, useState } from 'react';
import { assets } from '@/assests/assets';
import commonGetApis, { deleteApi } from '@/commonapi/Commonapi';
import { Dialog, DialogActions, DialogContent, Pagination, Stack } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface Users {
  No: number;
  Coupon_Name: string;
  Min_Purchase: number;
  Discount_Price: number;
  Coupon_Code: string;
  Date: string;
  Status: number;
}

interface ProductFormValues {
  name: string;
  minpurchase: string;
  disprice: string;
  start_date: string;
  end_date: string;
  code: string;
}

const initialValues: ProductFormValues = {
  name: '',
  minpurchase: '',
  disprice: '',
  start_date: '',
  end_date: '',
  code: '',
};

interface Coupon {
  Coupon_Code:string;
  Coupon_Name:string;
  Date:string;
  Discount_Price:number
  Min_Purchase:number;
  No:number;
  Status:number;
}
const Coupons = () => {
  const [submit, setSubmit] = useState(false);
  const [users, setUsers] = useState<Users[]>([]);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [openCoupon, setOpenCoupon] = useState(false)
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState('')

  const fetchGet = async () => {
    try {
      const res = await commonGetApis(`get_coupons?pageNumber=${page}&pageLimit=10`);
      setTotalCount(res?.data?.Total_Count || []);
      setUsers(res.data.result || []);
    } catch (error) {
      console.log("error", error);
    }
  };

  const count = Math.ceil(Number(totalCount) / 1)

  useEffect(() => {
    fetchGet();
  }, [page]);

  const handleStatusChange = async (id: number, currentStatus: number) => {
    const token = localStorage.getItem("token");
    const refreshtoken = localStorage.getItem("usertoken");
    const newStatus = currentStatus === 1 ? 0 : 1;

    const formData = new URLSearchParams();
    formData.append("id", String(id));
    formData.append("status", String(newStatus));

    try {
      const res = await axios.post(
        "http://192.168.2.181:3000/admin/status_change4",
        formData,
        {
          headers: {
            Authorizations: token || "",
            language: "en",
            refresh_token: refreshtoken || "",
          },
        }
      );

      if (res.data) {
        toast.success("Status updated successfully");
        fetchGet();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error: any) {
      console.error("Error updating status:", error.response?.data || error.message);
      toast.error("Something went wrong");
    }
  };

  const handleCouponDelete = async (id: number) => {
    try {
      const res = await deleteApi(`delete_coupon?id=${id}`);
      if (res.data) {
        toast.success("Deleted Successfully");
        setUsers((prev) => prev.filter((item) => item.No !== id));
      } else {
        toast.error("Deletion Unsuccessful");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
  };

  const handleAddSubmit = () => setSubmit(true);
  const handleSubmitRemove = () => setSubmit(false);



  const formik = useFormik<ProductFormValues>({
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string().required("Coupon Name is required"),
      minpurchase: Yup.number().required("Minimum purchase is required"),
      disprice: Yup.number().required("Discount price is required"),
      start_date: Yup.string().required("Start date is required"),
      end_date: Yup.string().required("End date is required"),
      code: Yup.string().required("Coupon code is required"),
    }),
    onSubmit: () => { },
  });
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm
  } = formik;
  const handleCouponSubmit = async () => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("usertoken");

    const formdata = new URLSearchParams();
    formdata.append("coupon_name", formik.values.name);
    formdata.append("minimum_purchase", formik.values.minpurchase);
    formdata.append("discount_price", formik.values.disprice);
    formdata.append("start_date", formik.values.start_date);
    formdata.append("end_date", formik.values.end_date);
    formdata.append("coupon_code", formik.values.code);

    try {
      const res = await axios.post(
        "http://192.168.2.181:3000/admin/add_coupon",
        formdata,
        {
          headers: {
            Authorizations: token || "",
            language: "en",
            refresh_token: refreshToken || "",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (res.data) {
        toast.success("Coupon added successfully!");
        fetchGet();
        formik.resetForm();
        setSubmit(false);
      } else {
        toast.error("Failed to add coupon");
      }
    } catch (error) {
      console.log("Submit Error:", error);
      toast.error("Something went wrong while adding coupon");
    }
  };

  const handleEditById = async (Id:Number) => {
    try {
      const res = await commonGetApis(`get_coupon_by_id?id=${Id}`)
      if(res.data){
        setCoupon(res.data.DATA)
        setOpenCoupon(!openCoupon)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went Wrong")
    }
  }

    useEffect(() => {
              document.title = "Admin Coupon-Management";
    }, []);

  console.log("coupons",coupon)
  return (
    <div className='p-5'>
      <div className={`flex justify-between items-center ${submit ? "opacity-30" : "opacity-100"}`}>
        <div>
          <h1 className='text-3xl font-bold'>Coupon Management</h1>
          <p className='text-gray-500 mt-2'>Dashboard <span className='text-black ml-5'>Coupon Management</span></p>
        </div>
        <button onClick={handleAddSubmit} className='py-2 px-7 bg-amber-300 font-bold'>Add Coupon</button>
      </div>

      {/* Table */}
      <table className={`min-w-full bg-white shadow-md rounded-lg mt-5 ${submit ? "opacity-30" : "opacity-100"}`}>
        <thead>
          <tr>
            <th className="py-3 px-4">No.</th>
            <th className="py-3 px-4">Coupon Name</th>
            <th className="py-3 px-4">Min Purchase</th>
            <th className="py-3 px-4">Discount Price</th>
            <th className="py-3 px-4">Coupon Code</th>
            <th className="py-3 px-4">Date</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ No, Coupon_Name, Min_Purchase, Discount_Price, Coupon_Code, Date, Status }) => (
            <tr key={No}>
              <td className='px-4 py-2'>{No}</td>
              <td className='px-4'>{Coupon_Name}</td>
              <td className='px-4'>{Min_Purchase}</td>
              <td className='px-4'>{Discount_Price}</td>
              <td className='px-4'>{Coupon_Code}</td>
              <td className='px-4'>{Date}</td>
              <td className='px-4 cursor-pointer' onClick={() => handleStatusChange(No, Status)}>
                <Image src={Status === 1 ? assets.scrollon : assets.scrolloff} alt='status' />
              </td>
              <td className='px-4'>
                <button onClick={() => handleEditById(No)} className="mr-3"><MdEdit size={18} /></button>
                <button onClick={() => handleCouponDelete(No)}><RiDeleteBin5Fill size={18} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='flex justify-end mt-5'>
        <Stack spacing={0}><Pagination count={count} page={page} onChange={(e,page) => setPage(page)} variant='outlined' shape='rounded' /></Stack>
      </div>

      <Dialog open={submit} onClose={handleSubmitRemove}>
          <div className='flex justify-center flex-col items-center'>
        <DialogContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              formik.validateForm().then((errors) => {
                if (Object.keys(errors).length === 0) {
                  handleCouponSubmit();
                } else {
                  toast.error("Please fix validation errors.");
                }
              });
            }}
            className='space-y-3 px-7 '
          >
            <div className='flex justify-end'>
              <Image src={assets.can} alt='close' onClick={handleSubmitRemove} className='cursor-pointer' />
            </div>
            <h1 className='text-2xl font-bold mb-5 text-center'>Add Coupon</h1>

            <div className='flex flex-col justify-start items-start'>
              <label className='block text-gray-500'>Coupon Name</label>
              <input
                name='name'
                type='text'
                value={formik.values.name}
                onChange={formik.handleChange}
                className='border border-gray-300 px-2 py-2'
              />
              {touched.name && errors.name && (
                <span className="text-sm text-red-500">{errors.name}</span>
              )}
            </div>
            <div className='flex flex-col justify-start items-start'>
              <label className='block text-gray-500'>Minimum Purchase</label>
              <input
                name='minpurchase'
                type='number'
                value={formik.values.minpurchase}
                onChange={formik.handleChange}
                className='border border-gray-300 px-2 py-2'
              />
              {touched.minpurchase && errors.minpurchase && (
                <span className="text-sm text-red-500">{errors.minpurchase}</span>
              )}
            </div>
            <div className='flex flex-col justify-start items-start'>
              <label className='block text-gray-500'>Discount Price</label>
              <input
                name='disprice'
                type='number'
                value={formik.values.disprice}
                onChange={formik.handleChange}
                className='border border-gray-300 px-2 py-2'
              />
                {touched.disprice && errors.disprice && (
                <span className="text-sm text-red-500">{errors.disprice}</span>
              )}
            </div>
            <div className='flex flex-col justify-start items-start'>
              <label className='block text-gray-500'>Start Date</label>
              <input
                name='start_date'
                type='date'
                value={formik.values.start_date}
                onChange={formik.handleChange}
                className='w-full border border-gray-300 px-2 py-2'
              />
                {touched.start_date && errors.start_date && (
                <span className="text-sm text-red-500">{errors.start_date}</span>
              )}
            </div>
            <div className='flex flex-col justify-start items-start'>
              <label className='block text-gray-500'>End Date</label>
              <input
                name='end_date'
                type='date'
                value={formik.values.end_date}
                onChange={formik.handleChange}
                className='border w-full border-gray-300 px-2 py-2'
              />
                {touched.end_date && errors.end_date && (
                <span className="text-sm text-red-500">{errors.end_date}</span>
              )}
            </div>
            <div className='flex flex-col justify-start items-start'>
              <label className='block text-gray-500'>Coupon Code</label>
              <input
                name='code'
                type='text'
                value={formik.values.code}
                onChange={formik.handleChange}
                className='border border-gray-300 px-2 py-2'
              />
                {touched.code && errors.code && (
                <span className="text-sm text-red-500">{errors.code}</span>
              )}
            </div>

            <DialogActions>
              <button type='submit' className='w-full py-2 bg-amber-400 font-bold'>Submit</button>
            </DialogActions>
          </form>
        </DialogContent>
        </div>
      </Dialog>

      <Dialog open={openCoupon} onClose={() => setOpenCoupon(false)}>
          <div className='flex justify-center flex-col items-center'>
        <DialogContent>
          {
            coupon && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              formik.validateForm().then((errors) => {
                if (Object.keys(errors).length === 0) {
                  handleCouponSubmit();
                } else {
                  toast.error("Please fix validation errors.");
                }
              });
            }}
            className='space-y-3 px-7 '
          >
            <div className='flex justify-end'>
              <Image src={assets.can} alt='close' onClick={() => setOpenCoupon(false)} className='cursor-pointer' />
            </div>
            <h1 className='text-2xl font-bold mb-5 text-center'>Add Coupon</h1>

            <div className='flex flex-col justify-start items-start'>
              <label className='block text-gray-500'>Coupon Name</label>
              <input
                name='name'
                type='text'
                value={formik.values.name}
                onChange={formik.handleChange}
                placeholder={coupon.Coupon_Name}
                className='border border-gray-300 px-2 py-2'
              />
              {touched.name && errors.name && (
                <span className="text-sm text-red-500">{errors.name}</span>
              )}
            </div>
            <div className='flex flex-col justify-start items-start'>
              <label className='block text-gray-500'>Minimum Purchase</label>
              <input
                name='minpurchase'
                type='number'
                value={formik.values.minpurchase}
                // placeholder={coupon.Min_Purchase}
                onChange={formik.handleChange}
                className='border border-gray-300 px-2 py-2'
              />
              {touched.minpurchase && errors.minpurchase && (
                <span className="text-sm text-red-500">{errors.minpurchase}</span>
              )}
            </div>
            <div className='flex flex-col justify-start items-start'>
              <label className='block text-gray-500'>Discount Price</label>
              <input
                name='disprice'
                type='number'
                value={formik.values.disprice}
                onChange={formik.handleChange}
                // placeholder={coupon.Discount_Price}
                className='border border-gray-300 px-2 py-2'
              />
                {touched.disprice && errors.disprice && (
                <span className="text-sm text-red-500">{errors.disprice}</span>
              )}
            </div>
            <div className='flex flex-col justify-start items-start'>
              <label className='block text-gray-500'>Start Date</label>
              <input
                name='start_date'
                type='date'
                value={formik.values.start_date}
                onChange={formik.handleChange}
                className='w-full border border-gray-300 px-2 py-2'
              />
                {touched.start_date && errors.start_date && (
                <span className="text-sm text-red-500">{errors.start_date}</span>
              )}
            </div>
            <div className='flex flex-col justify-start items-start'>
              <label className='block text-gray-500'>End Date</label>
              <input
                name='end_date'
                type='date'
                value={formik.values.end_date}
                onChange={formik.handleChange}
                className='border w-full border-gray-300 px-2 py-2'
              />
                {touched.end_date && errors.end_date && (
                <span className="text-sm text-red-500">{errors.end_date}</span>
              )}
            </div>
            <div className='flex flex-col justify-start items-start'>
              <label className='block text-gray-500'>Coupon Code</label>
              <input
                name='code'
                type='text'
                value={formik.values.code}
                onChange={formik.handleChange}
                // placeholder={coupon.Coupon_Code}
                className='border border-gray-300 px-2 py-2'
              />
                {touched.code && errors.code && (
                <span className="text-sm text-red-500">{errors.code}</span>
              )}
            </div>

            <DialogActions>
              <button type='submit' className='w-full py-2 bg-amber-400 font-bold'>Submit</button>
            </DialogActions>
          </form>
          )}
        </DialogContent>
        </div>
      </Dialog>
    </div>
  );
};

export default Coupons;

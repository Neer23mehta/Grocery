'use client'
import React, { useEffect, useState } from 'react';
import { assets } from '@/assests/assets';
import commonGetApis, { commonPostApis, deleteApi } from '@/commonapi/Commonapi';
import { Dialog, DialogActions, DialogContent, Pagination, Stack, TextField, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import orderBy from 'lodash/orderBy';
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
  Coupon_Code: string;
  Coupon_Name: string;
  Date: string;
  Discount_Price: number;
  Min_Purchase: number;
  No: number;
  Status: number;
}
const Coupons = () => {
  const [submit, setSubmit] = useState(false);
  const [users, setUsers] = useState<Users[]>([]);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [openCoupon, setOpenCoupon] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [sortField, setSortField] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width:600px)');
  const isTablet = useMediaQuery('(min-width:601px) and (max-width:960px)');
  const fetchGet = async () => {
    try {
      const res = await commonGetApis(`get_coupons?pageNumber=${page}&pageLimit=10`);
      setTotalCount(res?.data?.totalCount);
      setUsers(res.data.result || []);
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleStatusChange = async (id: number, currentStatus: number) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    const formData = new URLSearchParams();
    formData.append("id", String(id));
    formData.append("status", String(newStatus));
    try {
      const res = await commonPostApis("status_change4", formData);
      if (res.data) {
        toast.success("Status updated successfully");
        fetchGet();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };
  const handleCouponDelete = async (id: number) => {
    try {
      const res = await deleteApi(`delete_coupon?id=${id}`);
      if (res.data) {
        toast.success(res.data.message);
        setUsers((prev) => prev.filter((item) => item.No !== id));
      } else {
        toast.error(`${res.data.message}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(`${error}`);
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
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const formdata = new URLSearchParams();
      formdata.append("couponName", formik.values.name);
      formdata.append("minimumPurchase", formik.values.minpurchase);
      formdata.append("discountPrice", formik.values.disprice);
      formdata.append("startDate", formik.values.start_date);
      formdata.append("endDate", formik.values.end_date);
      formdata.append("couponCode", formik.values.code);
      if (isEditing && coupon) {
        formdata.append("id", String(coupon.No));
      }
      try {
        const res = await commonPostApis("add_coupon", formdata);
        if (res.data) {
          toast.success(isEditing ? "Coupon updated successfully!" : "Coupon added successfully!");
          fetchGet();
          resetForm();
          setSubmit(false);
          setIsEditing(false);
          setOpenCoupon(false);
        }
      } catch (error) {
        console.log("Submit Error:", error);
        toast.error("Something went wrong while submitting the coupon");
      }
      finally {
        setSubmitting(false)
      }
    },
  });
  const { errors, touched } = formik;
  const handleCouponSubmit = async () => {
    const formdata = new URLSearchParams();
    formdata.append("couponName", formik.values.name);
    formdata.append("minimumPurchase", formik.values.minpurchase);
    formdata.append("discountPrice", formik.values.disprice);
    formdata.append("startDate", formik.values.start_date);
    formdata.append("endDate", formik.values.end_date);
    formdata.append("couponCode", formik.values.code);
    if (isEditing && coupon) {
      formdata.append("id", String(coupon.No));
    }
    try {
      const res = await commonPostApis("add_coupon", formdata);
      if (res.data) {
        toast.success(isEditing ? "Coupon updated successfully!" : "Coupon added successfully!");
        fetchGet();
        formik.resetForm();
        setSubmit(false);
        setIsEditing(false);
        setOpenCoupon(false);
      }
    } catch (error) {
      console.log("Submit Error:", error);
      toast.error(`${error}`);
    }
  };
  const handleEditById = async (Id: number) => {
    setOpenCoupon(true);
    try {
      const res = await commonGetApis(`get_coupon_by_id?id=${Id}`);
      if (res.data) {
        setCoupon(res.data.data);
        formik.setValues({
          name: res.data.data.Coupon_Name,
          minpurchase: String(res.data.data.Min_Purchase),
          disprice: String(res.data.data.Discount_Price),
          start_date: res.data.data.Start_Date,
          end_date: res.data.data.End_Date,
          code: res.data.data.Coupon_Code,
        });
        setIsEditing(true);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const setExportData = () => {
    if (!users.length) {
      toast.warning("No data to export");
      return;
    }
    const headers = ["No", "Coupon_Name", "Min_Purchase", "Discount_Price", "Coupon_Code", "Date", "Status"];
    const rows = users.map(item => [
      item.No,
      item.Coupon_Name,
      item.Min_Purchase,
      item.Discount_Price,
      item.Coupon_Code,
      item.Date,
      item.Status === 1 ? "Active" : "Inactive"
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "coupons_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleSortItems = (field: keyof Coupon) => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    const sortedData = orderBy([...users], [field], [newOrder]);
    setUsers(sortedData);
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
    fetchGet();
  }, [page]);
  const count = Math.ceil(Number(totalCount) / 10);
  return (
    <div className="p-2 md:p-4" style={{ overflowX: 'hidden', overflowY: 'auto' , width: '100%' }}>
      <div className={`flex flex-col md:flex-row justify-between overflow-y-auto items-start md:items-center gap-4 ${submit ? "opacity-30" : "opacity-100"}`}>
        <div>
          <h1 className='text-xl md:text-2xl lg:text-3xl font-bold'>Coupon Management</h1>
          <p className='text-gray-500 text-sm md:text-base mt-1 md:mt-2'>
            <Link href={`/admin/dashboard`}>Dashboard</Link>
            <span className='mx-1 md:ml-2.5'>{`>`}</span>
            <span className='text-black'>Coupon Management</span>
          </p>
        </div>
        <div className={`flex flex-row gap-2 w-full md:w-auto ${isMobile ? "gap-48" : ""}`}>
          <button
            onClick={handleAddSubmit}
            className='py-2 w-full md:py-3 md:px-5 bg-amber-300 font-bold cursor-pointer text-sm md:text-base'>
            {isMobile ? "Add" : "Add Coupon"}
          </button>
          <button
            className="py-2 w-full md:py-3 md:px-5 bg-green-700 font-bold cursor-pointer text-sm md:text-base text-white"
            onClick={() => setExportData()}>
            Export
          </button>
        </div>
      </div>
      <div className="mt-5 h-96 md:h-auto" style={{ overflowX: 'auto', overflowY: 'auto' , width: '100%' }}>
        <table className={`bg-white h-auto overflow-y-auto shadow-md rounded-lg ${submit ? "opacity-30" : "opacity-100"}`} style={{ minWidth: isMobile ? '600px' : '100%' }}>          
          <thead className="bg-gray-50">
          <tr>
            <th className="py-3 px-2 md:px-4 text-left text-sm font-semibold text-black">
              <div className="flex items-center">
                No.
                <Image
                  src={assets.sort}
                  alt="sort"
                  height={13}
                  width={13}
                  className="ml-1 cursor-pointer"
                  onClick={() => handleSortItems("No")} />
              </div>
            </th>
            <th className="py-3 px-2 md:px-4 text-left text-sm font-semibold text-black">
              <div className="flex items-center">
                Coupon
                {!isMobile && " Name"}
                <Image
                  src={assets.sort}
                  alt="sort"
                  height={13}
                  width={13}
                  className="ml-1 cursor-pointer"
                  onClick={() => handleSortItems("Coupon_Name")} />
              </div>
            </th>
            {!isMobile && (
              <>
                <th className="py-3 px-2 md:px-4 text-left text-sm font-semibold text-black">Min Purchase</th>
                <th className="py-3 px-2 md:px-4 text-left text-sm font-semibold text-black">Discount</th>
              </>
            )}
            <th className="py-3 px-2 md:px-4 text-left text-sm font-semibold text-black">Code</th>
            {!isMobile && <th className="py-3 px-2 md:px-4 text-left text-sm font-semibold text-black">Date</th>}
            <th className="py-3 px-2 md:px-4 text-left text-sm font-semibold text-black">Status</th>
            <th className="py-3 px-2 md:px-4 text-left text-sm font-semibold text-black">Action</th>
          </tr>
        </thead>
          <tbody>
            {users.length > 0 ? (
              users.map(({ No, Coupon_Name, Min_Purchase, Discount_Price, Coupon_Code, Date, Status }) => (
                <tr key={No} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className='py-3 px-2 md:px-4 text-sm'>{No}</td>
                  <td className='py-3 px-2 md:px-4 text-sm'>{isMobile ? Coupon_Name.substring(0, 10) + (Coupon_Name.length > 10 ? "..." : "") : Coupon_Name}</td>
                  {!isMobile && (
                    <>
                      <td className='py-3 px-2 md:px-4 text-sm'>{Min_Purchase}</td>
                      <td className='py-3 px-2 md:px-4 text-sm'>{Discount_Price}</td>
                    </>
                  )}
                  <td className='py-3 px-2 md:px-4 text-sm'>{isMobile ? Coupon_Code.substring(0, 5) + "..." : Coupon_Code}</td>
                  {!isMobile && <td className='py-3 px-2 md:px-4 text-sm'>{Date}</td>}
                  <td
                    className='py-3 px-2 md:px-4 cursor-pointer'
                    onClick={() => handleStatusChange(No, Status)}>
                    <Image
                      src={Status === 1 ? assets.scrollon : assets.scrolloff}
                      alt='status'
                      width={42}
                      height={42}
                      className="w-8 h-8 md:w-10 md:h-10" />
                  </td>
                  <td className="py-3 px-2 md:px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditById(No)}
                        className="text-gray-600 rounded cursor-pointer"
                        aria-label="Edit">
                        <MdEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleCouponDelete(No)}
                        className="text-gray-600 rounded cursor-pointer"
                        aria-label="Delete">
                        <RiDeleteBin5Fill size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={isMobile ? 5 : 7} className="py-4 text-center text-gray-500">
                  No coupons found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {users.length > 0 && (
        <div className="flex justify-center md:justify-end mt-5">
          <Stack spacing={2}>
            <Pagination
              count={count}
              page={page}
              onChange={(e, page) => setPage(page)}
              variant='outlined'
              shape='rounded'
              size={isMobile ? "small" : "medium"} />
          </Stack>
        </div>
      )}
      <Dialog open={submit} onClose={handleSubmitRemove} fullScreen={isMobile}>
        <div className='flex justify-center overflow-y-auto flex-col items-center'>
          <DialogContent>
            <form
              onSubmit={formik.handleSubmit}
              className='space-y-3 px-7 '>
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
                  onBlur={formik.handleBlur}
                  className='border border-gray-300 px-2 py-2' />
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
                  onBlur={formik.handleBlur}
                  className='border border-gray-300 px-2 py-2' />
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
                  onBlur={formik.handleBlur}
                  className='border border-gray-300 px-2 py-2' />
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
                  onBlur={formik.handleBlur}
                  className='w-full border border-gray-300 px-2 py-2' />
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
                  onBlur={formik.handleBlur}
                  className='border w-full border-gray-300 px-2 py-2' />
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
                  onBlur={formik.handleBlur}
                  className='border border-gray-300 px-2 py-2' />
                {touched.code && errors.code && (
                  <span className="text-sm text-red-500">{errors.code}</span>
                )}
              </div>
              <button type='submit' className='w-full py-2 bg-amber-400 font-bold'>Submit</button>
            </form>
          </DialogContent>
        </div>
      </Dialog>
      <Dialog
        open={openCoupon}
        onClose={() => setOpenCoupon(false)}
        fullScreen={isMobile}
        maxWidth="sm"
        fullWidth>
        <DialogContent className="p-4 md:p-6">
          {coupon && (
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
              className="space-y-4">
              <div className='flex justify-between items-center mb-4'>
                <h1 className='text-xl md:text-2xl font-bold'>Edit Coupon</h1>
                <button
                  type="button"
                  onClick={() => setOpenCoupon(false)}
                  className="text-gray-500 hover:text-gray-700">
                  <Image src={assets.can} alt='close' width={20} height={20} className='cursor-pointer' />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className='block text-gray-500 mb-1'>Coupon Name</label>
                  <TextField
                    name='name'
                    type='text'
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    fullWidth
                    size="small"
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className='block text-gray-500 mb-1'>Minimum Purchase</label>
                    <TextField
                      name='minpurchase'
                      type='number'
                      value={formik.values.minpurchase}
                      onChange={formik.handleChange}
                      fullWidth
                      size="small"
                      error={touched.minpurchase && Boolean(errors.minpurchase)}
                      helperText={touched.minpurchase && errors.minpurchase} />
                  </div>
                  <div>
                    <label className='block text-gray-500 mb-1'>Discount Price</label>
                    <TextField
                      name='disprice'
                      type='number'
                      value={formik.values.disprice}
                      onChange={formik.handleChange}
                      fullWidth
                      size="small"
                      error={touched.disprice && Boolean(errors.disprice)}
                      helperText={touched.disprice && errors.disprice} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className='block text-gray-500 mb-1'>Start Date</label>
                    <TextField
                      name='start_date'
                      type='date'
                      value={formik.values.start_date}
                      onChange={formik.handleChange}
                      fullWidth
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      error={touched.start_date && Boolean(errors.start_date)}
                      helperText={touched.start_date && errors.start_date} />
                  </div>
                  <div>
                    <label className='block text-gray-500 mb-1'>End Date</label>
                    <TextField
                      name='end_date'
                      type='date'
                      value={formik.values.end_date}
                      onChange={formik.handleChange}
                      fullWidth
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      error={touched.end_date && Boolean(errors.end_date)}
                      helperText={touched.end_date && errors.end_date} />
                  </div>
                </div>
                <div>
                  <label className='block text-gray-500 mb-1'>Coupon Code</label>
                  <TextField
                    name='code'
                    type='text'
                    value={formik.values.code}
                    onChange={formik.handleChange}
                    fullWidth
                    size="small"
                    error={touched.code && Boolean(errors.code)}
                    helperText={touched.code && errors.code} />
                </div>
              </div>
              <DialogActions className="mt-4 px-0">
                <button
                  type='submit'
                  className='w-full py-2 bg-amber-400 font-bold hover:bg-amber-500 transition-colors'>
                  Update
                </button>
              </DialogActions>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default Coupons;
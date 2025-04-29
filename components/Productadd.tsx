'use client'
import React, { useEffect, useState } from 'react'
import { assets } from '@/assests/assets'
import { TextField } from '@mui/material'
import { useFormik } from 'formik'
import Image from 'next/image'
import * as Yup from 'yup'
import axios from 'axios'
import commonGetApis from '@/commonapi/Commonapi'
import { toast } from 'react-toastify'

interface ProductFormValues {
  name: string;
  category: string;
  subcategory: string;
  brand: string;
  variation: string;
  price: string;
  discount: string;
  discountprice: string;
  title: string;
  description: string;
}

interface Category {
  Category_Name: string;
  No: number;
}

interface Subcategory {
  SubCategory_Name: string;
  No: number;
}

interface Brand {
  Brand_Name: string;
  No: number;
}

const Productadd = () => {
  const initialValues: ProductFormValues = {
    name: "",
    category: "",
    subcategory: "",
    brand: "",
    variation: "",
    price: "",
    discount: "",
    discountprice: "",
    title: "",
    description: ""
  }

  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<Subcategory[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [all, setAll] = useState(false)
  const [alls, setAlls] = useState(false)

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
    fetchBrands();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await commonGetApis('getcategories?pageNumber=1&pageLimit=10');
      setCategories(res.data.result);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  const fetchSubCategories = async () => {
    try {
      const res = await commonGetApis('get_subcategories?pageNumber=1&pageLimit=10');
      setSubCategories(res.data.result);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  }

  const fetchBrands = async () => {
    try {
      const res = await commonGetApis('get_brands?pageNumber=1&pageLimit=10');
      setBrands(res.data.result);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  }

  const handleToggle = () => {
    setAll(!all)
  }
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(1).max(25).required("Name is required"),
    category: Yup.string().required("Category is required"),
    subcategory: Yup.string().required("Subcategory is required"),
    brand: Yup.string().required("Brand is required"),
    variation: Yup.string().required("Variation is required"),
    price: Yup.number().typeError("Price must be a number").required("Price is required"),
    discount: Yup.number().typeError("Discount must be a number").min(0).max(100, "Must be between 0 and 100"),
    discountprice: Yup.number().typeError("Discount price must be a number").required("Discounted price is required"),
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
  });

  const formik = useFormik<ProductFormValues>({
    initialValues,
    validationSchema,
    onSubmit: () => handlePostProducts()
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

  const handlePostProducts = async () => {
    if (!image) {
      toast.error("Please select an image.");
      return;
    }
  
    const formdata = new FormData();
    formdata.append("fk_category_id", values.category);
    formdata.append("fk_subcategory_id", values.subcategory);
    formdata.append("fk_brand_id", values.brand);
    formdata.append("product_name", values.name);
    formdata.append("stock_status", "1");
    formdata.append("image", image);
  
    // Product variations as array item (even if one)
    formdata.append("products[0][variation]", values.variation);
    formdata.append("products[0][discount]", values.discount);
    formdata.append("products[0][discount_price]", values.discountprice);
    formdata.append("products[0][product_price]", values.price);
    formdata.append("products[0][title]", values.title);
    formdata.append("products[0][description]", values.description);
  
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('usertoken');
  
    try {
      const res = await axios.post('http://192.168.2.181:3000/admin/add_product', formdata, {
        headers: {
          Authorizations: token || '',
          language: "en",
          refresh_token: refreshToken || ''
        }
      });
  
      if (res.data) {
        toast.success("Product Added Successfully");
        resetForm();
        setImage(null);
      } else {
        toast.error("Failed to add product.");
      }
    } catch (error) {
      console.error("Error posting product:", error);
      toast.error("An error occurred while adding the product.");
    }
  }

  useEffect (() => {
    document.title = "Admin addproduct"
  },[])

  const handleCancel = () => {
    resetForm();
    setImage(null);
  }

  const handleToggleSecond = () => {
    setAlls(!alls)
  }

  return (
    <form onSubmit={handleSubmit} className='bg-white shadow-md p-5 flex flex-col space-y-4'>
      <h1 className='font-bold text-xl'>Add Product</h1>

      <div className='flex flex-col md:flex-row md:flex-wrap gap-5'>
        <div className='flex flex-col w-full md:w-[48%] lg:w-[23%]'>
          <p className='text-gray-400 mb-2'>Item Name</p>
          <TextField
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Name"
            variant="outlined"
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
          />
        </div>

        <div className='flex flex-col w-full md:w-[48%] lg:w-[23%]'>
          <p className='text-gray-400 mb-2'>Category</p>
          <select
            name="category"
            value={values.category}
            onChange={handleChange}
            onBlur={handleBlur}
            className='py-3 px-2 border border-gray-300 rounded-md'
          >
            <option value="">Select</option>
            {categories.map((item) => (
              <option key={item.No} value={item.No}>{item.Category_Name}</option>
            ))}
          </select>
          {touched.category && errors.category && (
            <span className="text-sm text-red-500">{errors.category}</span>
          )}
        </div>

        <div className='flex flex-col w-full md:w-[48%] lg:w-[23%]'>
          <p className='text-gray-400 mb-2'>Subcategory</p>
          <select
            name="subcategory"
            value={values.subcategory}
            onChange={handleChange}
            onBlur={handleBlur}
            className='py-3 px-2 border border-gray-300 rounded-md'
          >
            <option value="">Select</option>
            {subCategories.map((item) => (
              <option key={item.No} value={item.No}>{item.SubCategory_Name}</option>
            ))}
          </select>
          {touched.subcategory && errors.subcategory && (
            <span className="text-sm text-red-500">{errors.subcategory}</span>
          )}
        </div>

        <div className='flex flex-col w-full md:w-[48%] lg:w-[23%]'>
          <p className='text-gray-400 mb-2'>Brand</p>
          <select
            name="brand"
            value={values.brand}
            onChange={handleChange}
            onBlur={handleBlur}
            className='py-3 px-2 border border-gray-300 rounded-md'
          >
            <option value="">Select</option>
            {brands.map((item) => (
              <option key={item.No} value={item.No}>{item.Brand_Name}</option>
            ))}
          </select>
          {touched.brand && errors.brand && (
            <span className="text-sm text-red-500">{errors.brand}</span>
          )}
        </div>
      </div>

      <div className='flex w-full justify-between items-center flex-row'>
      <h1 className='text-xl font-bold'>Product Details</h1>
        <Image src={assets.add} alt='Add' onClick={handleToggle} />
      </div>
      {
        all ? (
          <div className='flex flex-wrap gap-5'>
            {[
              { name: 'variation', label: 'Product qnty.' },
              { name: 'price', label: 'Price' },
              { name: 'discount', label: 'Discount (%)' },
              { name: 'discountprice', label: 'Discount Price' }
            ].map(({ name, label }) => (
              <div key={name} className='flex flex-col w-full md:w-[48%] lg:w-[23%]'>
                <p className='text-gray-400 mb-2'>{label}</p>
                <TextField
                  name={name}
                  value={values[name as keyof ProductFormValues]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label={label}
                  variant="outlined"
                  error={touched[name as keyof ProductFormValues] && Boolean(errors[name as keyof ProductFormValues])}
                  helperText={touched[name as keyof ProductFormValues] && errors[name as keyof ProductFormValues]}
                />
              </div>
            ))}
          </div>
        ) : null
      }

      <div className='flex w-full justify-between items-center flex-row'>
      <h1 className='text-xl font-bold'>Other Info</h1>
        <Image src={assets.add} alt='Add' onClick={handleToggleSecond} />
      </div>

      {
        alls ? (
          <div className='flex flex-col md:flex-row gap-5'>
            <div className='flex flex-col w-full'>
              <p className='text-gray-400 mb-2'>Title Name</p>
              <TextField
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Title"
                variant="outlined"
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
              />
            </div>
            <div className='flex flex-col w-full'>
              <p className='text-gray-400 mb-2'>Description</p>
              <TextField
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                label="Description"
                variant="outlined"
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
              />
            </div>
          </div>
        ) : null
      }
      <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4'>
        <label htmlFor="thumbnail" className="cursor-pointer">
          <div className="w-[310px] h-[140px] flex items-center justify-center bg-gray-100 rounded-lg border-2 border-gray-300 hover:border-gray-500 hover:shadow-lg">
            {image ? (
              <p>{image.name}</p>
            ) : (
              <Image
                src={assets.upimg}
                alt="Upload Thumbnail"
                className="object-cover rounded-lg"
                width={310}
                height={140}
              />
            )}
            <input
              id="thumbnail"
              className="hidden"
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImage(e.target.files[0]);
                }
              }}
            />
          </div>
        </label>
        <p className='text-gray-400'>Dimension (512x512)<br />Size up to 2MB</p>
      </div>

      <div className='flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-5'>
        <button type='submit' className='px-6 py-3 font-bold bg-amber-400 text-white rounded-md'>Save</button>
        <button type='button' onClick={handleCancel} className='px-6 py-3 font-bold border border-gray-300 bg-white rounded-md'>Cancel</button>
      </div>
    </form>
  )
}

export default Productadd

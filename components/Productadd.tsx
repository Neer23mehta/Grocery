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
}

type ProductFormValuess = {
  variation: string;
  price: string;
  discount: string;
  discountprice: string;
};

type Orderinfo = {
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
    brand: ""
  }

  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<Subcategory[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [productFields, setProductFields] = useState<ProductFormValuess[]>([
    { variation: '', price: '', discount: '', discountprice: '' }
  ]);
  const [orderFields, setOrderFields] = useState<Orderinfo[]>([
    { title: 'Something', description: '' }
  ]);

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
    fetchBrands();
    document.title = "Admin addproduct";
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

  const validationSchema = Yup.object().shape({
    name: Yup.string().min(1).max(25).required("Name is required"),
    category: Yup.string().required("Category is required"),
    subcategory: Yup.string().required("Subcategory is required"),
    brand: Yup.string().required("Brand is required")
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

    productFields.forEach((field, index) => {
      formdata.append(`products[${index}][variation]`, field.variation);
      formdata.append(`products[${index}][discount]`, field.discount);
      formdata.append(`products[${index}][discount_price]`, field.discountprice);
      formdata.append(`products[${index}][product_price]`, field.price);
    });

    orderFields.forEach((info, index) => {
      formdata.append(`products[${index}][title]`, info.title || 'Untitled'); 
      formdata.append(`products[${index}][description]`, info.description || 'No description'); 
    });

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
        setProductFields([{ variation: '', price: '', discount: '', discountprice: '' }]);
        setOrderFields([{ title: '', description: '' }]);
      } else {
        toast.error("Failed to add product.");
      }
    } catch (error) {
      console.error("Error posting product:", error);
      toast.error("An error occurred while adding the product.");
    }
  };

  const handleCancel = () => {
    resetForm();
    setImage(null);
    setProductFields([{ variation: '', price: '', discount: '', discountprice: '' }]);
    setOrderFields([{ title: '', description: '' }]);
  }

  const handleChanges = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedFields = [...productFields];
    updatedFields[index][name as keyof ProductFormValuess] = value;
    setProductFields(updatedFields);
  };

  const handleOrderInfo = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedFields = [...orderFields];
    updatedFields[index][name as keyof Orderinfo] = value;
    setOrderFields(updatedFields);
  };

  const handleAddFields = () => {
    setProductFields([
      ...productFields,
      { variation: '', price: '', discount: '', discountprice: '' }
    ]);
  };

  const handleAddField = () => {
    setOrderFields([
      ...orderFields,
      { title: "", description: "" }
    ]);
  };

  return (
    <form onSubmit={handleSubmit} className='bg-white shadow-md p-5 flex flex-col space-y-4'>
      <h1 className='font-bold text-xl'>Add Product</h1>

      <div className='flex flex-col md:flex-row md:flex-wrap gap-5'>
        {[
          { label: "Item Name", name: "name", type: "text", options: null },
          { label: "Category", name: "category", options: categories.map(item => ({ value: item.No, label: item.Category_Name })) },
          { label: "Subcategory", name: "subcategory", options: subCategories.map(item => ({ value: item.No, label: item.SubCategory_Name })) },
          { label: "Brand", name: "brand", options: brands.map(item => ({ value: item.No, label: item.Brand_Name })) }
        ].map((field, idx) => (
          <div key={idx} className='flex flex-col w-full md:w-[48%] lg:w-[23%]'>
            <p className='text-gray-400 mb-2'>{field.label}</p>
            {field.options ? (
              <select
                name={field.name}
                value={values[field.name as keyof ProductFormValues]}
                onChange={handleChange}
                onBlur={handleBlur}
                className='py-4 px-2 border border-gray-300'
              >
                <option value="">Select</option>
                {field.options.map((opt, i) => (
                  <option key={i} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            ) : (
              <TextField
                name={field.name}
                value={values[field.name as keyof ProductFormValues]}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="outlined"
                error={touched[field.name as keyof ProductFormValues] && Boolean(errors[field.name as keyof ProductFormValues])}
                helperText={touched[field.name as keyof ProductFormValues] && errors[field.name as keyof ProductFormValues]}
              />
            )}
          </div>
        ))}
      </div>

      <div>
        <div className='flex w-full justify-between items-center'>
          <h1 className='text-xl font-bold'>Product Details</h1>
          <Image src={assets.add} alt='Add' onClick={handleAddFields} />
        </div>
        {productFields.map((field, index) => (
          <div key={index} className='flex flex-wrap gap-5 mb-4'>
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
                  value={field[name as keyof ProductFormValuess]}
                  onChange={(e) => handleChanges(index, e)}
                  label={label}
                  variant='outlined'
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className='flex w-full justify-between items-center'>
        <h1 className='text-xl font-bold'>Other Info</h1>
        <Image src={assets.add} alt='Add' onClick={handleAddField} />
      </div>
      {orderFields.map((field, idx) => (
        <div className='flex flex-col md:flex-row gap-5' key={idx}>
          <div className='flex flex-col w-full'>
            <p className='text-gray-400 mb-2'>Title Name</p>
            <TextField
              name="title"
              value={field.title}
              onChange={(e) => handleOrderInfo(idx, e)}
              label="Title"
              variant="outlined"
            />
          </div>
          <div className='flex flex-col w-full'>
            <p className='text-gray-400 mb-2'>Description</p>
            <TextField
              name="description"
              value={field.description}
              onChange={(e) => handleOrderInfo(idx, e)}
              label="Description"
              variant="outlined"
            />
          </div>
        </div>
      ))}

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

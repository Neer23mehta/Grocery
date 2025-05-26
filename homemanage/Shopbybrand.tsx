'use client'
import React, { useEffect, useState } from 'react'
import { assets } from '@/assests/assets'
import Image from 'next/image'
import { MdEdit } from "react-icons/md";
import { toast } from 'react-toastify';
import commonGetApis, { commonPostApis, deleteApi } from '@/commonapi/Commonapi';
import { Dialog, DialogActions } from '@mui/material';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

interface Brands {
  Image: string;
  Id: number;
  Section_Id: number;
  Section_Name: string;
  section_brand: {
    id: number;
    image: string;
  }[];
}

const Shopbybrand = () => {
  const [brand, setBrand] = useState<Brands[]>([]);
  const [add, setAdd] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [display, SetDisplay] = useState(false);

  const fetchGetBrands = async () => {
    try {
      const res = await commonGetApis("get_all_home_management?fkSectionId=3");
      setBrand(res?.data?.result || []);
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
  };

  const handleRemoveBrands = () => {
    SetDisplay(!display);
  };

  const handleDeleteBrand = async (id: number) => {
    try {
      const res = await deleteApi(`delete_home_management?id=${id}&fkSectionId=3`);
      if (res?.data) {
        toast.success("Deleted Successfully");
        fetchGetBrands();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
  };

  const handleToggleAdd = () => {
    setAdd(!add);
  };

  const handleNewBrand = async () => {
    const formdata = new FormData();

    formdata.append("fkSectionId", "3");
    if (image) formdata.append("image", image);

    try {
      const res = await commonPostApis("add_home_management", formdata);
      if (res.data) {
        toast.success("Successfully Added");
        fetchGetBrands();
        setAdd(false);
        setImage(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
  };

  const fetchGetById = async (id: number) => {
    try {
      const res = await commonGetApis(`get_home_management_by_id?fkSectionId=3&id=${id}`);
      if (res.data) {
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
  };

  useEffect(() => {
    fetchGetBrands();
  }, []);

  return (
    <div className='w-full'>
      <div className='flex flex-col mt-5 px-4 bg-white shadow-lg w-full'>
        <div className='flex flex-row justify-between items-center'>
          <div className='flex flex-row'>
            <h1 className='mt-5 font-bold text-xl'>Brands</h1>
            <button className='text-gray-500 ml-3 mt-5'><MdEdit size={20} /></button>
          </div>
          <Image src={assets.del} alt='delete' className='mt-5 cursor-pointer' width={17} height={15} onClick={handleRemoveBrands} />
        </div>

        <div className='w-full overflow-x-auto'>
          <div className='flex mb-3 gap-5 min-w-max'>
            {brand?.map((curval, index) => (
              <div key={index} className='flex gap-2'>
                {curval.section_brand.map((brandImage, imageIndex) => (
                  <div key={imageIndex} className="relative">
                    <button onClick={() => handleDeleteBrand(brandImage.id)}>
                      <Image
                        src={assets.cancel}
                        alt="remove"
                        width={26}
                        height={26}
                        className="absolute top-6 right-0 z-10 cursor-pointer"
                      />
                    </button>
                   <Zoom>
                   <Image
                      src={brandImage.image || '/placeholder.png'} 
                      alt={`brand-${brandImage.id}`}
                      width={110} 
                      height={110} 
                      className="object-cover rounded-md h-[110px] w-[110px] border border-gray-300 shadow-sm hover:shadow-md transition-shadow duration-200"
                      onClick={() => fetchGetById(brandImage.id)}
                      unoptimized 
                    />
                   </Zoom>
                  </div>
                ))}
              </div>
            ))}

            <div className='flex justify-center items-center border border-gray-300 mt-6 rounded-md h-[110px] w-[110px] cursor-pointer'>
              <Image src={assets.add} alt="add brand" onClick={handleToggleAdd} />
            </div>
          </div>
        </div>
      </div>

      <Dialog open={add} onClose={() => setAdd(false)}>
        <div className='flex flex-col justify-center px-10 bg-white shadow-md'>
          <div className='mt-1 flex justify-end items-end'>
            <button onClick={() => setAdd(false)} className='text-2xl text-gray-400 hover:text-red-500'>X</button>
          </div>
          <div className='flex justify-center items-center'>
            <h1 className='text-2xl font-bold'>Add Brand</h1>
          </div>
          <p className='py-2 mt-3 text-start'>Add Image of Brand</p>

          <div className='w-[300px] h-[150px] px-10 py-2 border border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-50 transition'>
            <label htmlFor="thumbnail" className="cursor-pointer text-center">
              <div className="flex items-center justify-center rounded-lg">
                <Image
                  src={image ? URL.createObjectURL(image) : assets.add}
                  alt="Upload Thumbnail"
                  width={image ? 300 : 50}
                  height={image ? 150 : 50}
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
            <div className='py-5 flex justify-center items-center'>
              <button onClick={handleNewBrand} className='font-bold mt-3 bg-amber-400 py-2 px-9 text-xl'>
                Save
              </button>
            </div>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};

export default Shopbybrand;

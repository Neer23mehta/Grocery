'use client';
import React, { useEffect, useState } from 'react';
import { assets } from '@/assests/assets';
import Image from 'next/image';
import { MdEdit } from "react-icons/md";
import { Dialog, DialogActions } from '@mui/material';
import { toast } from 'react-toastify';
import commonGetApis, { deleteApi } from '@/commonapi/Commonapi';
import axios from 'axios';

interface Advertise {
  image: string;
  id: number;
  Section_Name: string;
  Section_Id: number;
  section_advertisements: {
    id: number;
    image: string;
  }[];
}

const Advertise: React.FC = () => {
  const [add, setAdd] = useState(false);
  const [ads, setAds] = useState<Advertise[]>([]);
  const [image, setImage] = useState<File | null>(null);

  const handleToggleAdd = () => {
    setAdd(!add);
  };

  const fetchGetAdvertise = async () => {
    try {
      const res = await commonGetApis("get_all_home_management?fk_section_id=4");
      if (res.data) {
        setAds(res?.data?.result || []);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
  };

  const handleNewAdvertise = async () => {
    const refreshtoken = localStorage.getItem('usertoken');
    const token = localStorage.getItem('token');

    const formdata = new FormData();
    formdata.append("fk_section_id", "4");
    if (image) formdata.append("image", image);

    try {
      const res = await axios.post("http://192.168.2.181:3000/admin/add_home_management", formdata, {
        headers: {
          Authorizations: token!,
          language: 'en',
          refresh_token: refreshtoken!,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data) {
        toast.success("Successfully Added");
        fetchGetAdvertise();
        setAdd(false);
        setImage(null);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
  };

  const handleAdvertiseDelete = async (id: number) => {
    try {
      const res = await deleteApi(`delete_home_management?id=${id}&fk_section_id=4`);

      if (res.data) {
        setAds(prev => prev.map(item => ({
          ...item,
          section_advertisements: item.section_advertisements.filter(ad => ad.id !== id)
        })));
        toast.success("Deleted Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  const fetchGetById = async (id: number) => {
    try {
      const res = await commonGetApis(`get_home_management_by_id?fk_section_id=4&id=${id}`);
      if (res.data) {
        toast.success("Get Successfully")
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
  };

  useEffect(() => {
    fetchGetAdvertise();
  }, []);

  return (
    <div className='w-full'>
      <div className='flex flex-col mt-5 px-4 bg-white shadow-lg overflow-x-auto'>
        <div className='flex flex-row justify-between items-center'>
          <div className='flex flex-row'>
            <h1 className='mt-5 font-bold text-xl'>Advertisement</h1>
            <button className='text-gray-500 ml-3 mt-5'><MdEdit size={20} /></button>
          </div>
          <Image src={assets.del} alt='delete' className='mt-5 flex justify-end' width={17} height={25} />
        </div>

        <div className="w-full overflow-x-auto">
          <div className="flex gap-2 items-center min-w-fit">
            {ads?.map((curval, index) => (
              <div key={index} className="flex gap-2">
                {curval.section_advertisements.map((ad, idx) => (
                  <div key={ad.id} className="relative">
                    <button
                      onClick={() => handleAdvertiseDelete(ad.id)}
                      className="absolute top-7 right-1 z-10"
                    >
                      <Image
                        src={assets.cancel}
                        alt="remove"
                        width={26}
                        height={26}
                        className="cursor-pointer"
                      />
                    </button>
                    <Image
                      src={ad.image} 
                      alt={`banner-${idx}`} 
                      width={250}  
                      height={140}
                      className="mb-5 h-[140px] w-[250px] border border-gray-300 object-cover rounded-md shadow-sm mt-6 hover:shadow-md transition-shadow duration-200"
                      onClick={() => fetchGetById(ad.id)} 
                    />
                  </div>
                ))}
              </div>
            ))}
            <div className="flex justify-center items-center w-[250px] mb-5 h-[140px] border border-gray-300 mt-6 rounded-md">
              <Image src={assets.add} alt="banner" onClick={handleToggleAdd} />
            </div>
          </div>
        </div>

        <Dialog open={add} onClose={() => setAdd(false)}>
          <div className='flex flex-col justify-center px-10 bg-white shadow-md'>
            <div className='mt-1 flex justify-end items-end'>
              <button onClick={() => setAdd(false)} className='text-2xl text-gray-400 hover:text-red-500'>X</button>
            </div>
            <div className='flex justify-center items-center'>
              <h1 className='text-2xl font-bold'>Add Banner</h1>
            </div>
            <p className='py-2 mt-3 text-start'>Add Image of Banner</p>

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
                onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
              />
            </div>

            <DialogActions>
              <div className='py-5 flex justify-center items-center'>
                <button onClick={handleNewAdvertise} className='font-bold mt-3 bg-amber-400 py-2 px-9 text-xl'>
                  Save
                </button>
              </div>
            </DialogActions>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default Advertise;

'use client'
import React, { useEffect, useState } from 'react'
import { Dialog, DialogActions, DialogContent } from '@mui/material';
import Banner from '@/homemanage/Banner';
import Shopbycategory from '@/homemanage/Shopbycategory';
import Advertise from '@/homemanage/Advertise';
import Shopbybrand from '@/homemanage/Shopbybrand';
import axios from 'axios';
import commonGetApis, { commonPostApis } from '@/commonapi/Commonapi';

const Page = () => {
  const [section, setSection] = useState(false);
  const [selectedSection, setSelectedSection] = useState('');
  const [renderedSections, setRenderedSections] = useState<string[]>([]);
  const [temp, setTemp] = useState("")

  const toggleSection = () => {
    setSection(!section);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name,id } = e.target;
    setSelectedSection(name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSection && !renderedSections.includes(selectedSection)) {
      setRenderedSections(prev => [...prev, selectedSection]);
    }
    setSection(false); 

    // const formdata = new FormData();
    // formdata.append("id","1")
    // try {
    //   const res = await commonPostApis("get_section","id");
    //   setTemp(res?.data?.result);
    // } catch (error) {
    //   console.log(error)
    // }

    // console.log("temporary",temp)
  };

  useEffect(() => {
    const savedSections = localStorage.getItem("renderedSections");
    if (savedSections) {
      setRenderedSections(JSON.parse(savedSections));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("renderedSections", JSON.stringify(renderedSections));
  }, [renderedSections]);

  const renderComponent = (section: string) => {
    switch (section) {
      case 'banner':
        return <Banner key="banner" />;
      case 'category':
        return <Shopbycategory key="category" />;
      case 'advertise':
        return <Advertise key="advertise" />;
      case 'brand':
        return <Shopbybrand key="brand" />;
      default:
        return null;
    }
  };


  return (
    <div className=''>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col px-2">
          <h1 className='text-3xl font-bold'>Home Management</h1>
          <p className='text-gray-500 mt-2'>Dashboard <span className='text-black ml-5'>Home Management</span> </p>
        </div>
        <div className='flex flex-col justify-end items-end'>
          <button className='bg-amber-300 px-5 py-2 font-bold ' onClick={toggleSection}>Add Section</button>
        </div>
      </div>

      <div className="space-y-5 mt-5">
        {renderedSections.map(section => renderComponent(section))}
      </div>

      <Dialog open={section} onClose={() => setSection(false)}>
        <div className='flex flex-col justify-center items-center'>
          <DialogContent>
            <form className='flex flex-col bg-white py-6 px-5 justify-center items-center' onSubmit={handleSubmit}>
              <h1 className='text-2xl font-bold'>Add Section</h1>
              <div className='flex flex-col justify-start mt-5 space-y-5'>
                <div className='flex flex-row space-x-5 justify-start'>
                  <input type='radio' name='banner' id='1' value='banner' onChange={handleChange} />
                  <label>Slider with Banner</label>
                </div>
                <div className='flex flex-row space-x-5 justify-start'>
                  <input type='radio' name='category' id='2' value='category' onChange={handleChange} />
                  <label>Slider with Category</label>
                </div>
                <div className='flex flex-row space-x-5 justify-start'>
                  <input type='radio' name='advertise' id='3' value='advertise' onChange={handleChange} />
                  <label>Slider with Advertisement</label>
                </div>
                <div className='flex flex-row space-x-5 justify-start'>
                  <input type='radio' name='brand' id='4' value='brand' onChange={handleChange} />
                  <label>Slider with Brand</label>
                </div>
              </div>
              <DialogActions>
                <div className='flex justify-center items-center mt-5'>
                  <button type='submit' className='px-6 py-2 bg-amber-400 font-bold'>Submit</button>
                </div>
              </DialogActions>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  )
}

export default Page;

'use client'
import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent } from '@mui/material';
import Banner from '@/homemanage/Banner';
import Shopbycategory from '@/homemanage/Shopbycategory';
import Advertise from '@/homemanage/Advertise';
import Shopbybrand from '@/homemanage/Shopbybrand';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Product from '@/homemanage/Product';

const getRenderedSectionsFromStorage = (): string[] => {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem("renderedSections");
    if (!stored) return [];
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

const Page = () => {
  const [section, setSection] = useState(false);
  const [selectedSection, setSelectedSection] = useState('');
  const [renderedSections, setRenderedSections] = useState<string[]>(() => getRenderedSectionsFromStorage());

  const router = useRouter();

  useEffect(() => {
    const refreshToken = localStorage.getItem("usertoken");
    if (!refreshToken) {
      router.replace('/');
    }
  }, [router]);

  // Save to localStorage every time renderedSections changes
  useEffect(() => {
    localStorage.setItem("renderedSections", JSON.stringify(renderedSections));
  }, [renderedSections]);

  const toggleSection = () => {
    setSection(!section);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setSelectedSection(name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedSection && !renderedSections.includes(selectedSection)) {
      setRenderedSections(prev => [...prev, selectedSection]);
    }
    setSection(false);

    let sectionId;
    switch (selectedSection) {
      case 'banner':
        sectionId = 1;
        break;
      case 'category':
        sectionId = 2;
        break;
      case 'advertise':
        sectionId = 3;
        break;
      case 'brand':
        sectionId = 4;
        break;
      default:
        sectionId = 1;
        break;
    }

    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("usertoken");
    const formdata = new URLSearchParams();
    formdata.append("id", sectionId.toString());
    formdata.append("fkSectionId", sectionId.toString());

    try {
      const res = await axios.post("http://192.168.2.181:3000/admin/add_section", formdata, {
        headers: {
          Authorizations: token ?? '',
          language: "en",
          refresh_token: refreshToken ?? '',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      console.log("Section added response:", res.data);
    } catch (error) {
      console.error(error);
    }
  };

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
      case 'product':
        return <Product key="product" />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col px-2">
          <h1 className='text-3xl font-bold'>Home Management</h1>
          <p className='text-gray-500 mt-2'>
            <Link href={`/admin/dashboard`}>Dashboard</Link>
            <span className='ml-2.5'>{`>`}</span>
            <span className='text-black ml-2.5'>Home Management</span>
          </p>
        </div>
        <div className='flex flex-col justify-end items-end'>
          <button className='bg-amber-300 px-5 py-2 font-bold cursor-pointer' onClick={toggleSection}>Add Section</button>
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
                  <input
                    type='radio'
                    name='banner'
                    id='1'
                    value='banner'
                    checked={selectedSection === "banner"}
                    onChange={handleChange}
                  />
                  <label htmlFor='banner'>Slider with Banner</label>
                </div>
                <div className='flex flex-row space-x-5 justify-start'>
                  <input
                    type='radio'
                    name='category'
                    id='2'
                    value='category'
                    checked={selectedSection === "category"}
                    onChange={handleChange}
                  />
                  <label htmlFor='category'>Slider with Category</label>
                </div>
                <div className='flex flex-row space-x-5 justify-start'>
                  <input
                    type='radio'
                    name='advertise'
                    id='3'
                    value='advertise'
                    checked={selectedSection === "advertise"}
                    onChange={handleChange}
                  />
                  <label htmlFor='advertise'>Slider with Advertisement</label>
                </div>
                <div className='flex flex-row space-x-5 justify-start'>
                  <input
                    type='radio'
                    name='brand'
                    id='4'
                    value='brand'
                    checked={selectedSection === "brand"}
                    onChange={handleChange}
                  />
                  <label htmlFor='brand'>Slider with Brand</label>
                </div>
                <div className='flex flex-row space-x-5 justify-start'>
                  <input
                    type='radio'
                    name='product'
                    id='5'
                    value='product'
                    checked={selectedSection === "product"}
                    onChange={handleChange}
                  />
                  <label htmlFor='brand'>Product Info</label>
                </div>
              </div>
              <DialogActions>
                <div className='flex justify-center items-center mt-5 cursor-pointer'>
                  <button type='submit' className='px-6 py-2 bg-amber-400 font-bold'>Submit</button>
                </div>
              </DialogActions>
            </form>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
};

export default Page;

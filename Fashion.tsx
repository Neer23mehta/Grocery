'use client';
import React, { useEffect, useRef, useState } from 'react';
import { ClickAwayListener, Paper, Popper, Skeleton } from '@mui/material';
import Image from 'next/image';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { GiConverseShoe, GiClothes } from 'react-icons/gi';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import clothingData from '../Grocery/Fashiondb';
import footwearData from '../Grocery/Fashionadb';

const images = [
  'https://images.unsplash.com/photo-1584680226833-0d680d0a0794?q=80&w=1740&auto=format&fit=crop',
  'https://media.istockphoto.com/id/1128687123/photo/shopping-bag-full-of-fresh-vegetables-and-fruits.webp',
  'https://images.unsplash.com/photo-1545601445-4d6a0a0565f0?q=80&w=1548&auto=format&fit=crop',
];

const staticCategory = [
  {
    image: 'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?q=80&w=400',
    value: 'Mens',
  },
  {
    image: 'https://images.unsplash.com/photo-1614907634002-65ac4cb74acb?q=80&w=400',
    value: 'Womens',
  },
  {
    image: 'https://images.unsplash.com/photo-1556767576-5ec41e3239ea?q=80&w=400',
    value: 'Kids',
  },
  {
    image: 'https://images.unsplash.com/photo-1498579397066-22750a3cb424?w=400',
    value: 'Baby',
  },
];

const SamplePrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
    >
      <IoChevronBackOutline size={20} />
    </button>
  );
};

const SampleNextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
    >
      <IoChevronForwardOutline size={20} />
    </button>
  );
};

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 4000,
  prevArrow: <SamplePrevArrow />,
  nextArrow: <SampleNextArrow />,
};

const Fashion = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  // ✅ New state for fashion products
  const [allFashionData, setAllFashionData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'men' | 'women'>('all');

  // ✅ Load clothing & footwear mock data on mount
  useEffect(() => {
    const combined = [...clothingData, ...footwearData];
    setAllFashionData(combined);
  }, []);

  // ✅ Optional: Load external products (keeping original logic)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res3 = await axios.get('https://api.escuelajs.co/api/v1/products');
        setProducts(res3.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load products:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ✅ Filter data by men/women/all
  const filteredFashion = selectedCategory === 'all'
    ? allFashionData
    : allFashionData.filter(item => item.category === selectedCategory);

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Product Showcase</h1>

      <section className="relative mb-10">
        <div className="h-[410px] overflow-hidden rounded-md">
          <Slider {...settings}>
            {images.map((src, idx) => (
              <div key={idx} className="relative h-[410px] w-full">
                <Image
                  src={src}
                  alt={`slide-${idx}`}
                  fill
                  unoptimized
                  className="object-cover rounded-md"
                />
              </div>
            ))}
          </Slider>
        </div>
      </section>

      <section className="mb-10">
        <button
          onClick={() => setOpen(!open)}
          ref={anchorRef}
          className="text-2xl font-semibold mb-4"
        >
          Categories
        </button>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {staticCategory.map((cat, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md p-3 rounded text-center transition hover:shadow-lg"
            >
              <img
                src={cat.image}
                alt={cat.value}
                className="w-full h-24 object-cover rounded mb-2"
              />
              <h3 className="text-md font-medium">{cat.value}</h3>
            </div>
          ))}
        </div>

        <Popper open={open} anchorEl={anchorRef.current} placement="bottom-end" style={{ zIndex: 1300 }}>
          <ClickAwayListener onClickAway={() => setOpen(false)}>
            <Paper className="bg-white shadow-md space-y-2 w-45 p-2">
              <button className="flex items-center text-xl space-x-2 hover:bg-amber-400 w-full p-2">
                <GiClothes />
                <span>Clothing</span>
              </button>
              <button className="flex items-center text-xl space-x-2 hover:bg-amber-400 w-full p-2">
                <GiConverseShoe />
                <span>Shoes</span>
              </button>
              <button className="flex items-center text-xl space-x-2 hover:bg-amber-400 w-full p-2">
                <GiClothes />
                <span>Furniture</span>
              </button>
              <button className="flex items-center text-xl space-x-2 hover:bg-amber-400 w-full p-2">
                <GiClothes />
                <span>Mobile</span>
              </button>
            </Paper>
          </ClickAwayListener>
        </Popper>
      </section>

      {/* ✅ Filter Buttons */}
      <div className="flex gap-4 justify-center mb-6">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded ${selectedCategory === 'all' ? 'bg-blue-600 text-white' : 'bg-white border'}`}
        >
          All
        </button>
        <button
          onClick={() => setSelectedCategory('men')}
          className={`px-4 py-2 rounded ${selectedCategory === 'men' ? 'bg-blue-600 text-white' : 'bg-white border'}`}
        >
          Men
        </button>
        <button
          onClick={() => setSelectedCategory('women')}
          className={`px-4 py-2 rounded ${selectedCategory === 'women' ? 'bg-blue-600 text-white' : 'bg-white border'}`}
        >
          Women
        </button>
      </div>

      {/* ✅ Filtered Fashion Items */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-center">Fashion - Clothing & Footwear</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredFashion.slice(0, 20).map((item: any) => (
            <div key={item.id} className="bg-white p-4 shadow-md rounded">
              <img
                src={item.image}
                alt={item.title}
                className="h-48 w-full object-contain mb-3 rounded"
              />
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-600 capitalize">{item.category} - {item.type}</p>
              <span className="font-bold text-green-600">${item.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Original API Products */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">EscuelaJS Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="bg-white p-4 shadow-md rounded">
                  <Skeleton variant="rectangular" width={210} height={118} />
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="80%" />
                  <Skeleton variant="text" width="40%" />
                </div>
              ))
            : products.slice(0, 8).map((item: any) => (
                <div key={item.id} className="bg-white p-4 shadow-md rounded">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="h-48 w-full object-contain mb-3 rounded"
                  />
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {item.description?.slice(0, 80)}...
                  </p>
                  <span className="font-bold text-green-600">${item.price}</span>
                </div>
              ))}
        </div>
      </section>
    </div>
  );
};

export default Fashion;

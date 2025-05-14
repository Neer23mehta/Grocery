'use client'
import React, { useEffect, useRef, useState } from 'react';
import { ClickAwayListener, Paper, Popper, Skeleton } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import { Uassets } from '@/Uassets/uassets';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { GiConverseShoe } from "react-icons/gi";
import { GiClothes } from "react-icons/gi";

const images = [
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    Uassets.mobile
];


const Homes = () => {
    const [data, setData] = useState([]);
    const [category, setCategory] = useState([]);
    const [products, setProducts] = useState([]);
    const [dummy, setDummy] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [open, setOpen] = useState(false)
    const anchorRef = useRef(null);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://api.escuelajs.co/api/v1/products');
                const res2 = await axios.get('https://api.escuelajs.co/api/v1/categories');
                const res3 = await axios.get('https://fakestoreapi.com/products');
                const res4 = await axios.get('https://dummyjson.com/products');
                setData(res.data);
                setCategory(res2.data);
                setProducts(res3.data);
                setDummy(res4.data.products);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    console.log("products",products)
    return (
        <div className="p-5 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center">All Products Overview</h1>
            <section className="relative">
                <div className="flex justify-center items-center mb-3 h-[410px] w-full relative overflow-hidden rounded-md">
                    <Image
                        src={images[currentIndex]}
                        alt={`slide-${currentIndex}`}
                        fill
                        unoptimized
                        className="object-cover"
                    />

                    <button
                        onClick={handlePrev}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow hover:bg-gray-200 z-10"
                    >
                        <IoChevronBackOutline size={20} />
                    </button>

                    <button
                        onClick={handleNext}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow hover:bg-gray-200 z-10"
                    >
                        <IoChevronForwardOutline size={20} />
                    </button>
                </div>

                <div className="text-center text-gray-600 font-medium">
                    {currentIndex + 1} / {images.length}
                </div>
            </section>

            <section className="mb-10">
                <button onClick={() => setOpen(!open)} ref={anchorRef} className="text-2xl font-semibold mb-4">Categories</button>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {loading
                        ? Array.from({ length: 5 }).map((_, index) => (
                            <Skeleton key={index} variant="rectangular" width={150} height={100} />
                        ))
                        : category.slice(0,5).map((cat: any) => (
                            <div key={cat.id} className="bg-white shadow-md p-3 rounded text-center">
                                <img src={cat.image} alt={cat.name} className="w-full h-24 object-cover rounded mb-2" />
                                <h3 className="text-md font-medium">{cat.name}</h3>
                            </div>
                        ))}
                         <Popper open={open} anchorEl={anchorRef.current} placement="bottom-end" style={{ zIndex: 1300 }}>
                            <ClickAwayListener onClickAway={() => setOpen(false)}>
                                <Paper className="bg-white shadow-md space-y-2 w-45">
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
                                    <button className="flex items-center text-xl space-x-2 hover:bg-amber-400 w-full p-2">
                                    <GiClothes />
                                    <span>Miscellaneous</span>
                                    </button>
                                </Paper>
                            </ClickAwayListener>
                        </Popper>
                </div>
            </section>

            <section className="mb-10">
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
                        : data.slice(0, 8).map((item: any) => (
                            <div key={item.id} className="bg-white p-4 shadow-md rounded">
                                <img src={item.images?.[0]} alt={item.title} className="h-48 w-full object-cover mb-3 rounded" />
                                <h3 className="text-lg font-semibold">{item.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">{item.description.slice(0, 80)}...</p>
                                <span className="font-bold text-green-600">${item.price}</span>
                            </div>
                        ))}
                </div>
            </section>

            <section className="mb-10">
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
                                <img src={item.image} alt={item.title} className="h-48 w-full object-contain mb-3 rounded" />
                                <h3 className="text-lg font-semibold">{item.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">{item.description.slice(0, 80)}...</p>
                                <span className="font-bold text-green-600">${item.price}</span>
                            </div>
                        ))}
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">DummyJSON Products</h2>
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
                        : dummy.slice(0, 8).map((item: any) => (
                            <div key={item.id} className="bg-white p-4 shadow-md rounded">
                                <img src={item.thumbnail} alt={item.title} className="h-48 w-full object-cover mb-3 rounded" />
                                <h3 className="text-lg font-semibold">{item.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">{item.description.slice(0, 80)}...</p>
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-purple-600">${item.price}</span>
                                    <span className="text-sm text-gray-500">⭐ {item.rating}</span>
                                </div>
                            </div>
                        ))}
                </div>
            </section>
        </div>
    );
};

export default Homes;

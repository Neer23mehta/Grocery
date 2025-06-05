'use client'
import React, { useEffect, useRef, useState } from 'react';
import { ClickAwayListener, Paper, Popper, Skeleton } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { GiConverseShoe } from "react-icons/gi";
import { GiClothes } from "react-icons/gi";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const images = [
    'https://images.unsplash.com/photo-1584680226833-0d680d0a0794?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://media.istockphoto.com/id/1128687123/photo/shopping-bag-full-of-fresh-vegetables-and-fruits.webp?a=1&b=1&s=612x612&w=0&k=20&c=L-Zpt35Y33EigE1YdnRhozUlpppV6yYx4pQ7X5rBq30=',
    'https://images.unsplash.com/photo-1545601445-4d6a0a0565f0?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1516594798947-e65505dbb29d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1498579397066-22750a3cb424?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z3JvY2VyeXxlbnwwfHwwfHx8MA%3D%3D',
    'https://images.unsplash.com/photo-1566454825481-4e48f80aa4d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fGdyb2Nlcnl8ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1614907634002-65ac4cb74acb?q=80&w=1586&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1556767576-5ec41e3239ea?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1549482218-02ef268be586?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIxfHxncm9jZXJ5fGVufDB8fDB8fHww'
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
    nextArrow: <SampleNextArrow />
};

const Grocery = () => {
    const [data, setData] = useState([]);
    const [category, setCategory] = useState([]);
    const [products, setProducts] = useState([]);
    const [dummy, setDummy] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false)
    const anchorRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res2 = await axios.get('https://api.escuelajs.co/api/v1/categories');
                const res3 = await axios.get('https://fakestoreapi.com/products');
                const res4 = await axios.get('https://dummyjson.com/products');
                const res = await axios.get('https://fakestoreapi.in/api/products');
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

    console.log("products", data)
    return (
        <div className="p-5 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center">All Products Overview</h1>
            <section className="relative">
                <div className="mb-6 h-[410px] w-full overflow-hidden rounded-md">
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
                <button onClick={() => setOpen(!open)} ref={anchorRef} className="text-2xl font-semibold mb-4">Categories</button>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {loading
                        ? Array.from({ length: 5 }).map((_, index) => (
                            <Skeleton key={index} variant="rectangular" width={150} height={100} />
                        ))
                        : category.slice(0, 5).map((cat: any) => (
                            <div key={cat.id} className="bg-white shadow-md p-3 rounded text-center">
                                <Zoom>
                                <img src={cat.image} alt={cat.name} className="w-full h-24 object-cover rounded mb-2" />
                                </Zoom>
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

export default Grocery;

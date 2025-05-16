'use client'
import React, { useEffect, useRef, useState } from 'react';
import { ClickAwayListener, Paper, Popper, Skeleton } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import { Uassets } from '@/Uassets/uassets';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { GiConverseShoe } from "react-icons/gi";
import { GiClothes } from "react-icons/gi";
import commonGetApis from '@/commonapi/Commonapi';
import { assets } from '@/assests/assets';
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
    const [currentIndex, setCurrentIndex] = useState(0);
    // const [inputImage, setInputImage] = useState<File | null>(null);
    // const [bgRemovedImage, setBgRemovedImage] = useState<string | null>(null);
    // const [bgRemoving, setBgRemoving] = useState(false);

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

    // const handleRemoveBackground = async () => {
    //     if (!inputImage) return;

    //     const formData = new FormData();
    //     formData.append("image_file", inputImage);

    //     setBgRemoving(true);
    //     try {
    //         const response = await fetch("https://sdk.photoroom.com/v1/segment", {
    //             method: "POST",
    //             headers: {
    //                 "x-api-key": "2d713df8038483ee734694808aeed51c72f3d1af"
    //             },
    //             body: formData
    //         });

    //         if (!response.ok) throw new Error("Failed to process image");

    //         const blob = await response.blob();
    //         const imageUrl = URL.createObjectURL(blob);
    //         setBgRemovedImage(imageUrl);
    //     } catch (err) {
    //         console.error(err);
    //         alert("Error removing background.");
    //     }
    //     setBgRemoving(false);
    // };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const res = await commonGetApis("get_all_home_management?fk_section_id=4");
                const res2 = await axios.get('https://api.escuelajs.co/api/v1/categories');
                const res3 = await axios.get('https://fakestoreapi.com/products');
                const res4 = await axios.get('https://dummyjson.com/products');
                const res = await axios.get('https://fakestoreapi.in/api/products');
                setData(res.data);
                // setData(res?.data?.result || []);
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

            {/* <section className="mt-10">
                <h2 className="text-2xl font-semibold mb-4">Try Background Removal</h2>
                <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto text-center">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setInputImage(e.target.files?.[0] || null)}
                        className="mb-4"
                    />
                    <button
                        onClick={handleRemoveBackground}
                        disabled={!inputImage || bgRemoving}
                        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                    >
                        {bgRemoving ? "Processing..." : "Remove Background"}
                    </button>

                    {bgRemovedImage && (
                        <div className="mt-6">
                            <h3 className="text-lg font-medium mb-2">Result:</h3>
                            <img src={bgRemovedImage} alt="Background Removed" className="w-full rounded" />
                        </div>
                    )}
                </div>
            </section> */}

            <section className="mb-10">
                <button onClick={() => setOpen(!open)} ref={anchorRef} className="text-2xl font-semibold mb-4">Categories</button>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {loading
                        ? Array.from({ length: 5 }).map((_, index) => (
                            <Skeleton key={index} variant="rectangular" width={150} height={100} />
                        ))
                        : category.slice(0, 5).map((cat: any) => (
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


            {/* <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">EscuelaJS Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {loading ? (
                        Array.from({ length: 8 }).map((_, index) => (
                            <div key={index} className="bg-white p-4 shadow-md rounded">
                                <Skeleton variant="rectangular" width={210} height={118} />
                                <Skeleton variant="text" width="60%" />
                                <Skeleton variant="text" width="80%" />
                                <Skeleton variant="text" width="40%" />
                            </div>
                        ))
                    ) : (
                        data?.map((curval: any, index: number) =>
                            curval.section_advertisements?.map((ad: any, idx: number) => (
                                <div key={ad.id} className="relative bg-white p-4 shadow-md rounded">
                                    <button
                                        // onClick={() => handleAdvertiseDelete(ad.id)}
                                        className="absolute top-2 right-2 z-10"
                                    >
                                        <Image
                                            src={assets.cancel}
                                            alt="remove"
                                            width={26}
                                            height={26}
                                            className="cursor-pointer"
                                        />
                                    </button>
                                    <Zoom>
                                        <Image
                                            src={ad.image}
                                            alt={`banner-${idx}`}
                                            width={250}
                                            height={140}
                                            className="h-[140px] w-[250px] border border-gray-300 object-cover rounded-md shadow-sm hover:shadow-md transition-shadow duration-200"
                                        />
                                    </Zoom>
                                </div>
                            ))
                        )
                    )}
                </div>
            </section> */}

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

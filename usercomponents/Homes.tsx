'use client'
import React, { useEffect, useRef, useState } from 'react';
import { ClickAwayListener, Paper, Popper, Skeleton } from '@mui/material';
import axios from 'axios';
import Image from 'next/image';
import { Uassets } from '@/Uassets/uassets';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { GiConverseShoe } from "react-icons/gi";
import { GiClothes } from "react-icons/gi";
import { BsSmartwatch } from "react-icons/bs";
import { LuSofa } from "react-icons/lu";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaTshirt } from "react-icons/fa";
import { GiSchoolBag } from "react-icons/gi";
import { GiGemChain } from "react-icons/gi";
import { GiDelicatePerfume } from "react-icons/gi";
import { ImMakeGroup } from "react-icons/im";
import Slider from 'react-slick';

const images = [
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    Uassets.mobile
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

const Homes = () => {
    const [data, setData] = useState([]);
    const [category, setCategory] = useState([]);
    const [products, setProducts] = useState([]);
    const [dummy, setDummy] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false)
    const [openPro, setOpenPro] = useState(false)
    const [openPros, setOpenPros] = useState(false)
    const [openPross, setOpenPross] = useState(false)
    const anchorRef = useRef(null);
    const anchorRefPro = useRef(null);
    const anchorRefPros = useRef(null);
    const anchorRefPross = useRef(null);
    const route = useRouter();
    const handleSofa = () => {
        route.push('/user/sofas')
    }
    const handleWatch = () => {
        route.push('/user/watches')
    }
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

    console.log("products", category)
    return (
        <div className="p-5 bg-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-center">All Products Overview</h1>
            <section className="relative">
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
            </section>
            <section className="mb-10">
                <button onClick={() => setOpen(!open)} ref={anchorRef} className="text-2xl font-semibold mb-4 mt-2">Categories</button>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {loading
                        ? Array.from({ length: 5 }).map((_, index) => (
                            <Skeleton key={index} variant="rectangular" width={150} height={100} />
                        ))
                        : category.slice(0, 5).map((cat: any) => (
                            <Link href={`/user/${cat.name.toLowerCase()}`} key={cat.id}>
                                <div key={cat.id} className="bg-white shadow-md p-3 rounded text-center">
                                    <img src={cat.image} alt={cat.name} className="w-full h-24 object-cover rounded mb-2" />
                                    <h3 className="text-md font-medium">{cat.name}</h3>
                                </div>
                            </Link>
                        ))}
                    <Popper open={open} anchorEl={anchorRef.current} placement="bottom-end" style={{ zIndex: 1300 }}>
                        <ClickAwayListener onClickAway={() => setOpen(false)}>
                            <Paper className="bg-white shadow-md space-y-2 w-45">
                                <button className="flex items-center text-xl space-x-2 hover:bg-amber-400 w-full p-2">
                                    <GiClothes />
                                    <Link href="/user/fashion">Clothing</Link>
                                </button>
                                <button className="flex items-center text-xl space-x-2 hover:bg-amber-400 w-full p-2">
                                    <GiConverseShoe />
                                    <Link href="/user/fashion">Shoes</Link>
                                </button>
                                <button className="flex items-center text-xl space-x-2 hover:bg-amber-400 w-full p-2">
                                    <GiClothes />
                                    <Link href="/user/sofas">Furniture</Link>
                                </button>
                                <button className="flex items-center text-xl space-x-2 hover:bg-amber-400 w-full p-2">
                                    <GiClothes />
                                    <Link href="/user/mobile">Mobile</Link>
                                </button>
                                <button className="flex items-center text-xl space-x-2 hover:bg-amber-400 w-full p-2">
                                    <GiClothes />
                                    <Link href="/user/bagpack">Miscellaneous</Link>
                                </button>
                            </Paper>
                        </ClickAwayListener>
                    </Popper>
                </div>
            </section>
            <section className="mb-10">
                <button className="text-2xl font-semibold mb-4" onClick={() => setOpenPro(!openPro)} ref={anchorRefPro}>EscuelaJS Products</button>
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
                            <Link key={item.id} href={`/user/home/${item.id}`}>
                                <div key={item.id} className="bg-white p-4 shadow-md rounded">
                                    <img src={item.images?.[0]} alt={item.title} className="h-48 w-full object-cover mb-3 rounded" />
                                    <h3 className="text-lg font-semibold">{item.title}</h3>
                                    <p className="text-sm text-gray-600 mb-2">{item.description.slice(0, 80)}...</p>
                                    <span className="font-bold text-green-600">${item.price}</span>
                                </div>
                            </Link>
                        ))}
                    <Popper open={openPro} anchorEl={anchorRefPro.current} placement="bottom-end" style={{ zIndex: 1300 }}>
                        <ClickAwayListener onClickAway={() => setOpenPro(false)}>
                            <Paper className="bg-white shadow-md space-y-2 w-45">
                                <button className="flex items-center text-xl space-x-2 hover:bg-amber-400 w-full p-2" onClick={handleWatch}>
                                    <BsSmartwatch />
                                    <span>Watches</span>
                                </button>
                                <button className="flex items-center text-xl space-x-2 hover:bg-amber-400 w-full p-2" onClick={handleSofa}>
                                    <LuSofa />
                                    <span>Sofa-set</span>
                                </button>
                            </Paper>
                        </ClickAwayListener>
                    </Popper>
                </div>
            </section>
            <section className="mb-10">
                <button className="text-2xl font-semibold mb-4" onClick={() => setOpenPros(!openPros)} ref={anchorRefPros}>EscuelaJS Products</button>
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
                            <Link key={item.id} href={`/user/home/${item.id}`}>
                                <div key={item.id} className="bg-white p-4 shadow-md rounded">
                                    <img src={item.image} alt={item.title} className="h-48 w-full object-contain mb-3 rounded" />
                                    <h3 className="text-lg font-semibold">{item.title}</h3>
                                    <p className="text-sm text-gray-600 mb-2">{item.description.slice(0, 80)}...</p>
                                    <span className="font-bold text-green-600">${item.price}</span>
                                </div>
                            </Link>
                        ))}
                    <Popper open={openPros} anchorEl={anchorRefPros.current} placement="bottom-end" style={{ zIndex: 1300 }}>
                        <ClickAwayListener onClickAway={() => setOpenPros(false)}>
                            <Paper className="bg-white shadow-md space-y-2 w-45">
                                <Link href="/user/jwellery" className="flex items-center text-xl space-x-2 hover:bg-amber-400 w-full p-2">
                                    <GiGemChain />
                                    <span>Jwellery</span>
                                </Link>
                                <Link href="/user/mens" className="flex items-center text-xl space-x-2 hover:bg-amber-400 w-full p-2">
                                    <FaTshirt />
                                    <span>Men's Clothes</span>
                                </Link>
                                <Link href="/user/bagpack" className="flex items-center text-xl space-x-2 hover:bg-amber-400 w-full p-2">
                                    <GiSchoolBag />
                                    <span>Bag-packs</span>
                                </Link>
                            </Paper>
                        </ClickAwayListener>
                    </Popper>
                </div>
            </section>
            <section>
                <button className="text-2xl font-semibold mb-4" onClick={() => setOpenPross(!openPross)} ref={anchorRefPross}>DummyJSON Products</button>
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
                    <Popper open={openPross} anchorEl={anchorRefPross.current} placement="bottom-end" style={{ zIndex: 1300 }}>
                        <ClickAwayListener onClickAway={() => setOpenPross(false)}>
                            <Paper className="bg-white shadow-md space-y-2 w-45">
                                <Link href="/user/perfume" className="flex items-center text-xl space-x-2 hover:bg-amber-400 w-full p-2">
                                    <GiDelicatePerfume />
                                    <span>Perfumes</span>
                                </Link>
                                <Link href="/user/makeups" className="flex items-center text-xl space-x-2 hover:bg-amber-400 w-full p-2">
                                    <ImMakeGroup />
                                    <span>Makeups</span>
                                </Link>
                            </Paper>
                        </ClickAwayListener>
                    </Popper>
                </div>
            </section>
        </div>
    );
};

export default Homes;

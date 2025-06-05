'use client';
import React from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addProduct } from '@/app/redux/slice';
import axios from 'axios';
import Slider from 'react-slick';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useQuery } from '@tanstack/react-query';

interface Product {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  title: string;
}

const SamplePrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <button onClick={onClick} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100">
    <IoChevronBackOutline size={20} />
  </button>
);

const SampleNextArrow = ({ onClick }: { onClick?: () => void }) => (
  <button onClick={onClick} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100">
    <IoChevronForwardOutline size={20} />
  </button>
);

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  arrows: true,
  prevArrow: <SamplePrevArrow />,
  nextArrow: <SampleNextArrow />,
};

const Main = () => {
  const dispatch = useDispatch();

  const {data: products,isLoading,isError,error} = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await axios.get('https://fakestoreapi.com/products');
      return response.data;
    },
    staleTime: 10000,
  });

  const handleAddToCart = (product: Product) => {
    dispatch(
      addProduct({
        Product_Name: product.title,
        Description: product.description,
        Image: product.image,
        Price: product.price,
        Stock_Status: 1,
        Variation: '',
        Category_Name: product.category,
        Id: product.id,
        Product_var_id: product.id,
      })
    );
    toast.success(`${product.title} added to cart`);
  };

  if (isLoading) return <div className="text-center py-10">Loading products...</div>;
  if (isError) {
    console.error(error);
    return <div className="text-center text-red-500 py-10">Failed to load products</div>;
  }

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center">All Products Overview</h1>

      {products && products.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
          <Slider {...sliderSettings}>
            {products.slice(0, 9).map((item) => (
              <div key={item.id} className="px-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden h-full flex flex-col">
                  <div className="relative w-full h-68">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      unoptimized
                      className="object-contain p-4"
                    />
                  </div>
                  <div className="p-4 flex flex-col justify-between items-center h-auto">
                    <h3 className="font-semibold text-lg text-center">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-semibold mb-5">All Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.length === 0 && <p>No products found.</p>}
          {products?.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full"
            >
              <div className="relative w-full h-48">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  unoptimized
                  className="object-contain p-4"
                />
              </div>
              <div className="p-4 flex flex-col justify-between h-[200px]">
                <h3 className="font-semibold text-lg mb-1">
                  {item.title.slice(0, 35)}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {item.description.slice(0, 35)}
                </p>
                <div className="mt-auto">
                  <p className="font-bold text-amber-500 text-xl">${item.price}</p>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="mt-2 w-full bg-amber-500 text-white py-2 rounded hover:bg-amber-600 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Main;

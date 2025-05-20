'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const Productdetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);

  const fetchDataID = async () => {
    try {
      const res = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    if (id) fetchDataID();
  }, [id]);

  if (!product) return <div className="text-center mt-10 text-lg">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-100 flex items-center justify-center p-4">
          <img
            src={product.images?.[0] || '/placeholder.png'}
            alt={product.title}
            className="object-contain max-h-[500px] w-full"
          />
        </div>

        <div className="p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-4 text-gray-800">{product.title}</h1>
            <p className="text-gray-600 text-base mb-6 leading-relaxed">{product.description}</p>
          </div>
          <div>
            <span className="text-2xl font-semibold text-green-600">${product.price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productdetail;

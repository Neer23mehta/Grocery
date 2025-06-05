'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import mockProducts from '@/Grocery/Product'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { addProduct } from '@/app/redux/slice'
import { toast } from 'react-toastify'

interface Product {
    id: number
    name: string
    price: number
    image: string
    description: string
    brand: string
    capacity: string
    color: string
    type: string
    material: string
    stone: string
    shade: string
    section: number
    screen: string
    camera: string
    storage: string
    fragrance: string
    size: string
}

const Page = () => {
    const params = useParams<{ id: string }>()
    const [product, setProduct] = useState<Product | null>(null)
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchProduct = async () => {
            if (params.id) {
                const foundProduct = mockProducts.find(item => item.id === params.id)
                setProduct(foundProduct || null)
            }
        }

        fetchProduct()
    }, [params.id])
    const handleAddToCart = (product: Product) => {
        dispatch(
            addProduct({
                Product_Name: product.name,
                Description: product.name,
                Image: product.image,
                Price: product.price,
                Stock_Status: 1,
                Variation: '',
                Category_Name: product.brand,
                Id: product.id,
                Product_var_id: product.id,
                Capacity: product.storage,
                Fragrance: product.fragrance,
                Color: product.color,
                Size: product.size,
                Storage: product.storage,
            })
        );
        toast.success(`${product.name} added to cart`);
    }
    if (!product) {
        return <div>Loading...</div>
    }

    return (
        <div className="max-w-md mx-auto mt-10 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl">
            <div className="relative">
                <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-contain mt-5 object-center rounded-t-lg"
                />
                <div className="absolute top-2 right-2 bg-white text-xs text-gray-800 px-2 py-1 rounded-full shadow-md">
                    {product.brand}
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900 truncate">{product.name}</h3>
                <p className="text-sm text-gray-600 mt-1">Screen: {product.screen}</p>
                <p className="text-sm text-gray-600 mt-1">Storage: {product.storage}</p>
                <p className="text-xl font-bold text-gray-900 mt-2">₹{product.price}</p>
                <button
                onClick={() => handleAddToCart(product)}
                className="mt-5 w-full bg-amber-500 text-white py-2 rounded hover:bg-amber-600 transition"
              >
                Add to Cart
              </button>
            </div>
        </div>
    )
}

export default Page

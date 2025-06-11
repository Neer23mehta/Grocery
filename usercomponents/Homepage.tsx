'use client'
import React, { useEffect, useState } from 'react'
import mockProducts from '@/Grocery/Product'
import Image from 'next/image'
import Link from 'next/link'

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
  strap: string
}

const sectionLabels: Record<number, string> = {
  1: 'Makeup',
  2: 'Perfume',
  3: 'Sofa',
  4: 'Watch',
  5: 'Mobile Phone',
  6: 'Jewelry',
  7: 'Backpack'
}

const Homepage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedSection, setSelectedSection] = useState<number | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(mockProducts as any)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleSectionChange = (section: number) => {
    setSelectedSection(section)
  }

  const filteredProducts = selectedSection
    ? products.filter(item => item.section === selectedSection).slice(0, 8)
    : products.slice(0, 8)

  return (
    <div>
      <div className="section-filters flex flex-wrap gap-4 mb-6 justify-center items-center mt-7">
        {Object.entries(sectionLabels).map(([sectionId, label]) => (
          <button
            key={sectionId}
            onClick={() => handleSectionChange(Number(sectionId))}
            className="filter-button relative px-6 py-3 bg-gray-100 border border-gray-300 rounded-lg overflow-hidden group hover:bg-gray-200 transition-all duration-300 ease-in-out"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative z-10 text-sm font-medium text-gray-800 group-hover:text-white">
              {label}
            </span>
          </button>
        ))}
        <button
          onClick={() => setSelectedSection(null)}
          className="filter-button relative px-6 py-3 bg-gray-100 border border-gray-300 rounded-lg overflow-hidden group hover:bg-gray-200 transition-all duration-300 ease-in-out"
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="relative z-10 text-sm font-medium text-gray-800 group-hover:text-white">
            All
          </span>
        </button>
      </div>
      <div className="product-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(item => (
            <div key={item.id} className="product-item bg-white border border-gray-200 p-4 rounded-lg shadow-md">
              <Link href={`homes/${item.id}`}>
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-t-lg mb-4" />
                <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                <p className="text-xl font-bold text-gray-800">₹{item.price}</p>
              </Link>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No products found in this category.</p>
        )}
      </div>

      <h1 className="font-bold ml-28 mt-10 text-4xl bg-gradient-to-r from-red-500 to via-indigo-500 to-purple-500 bg-clip-text text-transparent">
        Mobile Phones
      </h1>
      <div className='flex justify-center w-full shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] mr-15'>
        <div className="product-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 justify-center mb-5">
          {products
            .filter((item) => item.section === 5).slice(0, 12)
            .map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl"
              >
                <Link href={`homes/${item.id}`}>
                  <div className="relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-contain mt-5 object-center rounded-t-lg"
                    />
                    <div className="absolute top-2 right-2 bg-white text-xs text-gray-800 px-2 py-1 rounded-full shadow-md">
                      {item.brand}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{item.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">Screen: {item.screen}</p>
                    <p className="text-sm text-gray-600 mt-1">Storage: {item.storage}</p>
                    <p className="text-xl font-bold text-gray-900 mt-2">₹{item.price}</p>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>

      <h1 className="font-bold ml-28 mt-10 text-4xl bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
        Watches
      </h1>
      <div className='flex justify-center w-full shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] mr-15'>
        <div className="product-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 justify-center mb-5">
          {products
            .filter((item) => item.section === 4).slice(0, 8)
            .map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl"
              >
                <Link href={`homes/${item.id}`}>
                  <div className="relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-contain mt-5 object-center rounded-t-lg"
                    />
                    <div className="absolute top-2 right-2 bg-white text-xs text-gray-800 px-2 py-1 rounded-full shadow-md">
                      {item.brand}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{item.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">Color: {item.color}</p>
                    <p className="text-sm text-gray-600 mt-1">Type: {item.type}</p>
                    <p className="text-sm text-gray-600 mt-1">Strap: {item.strap}</p>
                    <p className="text-xl font-bold text-gray-900 mt-2">₹{item.price}</p>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
      <h1 className="font-bold ml-28 mt-10 text-4xl bg-gradient-to-r from-purple-500 via-blue-500 via-indigo-500 to-red-700 bg-clip-text text-transparent">
        Perfumes
      </h1>
      <div className='flex justify-center w-full shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] mr-15'>
        <div className="product-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-10 justify-center mb-5">
          {products
            .filter((item) => item.section === 2).slice(0, 8)
            .map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl"
              >
                <Link href={`homes/${item.id}`}>
                  <div className="relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-contain mt-5 object-center rounded-t-lg"
                    />
                    <div className="absolute top-2 right-2 bg-white text-xs text-gray-800 px-2 py-1 rounded-full shadow-md">
                      {item.brand}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{item.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">Fragrance: {item.fragrance}</p>
                    <p className="text-sm text-gray-600 mt-1">Type: {item.type}</p>
                    <p className="text-xl font-bold text-gray-900 mt-2">₹{item.price}</p>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Homepage


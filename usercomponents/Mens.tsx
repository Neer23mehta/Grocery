'use client'
import React, { useEffect, useState } from 'react'
import clothingData from '../Grocery/Fashiondb'

interface Clothes {
  id: number
  title: string
  category: string
  type: string
  price: number
  image: string
}

const Mens = () => {
  const [mens, setMens] = useState<Clothes[]>([])
  const [search, setSearch] = useState<string>('')
  useEffect(() => {
    const timer = setTimeout(() => {
      const menClothes = clothingData.filter((item) => item.category === 'men')
      setMens(menClothes)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const filtered = mens.filter(item => item.title.toLowerCase().includes(search.toLowerCase())|| item.category.toLowerCase().includes(search.toLowerCase())||item.type.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Men's Clothes</h1>
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search Men's Clothes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((item) => (
          <div key={item.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={item.image} alt={item.title} className="w-full h-56 object-contain" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-600 mb-1"><span className="font-medium">Category:</span> {item.category}</p>
              <p className="text-gray-600 mb-1"><span className="font-medium">Type:</span> {item.type}</p>
              <p className="text-gray-600 mb-1"><span className="font-medium">Price:</span> ${item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Mens

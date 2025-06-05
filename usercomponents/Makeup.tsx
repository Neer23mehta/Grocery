'use client'
import React, { useEffect, useState } from 'react'
import mockProducts from '@/Grocery/Product'
import { useQuery } from '@tanstack/react-query'

interface Makeup {
  id: number
  name: string
  brand:string
  type: string
  shade: string
  image: string
  section:number
  }

const Makeups = () => {
  const [makes, setMakes] = useState<Makeup[]>([])
  const [search, setSearch] = useState<string>('')
  useEffect(() => {
    const timer = setTimeout(() => {
      const filtermake = mockProducts.filter(item => item?.section === 1)
      setMakes(filtermake)
    }, 500)
    return () => clearTimeout(timer)
  }, [])
  console.log("makes123",makes)
  const filteredMakeup = makes.filter(makeup => makeup.name.toLowerCase().includes(search.toLowerCase()) || makeup.brand.toLowerCase().includes(search.toLowerCase()) || makeup.type.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Make-ups</h1>
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search Makeups..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMakeup.map((phone) => (
          <div key={phone.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={phone.image} alt={phone.name} className="w-full h-56 object-contain" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{phone.name}</h2>
              <p className="text-gray-600 mb-1"><span className="font-medium">Brand:</span> {phone.brand}</p>
              <p className="text-gray-600 mb-1"><span className="font-medium">Type:</span> {phone.type}</p>
              <p className="text-gray-600 mb-1"><span className="font-medium">Shade:</span> {phone.shade}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Makeups

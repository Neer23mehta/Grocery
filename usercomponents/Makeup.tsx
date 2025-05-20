'use client'
import React, { useEffect, useState } from 'react'
import mockMakeup from '../Grocery/makeup'

interface Makeup {
  id: number
  name: string
  brand:string
  type: string
  shade: string
  image: string
  }

const Makeups = () => {
  const [bags, setBags] = useState<Makeup[]>([])

  useEffect(() => {
    const timer = setTimeout(() => {
      setBags(mockMakeup)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Make-ups</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bags.map((phone) => (
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

'use client'
import React, { useEffect, useState } from 'react'
import mockPhones from '../Grocery/mobile'

interface MobilePhone {
    id: number
    name: string
    brand: string
    screen: string
    camera: string
    storage: string
    image: string
  }

const Mobiles = () => {
  const [mobiles, setMobiles] = useState<MobilePhone[]>([])

  useEffect(() => {
    const timer = setTimeout(() => {
      setMobiles(mockPhones)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Mobile Phones</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mobiles.map((phone) => (
          <div key={phone.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={phone.image} alt={phone.name} className="w-full h-56 object-contain" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{phone.name}</h2>
              <p className="text-gray-600 mb-1"><span className="font-medium">Brand:</span> {phone.brand}</p>
              <p className="text-gray-600 mb-1"><span className="font-medium">Screen:</span> {phone.screen}</p>
              <p className="text-gray-600 mb-1"><span className="font-medium">Camera:</span> {phone.camera}</p>
              <p className="text-gray-600"><span className="font-medium">Storage:</span> {phone.storage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Mobiles

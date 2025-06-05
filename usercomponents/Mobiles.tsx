'use client'
import React, { useEffect, useState } from 'react'
import mockProducts from '../Grocery/Product'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { addProduct } from '@/app/redux/slice'

interface MobilePhone {
    id: number
    name: string
    brand: string
    screen: string
    camera: string
    storage: string
    image: string
    price: number
    section: number
  }

const Mobiles = () => {
  const [mobiles, setMobiles] = useState<MobilePhone[]>([])
  const [search, setSearch] = useState<string>('')
  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setTimeout(() => {
      const mobiles = mockProducts.filter((product) => product.section == 5)
      setMobiles(mobiles)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const filtertedMObile = mobiles.filter(mobile => mobile.name.toLowerCase().includes(search.toLowerCase()) || mobile.brand.toLowerCase().includes(search.toLowerCase()))

    const handleAddToCart = (bags: MobilePhone) => {
      dispatch(
        addProduct({
          Product_Name: bags.name,
          Description: bags.name,
          Image: bags.image,
          Price: bags.price,
          Stock_Status: 1,
          Variation: '',
          Category_Name: bags.brand,
          Id: bags.id,
          Product_var_id: bags.id,
          // Capacity: bags.storage,
        })
      );
      toast.success(`${bags.name} added to cart`);
    }
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Mobile Phones</h1>
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search bags..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtertedMObile.map((phone) => (
          <div key={phone.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={phone.image} alt={phone.name} className="w-full h-56 object-contain" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{phone.name}</h2>
              <p className="text-gray-600 mb-1"><span className="font-medium">Brand:</span> {phone.brand}</p>
              <p className="text-gray-600 mb-1"><span className="font-medium">Screen:</span> {phone.screen}</p>
              <p className="text-gray-600 mb-1"><span className="font-medium">Camera:</span> {phone.camera}</p>
              <p className="text-gray-600"><span className="font-medium">Storage:</span> {phone.storage}</p>
              <p className="text-green-700"><span className="font-medium">Price:</span> {phone.price}</p>
              <button
                onClick={() => handleAddToCart(phone)}
                className="mt-5 w-full bg-amber-500 text-white py-2 rounded hover:bg-amber-600 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Mobiles

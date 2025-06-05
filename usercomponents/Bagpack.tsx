'use client'
import React, { useEffect, useState } from 'react'
import mockProducts from '@/Grocery/Product'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { addProduct } from '@/app/redux/slice'

interface Bag {
  id: number
  name: string
  brand: string
  capacity: string
  color: string
  image: string
  price: number
}

const Bags = () => {
  const [bags, setBags] = useState<Bag[]>([])
  const [search, setSearch] = useState<string>('')
  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setTimeout(() => {
      const bags = mockProducts.filter(item => item.section == 7)
      setBags(bags)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const filteredBags = bags.filter(bag =>
    bag.name.toLowerCase().includes(search.toLowerCase()) ||
    bag.brand.toLowerCase().includes(search.toLowerCase()) ||
    bag.color.toLowerCase().includes(search.toLowerCase())
  )

  const handleAddToCart = (bags: Bag) => {
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
        Capacity: bags.capacity,
      })
    );
    toast.success(`${bags.name} added to cart`);
  }
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Bag-packs</h1>

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
        {filteredBags.map((bag) => (
          <div key={bag.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={bag.image} alt={bag.name} className="w-full h-56 object-contain" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{bag.name.slice(0, 23)}...</h2>
              <p className="text-gray-600 mb-1"><span className="font-medium">Brand:</span> {bag.brand}</p>
              <p className="text-gray-600 mb-1"><span className="font-medium">Capacity:</span> {bag.capacity}</p>
              <p className="text-gray-600 mb-1"><span className="font-medium">Color:</span> {bag.color}</p>
              <p className="text-green-700 mb-1"><span className="font-medium">Price:</span> {bag.price}</p>
              <button
                onClick={() => handleAddToCart(bag)}
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

export default Bags

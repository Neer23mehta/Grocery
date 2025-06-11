'use client'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { addProduct } from '@/app/redux/slice'
import { useDispatch } from 'react-redux'
import mockProducts from '@/Grocery/Product'

interface Sofa {
  id: string
  name: string
  brand: string
  material: string
  size: string
  color: string
  image: string
  price: number
  section: number
}

const Sofa = () => {
  const [sofa, setSofa] = useState<Sofa[]>([])
  const [search, setSearch] = useState<string>('')
  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setTimeout(() => {
      const filteredSofa = mockProducts.filter((item) => item.section == 3)
      setSofa(filteredSofa as Sofa[])
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const filteredSofa = sofa.filter((item) => item.brand.toLowerCase().includes(search.toLowerCase()) || item.name.toLowerCase().includes(search.toLowerCase()))

  const handleAddToCart = (bags: Sofa) => {
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
        Material: bags.material,
      })
    );
    toast.success(`${bags.name} added to cart`);
  }
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Sofa-Sets</h1>
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
        {filteredSofa.map((phone) => (
          <div key={phone.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={phone.image} alt={phone.name} className="w-full h-56 object-contain" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{phone.name}</h2>
              <p className="text-gray-600 mb-1"><span className="font-medium">Brand:</span> {phone.brand}</p>
              <p className="text-gray-600 mb-1"><span className="font-medium">Size:</span> {phone.size}</p>
              <p className="text-gray-600 mb-1"><span className="font-medium">Color:</span> {phone.color}</p>
              <p className="text-gray-600"><span className="font-medium">Material:</span> {phone.material}</p>
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

export default Sofa

'use client'
import React, { useEffect, useState } from 'react'
import mockPerfume from '../Grocery/perfume'
import mockProducts from '@/Grocery/Product'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { addProduct } from '@/app/redux/slice'

interface Perfume {
    id:number
    name: string
    brand: string
    type: string
    fragrance:string
    image:string
  }

const Perfumes = () => {
  const [perfumes, setPerfumes] = useState<Perfume[]>([])
  const [search, setSearch] = useState<string>('')
  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setTimeout(() => {
      const perfume = mockProducts.filter(item => item.section == 2)
      setPerfumes(perfume)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

const handleAddToCart = (perfume: Perfume) => {
      dispatch(
        addProduct({
          Product_Name: perfume.name,
          Description: perfume.name,
          Image: perfume.image,
          // Price: perfume.price,
          Stock_Status: 1,
          Variation: '',
          Category_Name: perfume.brand,
          Id: perfume.id,
          Product_var_id: perfume.id,
          Fragrance: perfume.fragrance ,
        })
      );
      toast.success(`${perfume.name} added to cart`);
    }
  const filteredPerfumes = perfumes.filter(perfume => perfume.name.toLowerCase().includes(search.toLowerCase()) || perfume.brand.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Perfumes</h1>
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
        {filteredPerfumes.map((phone) => (
          <div key={phone.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={phone.image} alt={phone.name} className="w-full h-56 object-contain" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{phone.name}</h2>
              <p className="text-gray-600 mb-1"><span className="font-medium">Brand:</span> {phone.brand}</p>
              <p className="text-gray-600 mb-1"><span className="font-medium">Type:</span> {phone.type}</p>
              <p className="text-gray-600 mb-1"><span className="font-medium">Fragrance:</span> {phone.fragrance}</p>
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

export default Perfumes

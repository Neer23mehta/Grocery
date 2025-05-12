'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { assets } from '@/assests/assets'
import commonGetApis, { commonPostApis, deleteApi } from '@/commonapi/Commonapi'
import { toast } from 'react-toastify'
import { Dialog, DialogActions } from '@mui/material'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

type CategoryItem = {
  category_name: string;
  image: boolean;
};

interface Category {
  id: number;
  shop_by_category: {
    id: number;
    image: string;
    offer: string;
    category_name: string;
    category: CategoryItem[];
  }[];
  category: CategoryItem[];
}

interface Add {
  Category_Name: string
  No: number
}

const Shopbycategory = () => {
  const [category, setCategory] = useState<Category[]>([])
  const [newCategory, setNewCategory] = useState(false)
  const [image, setImage] = useState<File | null>(null)
  const [adds, setAdds] = useState<Add[]>([])
  const [input, setInput] = useState({
    category: "",
    offer: "",
  })

  const fetchShopByCategory = async () => {
    try {
      const res = await commonGetApis("get_all_home_management?fk_section_id=2")
      setCategory(res?.data?.result || [])
    } catch (error) {
      console.error(error)
      toast.error("Something went Wrong")
    }
  }

  const fetchCategories = async () => {
    try {
      const res = await commonGetApis('getcategories?pageNumber=1&pageLimit=10')
      const result = res?.data?.result || []
      setAdds(result)
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  }

  const handleRemoveCategory = async (id: number) => {
    try {
      const res = await deleteApi(`delete_home_management?id=${id}&fk_section_id=2`)
      if (res.data) {
        setCategory((prev) =>
          prev.map(item => ({
            ...item,
            shop_by_category: item.shop_by_category.filter(ad => ad.id !== id)
          }))
        )
        toast.success("Deleted Successfully")
      }
    } catch (error) {
      console.error(error)
      toast.error("Something went Wrong")
    }
  }

  const handleToggleCategory = () => {
    setNewCategory(prev => !prev)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formdata = new FormData()
    formdata.append("fk_section_id", "2")
    formdata.append("fk_category_id", input.category)
    formdata.append("offer", input.offer)
    if (image) formdata.append("image", image)

    try {
      const res = await commonPostApis("add_home_management", formdata)
      if (res.data) {
        toast.success("Category added successfully")
        fetchShopByCategory()
        setNewCategory(false)
        setInput({ category: "", offer: "" })
        setImage(null)
      }
    } catch (error) {
      console.error(error)
      toast.error("Something went Wrong")
    }
  }

  useEffect(() => {
    fetchShopByCategory()
    fetchCategories()
  }, [])

  return (
    <div className="w-full max-w-8xl mx-auto">
      <div className="flex flex-col mt-5 px-6 py-4 bg-white shadow-md rounded-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-bold text-xl">Shop by Category</h1>
          <Image src={assets.del} alt="edit" width={21} height={25} />
        </div>

        <div className="w-full overflow-x-auto">
          <div className="flex gap-2 items-center min-w-fit">
            {category?.map((curval) =>
              curval.shop_by_category.map((ad, idx) => (
                <div key={idx} className="relative flex-shrink-0">
                  <button onClick={() => handleRemoveCategory(ad.id)}>
                    <Image
                      src={assets.cancel}
                      alt="remove"
                      width={20}
                      height={20}
                      className="absolute top-6 right-0 z-10 cursor-pointer hover:text-red-700"
                    />
                  </button>
                  <Zoom>
                  <Image
                    src={ad.image || "/placeholder.png"}
                    alt="banner"
                    width={120}
                    height={120}
                    className="object-cover border w-[120px] h-[120px] border-gray-300 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200"
                    unoptimized
                  />
                  </Zoom>
                  <p className="text-sm mt-2">{ad.category_name}</p>
                  <p className="text-sm text-gray-500">{ad.offer}</p>
                </div>
              ))
            )}
            <div
              className="h-[120px] w-[120px] mb-5 border border-gray-300 rounded-md flex-shrink-0 flex items-center justify-center cursor-pointer hover:bg-gray-50 transition"
              onClick={handleToggleCategory}
            >
              <div className="flex items-center justify-center rounded-lg">
                <Image
                  src={assets.add}
                  alt="Upload Thumbnail"
                  width={50}
                  height={50}
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={newCategory} onClose={() => setNewCategory(false)}>
        <div className="flex flex-col justify-center px-10 bg-white shadow-md">
          <div className="mt-1 flex justify-end items-end">
            <button
              onClick={() => setNewCategory(false)}
              className="text-2xl text-gray-400 hover:text-red-500"
            >
              X
            </button>
          </div>
          <h1 className="text-2xl font-bold">Add Shop by Category</h1>

          <form onSubmit={handleSubmit} className="py-5 flex flex-col items-center">
            <p className="mt-3 text-start">Add Image of Category</p>
            <div className="w-[120px] h-[120px] px-5 py-2 border border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-50 transition">
              <label htmlFor="thumbnail" className="cursor-pointer text-center text-gray-300">
                <div className="flex items-center justify-center rounded-lg">
                  <Image
                    src={image ? URL.createObjectURL(image) : assets.add}
                    alt="Upload Thumbnail"
                    width={image ? 120 : 50}
                    height={image ? 120 : 50}
                    className="object-cover rounded-lg"
                  />
                </div>
              </label>
              <input
                type="file"
                id="thumbnail"
                className="hidden"
                onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
              />
            </div>

            <div className="mt-4 w-full">
              <label className="text-gray-400">Select Category</label>
              <select
                value={input.category}
                name="category"
                className="font-bold px-3 py-2 mt-2 border border-gray-300 text-black w-full"
                onChange={handleCategoryChange}
              >
                <option value="">Select</option>
                {adds.map((curVal, index) => (
                  <option key={index} value={curVal.No}>
                    {curVal.Category_Name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4 w-full">
              <label className="text-gray-400">Offer</label>
              <input
                type="text"
                name="offer"
                value={input.offer}
                onChange={handleCategoryChange}
                placeholder="e.g. 10% Off"
                className="font-bold border border-gray-300 mt-2 py-2 px-3 text-black w-full"
              />
            </div>

            <DialogActions>
              <button type="submit" className="px-6 py-2 bg-amber-400 font-bold mt-5">
                Save
              </button>
            </DialogActions>
          </form>
        </div>
      </Dialog>
    </div>
  )
}

export default Shopbycategory

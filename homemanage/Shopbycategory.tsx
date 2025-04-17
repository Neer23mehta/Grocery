'use client'
import React, { useState } from 'react'
import { assets } from '@/assests/assets'
import Image from 'next/image'
import { Dialog, DialogActions, DialogContent } from '@mui/material'

const Shopbycategory = () => {
  const [category, setCategory] = useState("")
  const [newCategory, setNewCategory] = useState(false)

  const handleRemoveCategory = () => {

  }
  const handleToggleCategory = () => {
    setNewCategory(!newCategory)
  }
  return (
    <div className='w-full'>
      <div className='flex flex-col mt-5 px-4 bg-white shadow:md w-full '>
              <div className='flex flex-row items-center'>
                <h1 className='mt-5 font-bold text-xl'>Shop by Category</h1>
                <Image src={assets.edit} alt='delete' className='mt-5 flex justify-end ml-4' width={17} height={25} />
              </div>
              <div className='flex flex-row justify-around items-center mb-5 mt-3 space-x-2.5 w-full overflow-x-auto'>
                <div className=''>
                  <Image src={assets.cancel} alt='remove' className='absolute ' />
                  <Image src={assets.imj} alt='Image' className='px-2 py-8 border border-gray-300' />
                  <p className='text-xs py-1 font-bold'>Vegetables & Fruits { }</p>
                  <p className='text-gray-400 text-xs '>Min 20% Off{ }</p>
                </div>
                <div className=''>
                  <Image src={assets.cancel} alt='remove' className='absolute ' />
                  <Image src={assets.imj} alt='Image' className='px-2 py-8 border border-gray-300 relative' />
                  <p className='text-xs py-1 font-bold'>Vegetables & Fruits { }</p>
                  <p className='text-gray-400 text-xs '>Min 20% Off{ }</p>
                </div>
                <div className=''>
                  <Image src={assets.cancel} alt='remove' className='absolute ' />
                  <Image src={assets.imj} alt='Image' className='px-2 py-8 border border-gray-300 relative' />
                  <p className='text-xs py-1 font-bold'>Vegetables & Fruits { }</p>
                  <p className='text-gray-400 text-xs '>Min 20% Off{ }</p>
                </div>
                <div className=''>
                  <Image src={assets.cancel} alt='remove' className='absolute ' />
                  <Image src={assets.imj} alt='Image' className='px-2 py-8 border border-gray-300 relative' />
                  <p className='text-xs py-1 font-bold'>Vegetables & Fruits { }</p>
                  <p className='text-gray-400 text-xs '>Min 20% Off{ }</p>
                </div>
                <div className=''>
                  <Image src={assets.cancel} alt='remove' className='absolute ' />
                  <Image src={assets.imj} alt='Image' className='px-2 py-8 border border-gray-300 relative' />
                  <p className='text-xs py-1 font-bold'>Vegetables & Fruits { }</p>
                  <p className='text-gray-400 text-xs'>Min 20% Off{ }</p>
                </div>
                <div className=''>
                  <Image src={assets.cancel} alt='remove' className='absolute ' />
                  <Image src={assets.imj} alt='Image' className='px-2 py-8 border border-gray-300 relative' />
                  <p className='text-xs py-1 font-bold'>Vegetables & Fruits { }</p>
                  <p className='text-gray-400 text-xs '>Min 20% Off{ }</p>
                </div>
                <div className=''>
                  <Image src={assets.cancel} alt='remove' className='absolute' onClick={handleRemoveCategory} />
                  <Image src={assets.imj} alt='Image' className='px-2 py-8 border border-gray-300 relative' />
                  <p className='text-xs py-1 font-bold'>Vegetables & Fruits { }</p>
                  <p className='text-gray-400 text-xs '>Min 20% Off{ }</p>
                </div>
                <div className=''>
                  <Image src={assets.cancel} alt='remove' className='absolute' onClick={handleRemoveCategory} />
                  <Image src={assets.imj} alt='Image' className='px-2 py-8 border border-gray-300 relative' />
                  <p className='text-xs py-1 font-bold'>Vegetables & Fruits { }</p>
                  <p className='text-gray-400 text-xs '>Min 20% Off{ }</p>
                </div>
                <div className='flex justify-center items-center h-[131px] border border-gray-300 mb-[38px] w-[125px]'>
                  <Image src={assets.add} alt='Image' className='px-2 py-8' onClick={handleToggleCategory} />
                </div>
                
                <div>
                  <ul>
                    {
      
                    }
                  </ul>
                </div>
              </div>
            </div>
             <Dialog open={newCategory} onClose={() => setNewCategory(false)}>
                    <div className='flex flex-col justify-center items-center'>
                      <DialogContent>
                        <form className='flex flex-col bg-white py-6 px-10 justify-center items-center' >
                          <h1 className='text-2xl font-bold'>Shop By Category</h1>
                          <div className='flex flex-col justify-start mt-5 space-y-5'>
                            <div className='flex flex-col space-x-5 justify-start '>
            
                              <label className='text-gray-400 mt-5'>Title Name</label>
                              <input type='text' name='shopbycategory' placeholder='for ex Shop By Category' className='font-bold border-1 border-gray-200 mt-2 py-2 px-3 text-black' />
                            </div>
                            <div className='flex flex-col space-x-5 justify-start '>
                              <label className='text-gray-400'>Select Category</label>
                              <select className='font-bold px-3 py-2 mt-2 border-1 border-gray-200 text-black'>Select Category</select>
                            </div>
                            <div className='flex flex-col space-x-5 justify-start '>
            
                              <label className='text-gray-400'>Offer</label>
                              <input type='text' name='offer' placeholder='for ex 10% Off' className='font-bold border-1 border-gray-200 mt-2 py-2 px-3 text-black' />
                            </div>
                          </div>
                          <DialogActions>
                            <div className='flex justify-center items-center mt-5'>
                              <button className='px-25 py-2 bg-amber-400 font-bold'>Submit</button>
                            </div>
                          </DialogActions>
                        </form>
                      </DialogContent>
                    </div>
                  </Dialog>
    </div>
  )
}

export default Shopbycategory
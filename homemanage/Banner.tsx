import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { assets } from '@/assests/assets'
import commonGetApis, { deleteApi } from '@/commonapi/Commonapi'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Dialog, DialogActions } from '@mui/material'

interface Banners {
  Image: string,
  Section_Name: string,
  Id: number,
}

const Banner = () => {
  const [banner, setBanner] = useState<Banners[]>([])
  const [image, setImage] = useState<File | null>(null)
  const [bannerOpen, setBannerOpen] = useState(false)

  const fetchGetBanner = async () => {
    try {
      const res = await commonGetApis("get_slider_with_banner")
      setBanner(res?.data?.result)
    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    fetchGetBanner()
  }, [])

  const handleNewBanner = async () => {
    const refreshtoken = localStorage.getItem('usertoken')
    const token = localStorage.getItem('token')

    const formdata = new FormData()
    if (image) formdata.append("image", image)
    formdata.append("fk_section_id", "1")

    try {
      const res = await axios.post("http://192.168.2.181:3000/admin/add_slider_with_banner", formdata, {
        headers: {
          Authorizations: token,
          language: 'en',
          refresh_token: refreshtoken,
          'Content-Type': 'multipart/form-data',
        },
      })
      if (res.data) {
        toast.success("Banner Added Successfully")
        fetchGetBanner() // Refresh the list after adding
        setBannerOpen(false)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went Wrong")
    }
  }

  const handleRemoveBanner = async (id: number) => {
    try {
      const res = await deleteApi(`delete_slider_with_banner?id=${id}`)
      if (res.data) {
        toast.success("Deleted Successfully")
        fetchGetBanner() 
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went Wrong")
    }
  }

  // const handleBannerEdit = async (id:any) => {
  //   try {
  //     const res = await commonGetApis(`delete_slider_with_banner?id=${id}`)

  //     if(res.data){
  //       toast.success(res.data.message)
  //     }
  //     else{
  //       toast.error(res.data.message)
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     toast.error("Something went Wrong")
  //   }
  // }

  const handleToggleBanner = () => {
    setBannerOpen(!bannerOpen)
  }

  return (
    <div className='w-full'>
      <div className='flex flex-col mt-5 px-6 py-4 bg-white shadow-md rounded-md '>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='font-bold text-xl'>Banner Slider</h1>
          <Image
            src={assets.del}
            alt='delete'
            width={20}
            height={25}
            className='cursor-pointer'
          />
        </div>

        <div className="w-full overflow-x-auto ">
          <div className="flex gap-5 items-center w-max">
            {banner.map((curval, index) => (
              <div key={index} className='relative'>
                <button onClick={() => handleRemoveBanner(curval.Id)}>
                  <Image
                    src={assets.cancel}
                    alt='remove'
                    width={26}
                    height={26}
                    className='absolute top-6 right-0 z-10 cursor-pointer'
                  />
                </button>
                <img
                  src={curval.Image}
                  alt='banner'
                  className='h-[170px] w-[310px] object-cover rounded-md shadow-sm hover:shadow-md transition-shadow duration-200'
                />
              </div>
            ))}

            <div
              className='h-[170px] w-[310px] border border-gray-300 mt-6 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-50 transition'
              onClick={handleToggleBanner}
            >
              <div className="flex items-center justify-center rounded-lg">
                <Image
                  src={assets.add}
                  alt="Upload Thumbnail"
                  width={70}
                  height={50}
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={bannerOpen} onClose={() => setBannerOpen(false)}>
        <div className='flex flex-col justify-center px-10 bg-white shadow-md'>
          <div className='mt-1 flex justify-end items-end'>
            <button onClick={() => setBannerOpen(false)} className='text-2xl text-gray-400 hover:text-red-500'>X</button>
          </div>
          <div className='flex justify-center items-center'>
            <h1 className='text-2xl font-bold'>Add Banner</h1>
          </div>
          <p className='py-2 mt-3 text-start'>Add Image of Banner</p>

          <div className='w-[300px] h-[150px] px-10 py-2 border border-gray-300 rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-50 transition'>
            <label htmlFor="thumbnail" className="cursor-pointer text-center">
              <div className="flex items-center justify-center rounded-lg">
                <Image
                  src={image ? URL.createObjectURL(image) : assets.add}
                  alt="Upload Thumbnail"
                  width={image ? 300 : 50}
                  height={image ? 150 : 50}
                  className="object-cover rounded-lg"
                />
              </div>
            </label>
            <input
              type="file"
              id="thumbnail"
              className="hidden"
              onChange={(e) =>
                setImage(e.target.files ? e.target.files[0] : null)
              }
            />
          </div>

          <DialogActions>
            <div className='py-5 flex justify-center items-center'>
              <button onClick={handleNewBanner} className='font-bold mt-3 bg-amber-400 py-2 px-9 text-xl'>
                Save
              </button>
            </div>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  )
}

export default Banner

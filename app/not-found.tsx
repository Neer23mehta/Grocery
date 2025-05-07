'use client'
import Image from 'next/image'
import { assets } from '@/assests/assets'
import React from 'react'

const Page = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Image
        src={assets.errors.src}
        alt="Full screen error image"
        layout="fill" 
        objectFit="cover" 
        placeholder="blur"
        blurDataURL={assets.errors.blurDataURL}
        priority
      />
    </div>
  )
}

export default Page

'use client'
import React from 'react'
import Userid from '@/Grocery/Userid'
import { useParams } from 'next/navigation'


const Page = () => {
  const params = useParams();
  return (
    <div><Userid id={Number(params.id)}/></div>
  )
}

export default Page
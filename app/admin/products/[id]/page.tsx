'use client'
import React from 'react'
import Productadd from '@/components/Productadd'
import { useParams } from 'next/navigation'

const Page = () => {
  const params = useParams();
  return (
    <div><Productadd id={Number(params.id)}/></div>
  )
}

export default Page
'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import Productdetail from '@/usercomponents/Productdetail'

const Page = () => {
  const params = useParams()

  return (
    <div>
      <Productdetail id={Number(params.id)} />
    </div>
  )
}

export default Page

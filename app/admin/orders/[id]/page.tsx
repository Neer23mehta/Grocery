'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import Orderid from '@/components/Orderid'

const Page = () => {
  const params = useParams()

  return (
    <div>
      <Orderid id={Number(params.id)} />
    </div>
  )
}

export default Page

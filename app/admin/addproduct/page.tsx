'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import Productadd from '@/components/Productadd'

const Page = () => {
  const params = useParams()
  const id = Number(params.id)

  return (
    <div>
      <Productadd id={id} />
    </div>
  )
}

export default Page

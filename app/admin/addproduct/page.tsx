'use client'
import React, { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Productadd from '@/components/Productadd'

const Page = () => {
  const params = useParams()
  const id = Number(params.id)

  const router = useRouter();

   useEffect(() => {
      const refreshToken = localStorage.getItem("usertoken");
      if (!refreshToken) {
        router.replace('/'); 
      }
    }, []);
  return (
    <div>
      <Productadd id={id} />
    </div>
  )
}

export default Page

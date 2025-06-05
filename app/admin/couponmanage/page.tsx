import React from 'react'
import Coupons from '@/components/Coupon'

const Page = () => {
  return (
    <div><Coupons/></div>
  )
}

export default Page

export function generateMetadata(){
  return {
      title:"Coupon Management",
  }
}
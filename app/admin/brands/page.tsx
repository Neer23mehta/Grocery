import React from 'react'
import Brand from '@/components/Brand'

const Page = () => {
  return (
    <div><Brand/></div>
  )
}

export default Page

export function generateMetadata(){
  return {
      title:"Grocery Brands",
  }
}
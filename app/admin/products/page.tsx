import React from 'react'
import Products from '@/components/Product'

const Page = () => {
  return (
    <div><Products/></div>
  )
}

export default Page

export function generateMetadata(){
  return {
      title:"Grocery Products",
  }
}
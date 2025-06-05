import React from 'react'
import Subcategory from '@/components/Subcategory'

const Page = () => {
  return (
    <div><Subcategory/></div>
  )
}

export default Page

export function generateMetadata(){
  return {
      title:"Grocery Sub-Categories",
  }
}
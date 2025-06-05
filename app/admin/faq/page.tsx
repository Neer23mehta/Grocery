import React from 'react'
import Faq from '@/components/Faq'

const page = () => {
  return (
    <div><Faq/></div>
  )
}

export default page

export function generateMetadata(){
  return {
      title:"Grocery FaQs",
  }
}
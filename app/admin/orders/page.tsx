import React from 'react'
import Orders from '@/components/Orders'

const Page = () => {
  return (
    <div>
      <Orders/>
    </div>
  )
}

export default Page

export function generateMetadata(){
  return {
      title:"Grocery Orders",
  }
}
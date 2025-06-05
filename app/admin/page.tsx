import React from 'react'
import Admin from '@/components/Admin'

const Page = () => {
  return (
    <div><Admin/></div>
  )
}

export default Page

export function generateMetadata(){
  return {
    title:"Grocery Admin"
  }
}
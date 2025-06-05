import React from 'react'
import User from '@/components/User'

const Page = () => {
  return (
    <div><User/></div>
  )
}

export default Page

export function generateMetadata(){
  return {
    title:"Grocery Users"
  }
}
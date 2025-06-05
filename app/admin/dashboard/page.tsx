import React from 'react'
import Dashboard from '@/components/Dashboard'

const Page = () => {
  return (
    <div><Dashboard/></div>
  )
}

export default Page

export function generateMetadata(){
  return {
      title:"Admin Dashboard",
  }
}
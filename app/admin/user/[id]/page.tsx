import React from 'react'
import Userid from '@/Grocery/Userid'

const Page = ({params}:any) => {
  return (
    <div><Userid id={params.id}/></div>
  )
}

export default Page
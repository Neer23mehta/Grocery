import React from 'react'
import Brandid from '@/components/Brandid'

const Page = ({params}:any) => {
  return (
    <div><Brandid id={params.id}/></div>
  )
}

export default Page
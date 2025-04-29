import React from 'react'
import Orderid from '@/components/Orderid'

const Page = ({params}:any) => {
  return (
    <div><Orderid id={params.id}/></div>
  )
}

export default Page
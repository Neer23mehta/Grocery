import React from 'react'
import Orderid from '@/components/Orderid'

type ParamProp = {
  params: {
    id:number
  }
}

const Page = ({params}:ParamProp) => {
  return (
    <div><Orderid id={params.id}/></div>
  )
}

export default Page
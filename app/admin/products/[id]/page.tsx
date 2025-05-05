import React from 'react'
import Productadd from '@/components/Productadd'

type ParamProp = {
  params:{
    id:number
  }
}

const Page = ({params}:ParamProp) => {
  return (
    <div><Productadd id={params.id}/></div>
  )
}

export default Page
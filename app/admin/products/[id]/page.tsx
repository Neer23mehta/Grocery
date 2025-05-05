import React from 'react'
import Productadd from '@/components/Productadd'

const Page = ({params}:any) => {
  return (
    <div><Productadd id={params.id}/></div>
  )
}

export default Page
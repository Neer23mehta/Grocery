import React from 'react'
import Userid from '@/Grocery/Userid'

type Pageprop = {
  params : {
    id:number
  }
}

const Page = ({params}:Pageprop) => {
  return (
    <div><Userid id={params.id}/></div>
  )
}

export default Page
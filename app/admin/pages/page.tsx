'use client'
import React from 'react'
import MyEditor from '@/components/Myeditor'
import Link from 'next/link'

const Page = () => {
  return (
    <div>
        <div className="flex flex-row justify-between items-center">
                <div className="flex flex-col px-2">
                  <h1 className="text-3xl font-bold">Pages</h1>
                  <p className='text-gray-500 mt-2'><Link href={`/admin/dashboard`}>Dashboard</Link> <span className='ml-2.5'>{`>`}</span><span className='text-black ml-2.5'>Pages</span> </p>
                    <h2 className="text-xl font-semibold mt-4">Terms & Conditions</h2>
                </div>
                <div>
                  <button className="px-3 font-bold py-2 bg-amber-300 ml-5 w-auto h-13 ">Add Pages</button>
                </div>
        </div>
        <div className='px-2 py-5'>
          <MyEditor/>
        </div>
    </div>
  )
}

export default Page


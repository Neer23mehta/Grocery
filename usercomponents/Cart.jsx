'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

const Cart = () => {
    const route = useRouter();

    const handleClickCheckout = () => {
        route.push('/user/cart/buynow')
    }

  return (
    <div className='flex justify-center items-center flex-col mt-10'>Cart
        <button onClick={() => handleClickCheckout()} className='px-5 py-2.5 border bg-amber-300 mt-10 rounded-md'>
            Checkout
        </button>
    </div>
  )
}

export default Cart
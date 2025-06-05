'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { deleteProduct, clearCart, updateQuantity } from '@/app/redux/slice';
import { RootState } from '@/app/redux/store';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const localStorageKey = 'cartItem';

const Cart = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const cartItems = useSelector((state: RootState) => state.cart.cart);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);
  const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(cartItems));
  }, [cartItems]);

  const handleClickCheckout = () => {
    if (totalQuantity >= 1) {
      router.push('/user/cart/buynow');
    }
    else {
      router.push('/user')
    }
  };

  const handleDelete = (id: string) => {
    dispatch(deleteProduct(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  return (
    <div className="flex flex-col items-center mt-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <ul className="w-full max-w-4xl space-y-4">
        {cartItems.map((item: any, idx: any) => {
          return (
            <li
              key={idx}
              className="flex items-center justify-between p-4 bg-white rounded-md shadow"
            >
              <div className="flex items-center gap-4">
                {/* <Zoom> */}
                <Image
                  src={item.Image}
                  alt={item.Product_Name}
                  width={100}
                  height={100}
                  className="rounded-md object-cover"
                  style={{ height: 'auto' }}
                />
                {/* </Zoom> */}
                <div>
                  <h3 className="text-lg font-semibold">{item.Product_Name}</h3>
                  <p className="text-md text-gray-600">{item.Description}</p>
                  <p className="text-md text-gray-600">{item.Capacity}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="text-md font-bold text-gray-700">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <p className="font-bold text-amber-600">${(Number(item.Price) * item.quantity).toFixed(2)}</p>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-700 font-semibold"
                >
                  Remove
                </button>
              </div>
            </li>
          )
        })}
      </ul>

      <div className="mt-8 w-full max-w-4xl flex justify-between items-center">
        <div>
          <p className="text-lg font-semibold">Total Quantity: {totalQuantity}</p>
          <p className="text-xl font-bold text-amber-600">Total: ${totalPrice.toFixed(2)}</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleClearCart}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-md"
          >
            Clear Cart
          </button>
          <button
            onClick={handleClickCheckout}
            className="px-6 py-2 bg-amber-400 hover:bg-amber-500 text-white font-bold rounded-md"
          >
            {
              totalQuantity >= 1 ? "Checkout" : "Add items to cart"
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

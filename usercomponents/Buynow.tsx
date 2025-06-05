'use client';
import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Script from 'next/script';
import { useSelector } from 'react-redux';
import Image from 'next/image';
import { RootState } from '@/app/redux/store';

interface FormValues {
  fullname: string;
  address: string;
  number: string;
  pincode: string;
  city: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const BuyNowPage = () => {
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.cart);
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice);

  const [citySuggest, setCitySuggest] = useState<any[]>([]);
  const [pinInvalid, setPinInvalid] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchCitySuggestions = async (pincode: string) => {
    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await res.json();
      if (data[0]?.Status === 'Success') {
        setCitySuggest(data[0].PostOffice || []);
        setPinInvalid(false);
      } else {
        setCitySuggest([]);
        setPinInvalid(true);
      }
    } catch (err) {
      console.error('Error fetching pincode info:', err);
      setCitySuggest([]);
      setPinInvalid(true);
    }
  };

  const initialValues: FormValues = {
    fullname: '',
    address: '',
    number: '',
    pincode: '',
    city: '',
  };

  const validationSchema = Yup.object({
    fullname: Yup.string().required('Full Name is required'),
    address: Yup.string().required('Address is required'),
    number: Yup.string()
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required'),
    pincode: Yup.string()
      .matches(/^[0-9]{6}$/, 'Pincode must be 6 digits')
      .required('Pincode is required'),
    city: Yup.string().required('City is required'),
  });

  const handlePayment = async (amount: number) => {
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });

      const { orderId } = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
        amount: amount * 100,
        currency: 'INR',
        name: 'NextShop',
        description: 'Order Payment',
        order_id: orderId,
        handler: () => {
          toast.success('Payment Successful!');
          router.push('/user/home');
        },
        theme: { color: '#6366F1' },
      };

      if (window.Razorpay) {
        const razor = new window.Razorpay(options);
        razor.open();
      } else {
        toast.error('Payment gateway not loaded. Please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Something went wrong during payment.');
    }
  };

  const handleSubmit = async (values: FormValues) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('order_detail_single', JSON.stringify(values));
    }

    toast.info('Processing Payment...');
    await handlePayment(totalPrice);
  };

  if (!isClient) return null;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-lg mt-10">
      <h1 className="text-3xl text-center text-indigo-700 mb-6">Checkout</h1>

      <div className="space-y-4 mb-6">
        {cartItems.map((item) => (
          <div
            key={`${item.id}-${item.Product_Name}`}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-md shadow-sm"
          >
            <div className="flex items-center gap-4">
              <Image
                src={item.Image}
                alt={item.Product_Name}
                width={60}
                height={60}
                className="rounded-md object-cover"
              />
              <div>
                <p className="font-semibold">{item.Product_Name}</p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
            </div>
            <p className="text-indigo-600 font-bold">₹{item.Price * item.quantity}</p>
          </div>
        ))}
        <div className="text-right font-semibold text-lg text-gray-800">
          Total: ₹{totalPrice}
        </div>
      </div>

      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ handleChange, setFieldValue }) => (
          <Form className="space-y-5">
            <div>
              <Field name="fullname" placeholder="Full Name" className="w-full px-4 py-2 border rounded-md" />
              <ErrorMessage name="fullname" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <Field name="address" placeholder="Address" className="w-full px-4 py-2 border rounded-md" />
              <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <Field
                name="pincode"
                placeholder="Pincode"
                className="w-full px-4 py-2 border rounded-md"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  const value = e.target.value;
                  if (value.length === 6) {
                    fetchCitySuggestions(value);
                  }
                }}
              />
              <ErrorMessage name="pincode" component="div" className="text-red-500 text-sm" />
              {pinInvalid && <div className="text-red-500 text-sm">Invalid Pincode</div>}
            </div>

            {citySuggest.length > 0 && (
              <ul className="bg-gray-100 p-2 rounded-md">
                {citySuggest.map((city, index) => (
                  <li
                    key={index}
                    className="cursor-pointer hover:bg-indigo-100 p-1 rounded"
                    onClick={() => {
                      setFieldValue('city', city.Name);
                      setFieldValue('pincode', city.Pincode);
                      setCitySuggest([]);
                    }}
                  >
                    {city.Name}, {city.Pincode}
                  </li>
                ))}
              </ul>
            )}

            <div>
              <Field name="city" placeholder="City" className="w-full px-4 py-2 border rounded-md" />
              <ErrorMessage name="city" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <Field name="number" placeholder="Phone Number" className="w-full px-4 py-2 border rounded-md" />
              <ErrorMessage name="number" component="div" className="text-red-500 text-sm" />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition duration-200"
            >
              Pay ₹{totalPrice}
            </button>
          </Form>
        )}
      </Formik>

      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />
    </div>
  );
};

export default BuyNowPage;

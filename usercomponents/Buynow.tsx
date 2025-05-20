'use client'
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Script from "next/script";

interface BuyDetails {
  id: string;
  title: string;
  description: string;
  rating: number;
  price: number;
  image: string;
  category: string;
}

interface FormValues {
  fullname: string;
  address: string;
  number: string;
  pincode: string;
  city: string;
}

interface Props {
  buydetails: BuyDetails;
}

const BuyNowPage = ({ buydetails }: Props) => {
  const router = useRouter();
  const [citySuggest, setCitySuggest] = useState<any[]>([]);
  const [pinInvalid, setPinInvalid] = useState(false);

  const fetchCitySuggestions = async (pincode: string) => {
    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await res.json();
      if (data[0].Status === "Success") {
        setCitySuggest(data[0].PostOffice);
        setPinInvalid(false);
      } else {
        setCitySuggest([]);
        setPinInvalid(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const initialValues: FormValues = {
    fullname: "",
    address: "",
    number: "",
    pincode: "",
    city: "",
  };

  const validationSchema = Yup.object({
    fullname: Yup.string().required("Full Name is required"),
    address: Yup.string().required("Address is required"),
    number: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    pincode: Yup.string()
      .matches(/^[0-9]{6}$/, "Pincode must be 6 digits")
      .required("Pincode is required"),
    city: Yup.string().required("City is required"),
  });

  const simulatePayment = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        toast.success("Payment Successful!");
        resolve(true);
      }, 1500); 
    });
  };

  const handleSubmit = async (values: FormValues) => {
    toast.info("Processing Payment...");
    const paymentSuccess = await simulatePayment();

    if (paymentSuccess) {
      localStorage.setItem("order_detail_single", JSON.stringify(values));
      toast.success("Order Confirmed!");
      router.push("/user/home");
    } else {
      toast.error("Payment Failed. Please try again.");
    }
  };

  const handlePayment = async (amount: number) => {
    const res = await fetch("/api/order", {
      method: "POST",
      body: JSON.stringify({ amount }),
    });
    const { orderId } = await res.json();
  
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: amount * 100, 
      currency: "INR",
      name: "Your Company",
      description: "Order Payment",
      order_id: orderId,
      handler: function (response: any) {
        alert("Payment Successful!");
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "1234567890",
      },
      notes: {
        address: "Customer Address",
      },
      theme: {
        color: "#F37254",
      },
    };
  
    const rzp = new Razorpay    (options);
    rzp.open();
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-semibold text-center mb-6">Order Details</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => (
          <Form className="space-y-6">
            <div>
              <label htmlFor="fullname">Full Name</label>
              <Field name="fullname" className="form-input" />
              <ErrorMessage name="fullname" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label htmlFor="address">Address</label>
              <Field name="address" className="form-input" />
              <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label htmlFor="pincode">Pincode</label>
              <Field
                name="pincode"
                className="form-input"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  const val = e.target.value;
                  if (val.length === 6) {
                    fetchCitySuggestions(val);
                  }
                }}
              />
              <ErrorMessage name="pincode" component="div" className="text-red-500 text-sm" />
              {pinInvalid && <div className="text-red-500 text-sm">Invalid Pincode</div>}
            </div>

            {citySuggest.length > 0 && (
              <div className="bg-gray-100 p-2 rounded-md">
                <ul>
                  {citySuggest.map((city, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        handleChange({ target: { name: "city", value: city.Name } } as any);
                        handleChange({ target: { name: "pincode", value: city.Pincode } } as any);
                        setCitySuggest([]);
                      }}
                      className="cursor-pointer p-2 hover:bg-blue-100"
                    >
                      {city.Name} - {city.Pincode}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <label htmlFor="city">City</label>
              <Field name="city" className="form-input" />
              <ErrorMessage name="city" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label htmlFor="number">Phone Number</label>
              <Field name="number" className="form-input" />
              <ErrorMessage name="number" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="mt-4 text-center">
              <button
                type="submit"
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600"
              >
                Place Order
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <Script
      src="https://checkout.razorpay.com/v1/checkout.js"
      strategy="beforeInteractive"
    />
    <button onClick={() => handlePayment(100)}>Pay ₹100</button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const dummyBuyDetails: BuyDetails = {
    id: id as string,
    title: "Sample Product",
    description: "Sample Description",
    rating: 4.5,
    price: 99,
    image: "/placeholder.png",
    category: "Electronics",
  };

  return {
    props: {
      buydetails: dummyBuyDetails,
    },
  };
};

export default BuyNowPage;

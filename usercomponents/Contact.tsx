'use client'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Head from 'next/head';

const ContactPage = () => {
  const initialValues = {
    name: '',
    email: '',
    message: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    message: Yup.string().min(50, 'Message must be at least 50 characters').required('Message is required'),
  });

  const onSubmit = (values: typeof initialValues) => {
    console.log('Form data', values);
    // Handle form submission logic here
  };

  return (
    <>
      <Head>
        <title>Contact Us - Grocery</title>
        <meta name="description" content="Get in touch with Grocery for support or inquiries." />
      </Head>

      <main className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold text-center text-green-600 mb-6">Contact Us</h1>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="e.g. John Doe"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="e.g johndoe@gmail.com"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Message</label>
                <Field
                  as="textarea"
                  id="message"
                  name="message"
                  placeholder="Your message here"
                  rows={4}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                />
                <ErrorMessage name="message" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  Send Message
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </main>
    </>
  );
};

export default ContactPage;

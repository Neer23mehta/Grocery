// pages/about.tsx

import Head from 'next/head';

const About = () => {
  return (
    <>
      <Head>
        <title>About Us - Grocery</title>
        <meta name="description" content="Learn more about Grocery, your trusted online grocery store." />
      </Head>

      <main className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-green-600 sm:text-5xl">
            About Grocery
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Your trusted online grocery store delivering fresh and quality products to your doorstep.
          </p>

          <div className="mt-10">
            <h2 className="text-3xl font-semibold text-gray-800">Our Mission</h2>
            <p className="mt-4 text-lg text-gray-600">
              At Grocery, we aim to make grocery shopping convenient, affordable, and accessible for everyone. We source the best products from trusted suppliers and deliver them right to your door.
            </p>
          </div>

          <div className="mt-10">
            <h2 className="text-3xl font-semibold text-gray-800">Our Values</h2>
            <ul className="mt-4 space-y-4 text-lg text-gray-600">
              <li>Quality: We prioritize the freshness and quality of our products.</li>
              <li>Convenience: Shop from the comfort of your home with easy navigation.</li>
              <li>Customer Satisfaction: Your satisfaction is our top priority.</li>
              <li>Affordability: We offer competitive prices without compromising on quality.</li>
            </ul>
          </div>

          <div className="mt-10">
            <h2 className="text-3xl font-semibold text-gray-800">Our Story</h2>
            <p className="mt-4 text-lg text-gray-600">
              Founded by Neer Mehta, Grocery started with a simple idea: to provide a seamless online grocery shopping experience. Today, we serve thousands of customers, ensuring they have access to fresh and quality products at their fingertips.
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

export default About;

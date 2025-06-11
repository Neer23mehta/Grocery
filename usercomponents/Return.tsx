  'use client'
  import Head from 'next/head';

  export default function ReturnPolicy() {
    return (
      <>
        <Head>
          <title>Return Policy - Grocery</title>
          <meta name="description" content="Our return policy for Grocery e-commerce store." />
        </Head>

        <main className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold text-center text-green-600 mb-6">Return Policy</h1>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">30-Day Return Window</h2>
              <p className="text-lg text-gray-600">
                You have 30 days from the date of delivery to return most items purchased from Grocery.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">Eligibility Criteria</h2>
              <ul className="list-disc pl-6 text-lg text-gray-600">
                <li>Items must be unused, unopened, and in resalable condition.</li>
                <li>Original packaging and tags must be intact.</li>
                <li>Perishable goods, hygiene products, and personalized items are non-returnable.</li>
              </ul>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">Return Process</h2>
              <p className="text-lg text-gray-600">
                To initiate a return, please contact our customer service at{' '}
                <a href="mailto:support@grocery.com" className="text-green-600">support@grocery.com</a> with your order number and reason for return.
              </p>
              <p className="text-lg text-gray-600">
                Once your return is approved, we will provide you with a prepaid return label.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">Refund Process</h2>
              <p className="text-lg text-gray-600">
                Refunds will be processed to your original payment method within 7-10 business days after we receive the returned item.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">Exchanges</h2>
              <p className="text-lg text-gray-600">
                Exchanges are subject to product availability. Please contact customer service to arrange an exchange.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">Contact Us</h2>
              <p className="text-lg text-gray-600">
                If you have any questions or need assistance, please reach out to us at{' '}
                <a href="mailto:support@grocery.com" className="text-green-600">support@grocery.com</a> or call{' '}
                <span className="text-green-600">+91-XXXXXXXXXX</span>.
              </p>
            </section>
          </div>
        </main>
      </>
    );
  }

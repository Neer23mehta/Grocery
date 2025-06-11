import Head from 'next/head'

const faqs = [
  {
    question: 'How do I place an order?',
    answer: 'Browse products, add to cart, and proceed to checkout.',
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept credit/debit cards, UPI, and wallets like Paytm and PhonePe.',
  },
  {
    question: 'How can I track my order?',
    answer: 'Log in to your account and visit the "My Orders" section.',
  },
]

export default function HelpPage() {
  return (
    <>
      <Head>
        <title>Help Center - Grocery</title>
        <meta name="description" content="Customer support and FAQs for Grocery" />
      </Head>

      <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold text-center text-green-600 mb-6">Grocery Help Center</h1>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Frequently Asked Questions</h2>
            <dl className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b pb-4">
                  <dt className="font-medium text-gray-900">{faq.question}</dt>
                  <dd className="mt-1 text-gray-600">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800">Contact Support</h2>
            <p className="mt-2 text-gray-600">
              If you need further assistance, feel free to reach out to us:
            </p>
            <ul className="mt-4 space-y-2">
              <li>Email: <a href="mailto:support@grocery.com" className="text-green-600">support@grocery.com</a></li>
              <li>Phone: <span className="text-green-600">+91-XXXXXXXXXX</span></li>
            </ul>
          </section>
        </div>
      </div>
    </>
  )
}

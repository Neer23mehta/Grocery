'use client'
import { useState } from 'react';

export default function CustomerService() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    setSubmitted(true);
  };

  return (
    <main className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-green-600 mb-6">Customer Service</h1>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Contact Us</h2>
          <p className="text-lg text-gray-600">We're here to assist you. Reach out to us through any of the following channels:</p>
          <ul className="list-disc pl-6 text-lg text-gray-600">
            <li>Email: <a href="mailto:support@grocery.com" className="text-green-600">support@grocery.com</a></li>
            <li>Phone: <span className="text-green-600">+91-XXXXXXXXXX</span></li>
            <li>Live Chat: Available 24/7 on our website</li>
            <li>Social Media: Connect with us on <a href="#" className="text-green-600">Facebook</a>, <a href="#" className="text-green-600">Instagram</a>, and <a href="#" className="text-green-600">Twitter</a></li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Frequently Asked Questions</h2>
          <ul className="list-disc pl-6 text-lg text-gray-600">
            <li>How can I track my order?</li>
            <li>What is your return policy?</li>
            <li>How do I change my account settings?</li>
            <li>What payment methods do you accept?</li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Self-Service Options</h2>
          <ul className="list-disc pl-6 text-lg text-gray-600">
            <li><a href="#" className="text-green-600">Order Tracking</a></li>
            <li><a href="#" className="text-green-600">Returns Portal</a></li>
            <li><a href="#" className="text-green-600">Knowledge Base</a></li>
            <li><a href="#" className="text-green-600">Help Center</a></li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Business Hours</h2>
          <p className="text-lg text-gray-600">Our support team is available during the following hours:</p>
          <ul className="list-disc pl-6 text-lg text-gray-600">
            <li>Monday to Friday: 9:00 AM – 6:00 PM IST</li>
            <li>Saturday: 10:00 AM – 4:00 PM IST</li>
            <li>Sunday: Closed</li>
          </ul>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Send Us a Message</h2>
          {submitted ? (
            <p className="text-lg text-green-600">Thank you for reaching out! We'll get back to you soon.</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-gray-700">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-lg font-medium text-gray-700">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-lg font-medium text-gray-700">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                Send Message
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}

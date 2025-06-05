'use client'
import React, { useState } from "react";
import { Uassets } from "@/Uassets/uassets";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaApplePay, FaGooglePay, FaCcVisa, FaCcMastercard, FaCcPaypal } from "react-icons/fa";
import { toast } from "react-toastify";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = async(e:any) => {
    e.preventDefault();
    try {
        const res = await axios.post("http://localhost:4000/posts",{
            email:email
        })
        if(res){
            toast.success("Subscribe Successfully")
            setEmail("")
        }
        else {
            toast.error("Something went Wrong")
        }
    } catch (error) {
        console.log(error)
        toast.error("Something went Wrong")
    }    
  };

  return (
    <footer className="bg-white text-black shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.25)] mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div>
            <div className="flex justify-center items-center mt-10">
            <Image
              src={Uassets.logos}
              alt="Grocery Logo"
              className="h-12 w-auto text-amber-400"
            />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Fresh Groceries Delivered</h3>
            <p className="mb-4">Your one-stop destination for fresh, quality groceries delivered right to your doorstep.</p>
            <p className="text-sm">Created by Neer</p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["Home", "Products", "Categories", "About", "Contact", "Delivery Information", "Return Policy"].map((link) => (
                <li key={link}>
                  <Link href={`/user/${link.toLowerCase()}`} className="hover:text-amber-400 transition-colors duration-300">{link}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Customer Support</h3>
            <ul className="space-y-2">
              {["Help Center", "Track Order", "Customer Service", "FAQs", "Shipping Information"].map((link) => (
                <li key={link}>
                  <Link href={`${link.split(' ')[0]}`} className="hover:text-white transition-colors duration-300">{link}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FaPhone className="text-amber-400" />
                <span>1-800-GROCERY</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-amber-400" />
                <span>support@grocery.com</span>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-amber-400" />
                <span>123 Grocery St, Food City</span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-amber-400" />
                <span>Mon-Sat: 9AM-9PM</span>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-white mb-2">Newsletter</h4>
              <p className="mb-4">Subscribe for exclusive offers and updates!</p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-400 text-black rounded hover:bg-amber-500 transition-colors duration-300"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center">
          <div className="flex gap-6 mb-6">
            {[
              { icon: FaFacebook, label: "Facebook" },
              { icon: FaInstagram, label: "Instagram" },
              { icon: FaTwitter, label: "Twitter" },
              { icon: FaLinkedin, label: "LinkedIn" }
            ].map(({ icon: Icon, label }) => (
              <Link
                key={label}
                href="#"
                className="text-2xl hover:text-amber-400 hover:scale-110 transition-all duration-300"
                aria-label={label}
              >
                <Icon />
              </Link>
            ))}
          </div>
          <div className="flex gap-4 mb-6">
            {[
              { icon: FaCcVisa, label: "Visa" },
              { icon: FaCcMastercard, label: "Mastercard" },
              { icon: FaCcPaypal, label: "PayPal" },
              { icon: FaApplePay, label: "Apple Pay" },
              { icon: FaGooglePay, label: "Google Pay" }
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="text-3xl" title={label}>
                <Icon />
              </span>
            ))}
          </div>
          <div className="text-center text-sm">
            <p className="mb-2">© 2024 Grocery App. All rights reserved.</p>
            <div className="flex justify-center gap-4">
              <Link href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</Link>
              <span>|</span>
              <Link href="#" className="hover:text-white transition-colors duration-300">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
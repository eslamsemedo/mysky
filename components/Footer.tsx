import React from 'react'
import Image from "next/image"
import { Facebook, Instagram, Youtube, Plane, MapPin, Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from 'next/link'

const Footer = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Hero Section */}
      <div className="relative h-[50vh] flex flex-col items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/imgs/2.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">Explore Your Travel</h1>
          <p className="text-xl md:text-2xl font-light">Your New Traveling Idea</p>
        </div>
        {/* Newsletter Section */}
        <div className=" max-[768px]:h-[315px] absolute  z-20 transform  translate-y-3/4 px-4 pb-20">
          <div className="max-w-4xl mx-auto max-[768px]:h-[315px]">
            <div className="max-[640px]:h-[215px] bg-gradient-to-r from-blue-600 to-blue-500 rounded-3xl p-8 md:p-12 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10 ">
                <svg className="w-full h-full" viewBox="0 0 400 200" fill="none">
                  <path d="M0 100C100 50 200 150 400 100" stroke="white" strokeWidth="2" />
                  <path d="M0 120C100 70 200 170 400 120" stroke="white" strokeWidth="2" />
                  <path d="M0 80C100 30 200 130 400 80" stroke="white" strokeWidth="2" />
                </svg>
              </div>

              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
                {/* Left Content */}
                <div className="flex-1 text-center  lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start mb-6">
                    <Plane className="w-8 h-8 text-white mr-3" />
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Sign Up Your Newsletter</h2>

                  <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0">
                    {/* <Input
                      type="email"
                      placeholder="Enter Email Address"
                      className="flex-1 bg-white/90 border-0 rounded-full px-6 py-3 text-gray-800 placeholder:text-gray-500"
                    />
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-8 py-3 font-semibold">
                      Subscribe ✈
                    </Button> */}
                  </div>

                  {/* <p className="text-white/80 text-sm mt-4">You agree to Tourin Terms and Conditions, Privacy Policy</p> */}
                </div>

                {/* Right Image */}
                <div className="hidden lg:block flex-shrink-0">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/20">
                    <Image
                      src="/imgs/logo4.png"
                      alt="Travel couple"
                      width={260}
                      height={260}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Footer */}
      <footer id="footer" className="bg-slate-900 text-white  px-3 pt-[230px] pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center mb-4 ">
                {/* <div className="w-[60px] h-[60px] bg-orange-500 rounded-full mr-3 flex items-center justify-center overflow-hidden">
                  <Image

                    src={"/imgs/logo4.png"} // Replace with your logo path
                    alt="Logo"
                    width={100}
                    height={100}
                    className="object-cover scale-125 rounded-full"
                  />
                </div> */}
                <span className="text-2xl font-bold"><span className='text-orange-400'>MY</span><span className='text-blue-500'>SKY</span></span>
              </div>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                MY SKY makes travel easy, exciting, and unforgettable—from beach getaways to adventure tours.
              </p>
              <div>
                <p className="text-sm mb-3">Connect with us</p>
                <div className="flex space-x-3">
                  <Link href={""}>
                    <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                  </Link>
                  <Link href={"https://www.instagram.com/mysky_travel?igsh=M21ueGdkc3EwZXg5"}>
                    <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                  </Link>
                  <Youtube className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
                </div>
              </div>
            </div>

            {/* About Tourin */}
            <div>
              <h3 className="font-semibold mb-4"><span className='text-orange-400'>MY</span><span className='text-blue-500'>SKY</span></h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    FAQ's
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Term & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Useful Links */}
            <div>
              <h3 className="font-semibold mb-4">Useful Links</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    FAQ's
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Term & Conditions
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Tour Gallery & Quick Contact */}
            <div>
              {/* <h3 className="font-semibold mb-4">Tour Gallery</h3>
              <div className="grid grid-cols-3 gap-2 mb-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={`https://placehold.co/600x400.jpg?text=Gallery+${i}`}
                      alt={`Gallery ${i}`}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover hover:scale-110 transition-transform"
                    />
                  </div>
                ))}
              </div> */}

              <h3 className="font-semibold mb-4">Quick Contact</h3>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Hurghada, Egypt</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>+20 1101515111</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span>mohamed.salem1467@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
            <p>
              Copyright © 2025 <span className='text-orange-400'>MY</span><span className='text-blue-500'>SKY</span> All Right Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer




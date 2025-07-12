"use client"
import React from 'react'
import Image from 'next/image'
import { MapPin, Timer, CreditCard, CableCar, Search, Play, Plane, Hotel, Crown, Car, FileText, Users } from 'lucide-react'
const bg = '/imgs/1.jpg' // Make sure this file exists in public/imgs/ or update to a valid image

import Link from 'next/link'

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
  // setMenuOpen(false); // Close mobile menu after navigation
};


const Hero = () => {


  return (
    <div id="hero" className="relative min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      <Image
        src={bg}
        alt="Gym banner – man lifting weights"
        fill
        priority
        sizes="100vw"
        className="object-cover bg-cover bg-center w-full h-full"
        style={{ objectFit: 'cover' }}
      />

      <div className="absolute inset-0 bg-black/40" />

      {/* heading */}
      <div className="absolute inset-0 flex flex-col justify-center px-[10%] space-y-6 transform -translate-y-1/5 pointer-events-none">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg leading-tight">
          Find your <span className="text-orange-400">perfect getaway</span>
        </h1>

        <p className=" hidden md:block max-w-xl text-lg md:text-xl text-white/90">
          Hand-picked tours, bespoke experiences and 24/7 support — all at your fingertips.
        </p>

        <div className="flex space-x-4 pointer-events-auto">
          <button
            onClick={() => scrollToSection("trips")}
            className=" cursor-pointer bg-orange-400 hover:bg-orange-500 transition-colors text-white font-semibold px-8 py-4 rounded-lg shadow-lg">
            Explore Tours
          </button>

          <Link
            href={"https://youtu.be/yOg75UDkxLg?si=-OE2RSUP4r4B-KiH"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-white/90 hover:text-white cursor-pointer">
            <Play className="w-6 h-6" />
            <span>Watch video</span>
          </Link>
        </div>
      </div>

      {/* Features Showcase */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent pb-4 sm:pb-6 lg:pb-8">
        <div className="container mx-auto mb-24 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3 lg:gap-4">
            {/* Flight Tickets */}
            <div className="group bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20">
              <div className="bg-orange-400/20 rounded-full w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:bg-orange-400/30 transition-colors">
                <Plane className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-orange-400" />
              </div>
              <h3 className="text-white font-semibold text-xs sm:text-sm lg:text-sm leading-tight">Flight Tickets</h3>
            </div>

            {/* Hotel Booking */}
            <div className="group bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20">
              <div className="bg-blue-400/20 rounded-full w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:bg-blue-400/30 transition-colors">
                <Hotel className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-400" />
              </div>
              <h3 className="text-white font-semibold text-xs sm:text-sm lg:text-sm leading-tight">Hotel Booking</h3>
            </div>

            {/* VIP Lounge */}
            <div className="group bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20">
              <div className="bg-purple-400/20 rounded-full w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:bg-purple-400/30 transition-colors">
                <Crown className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-purple-400" />
              </div>
              <h3 className="text-white font-semibold text-xs sm:text-sm lg:text-sm leading-tight">VIP Lounge</h3>
            </div>

            {/* Transportation */}
            <div className="group bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20">
              <div className="bg-green-400/20 rounded-full w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:bg-green-400/30 transition-colors">
                <Car className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-400" />
              </div>
              <h3 className="text-white font-semibold text-xs sm:text-sm lg:text-sm leading-tight">Transportation</h3>
            </div>

            {/* Visa & Tour Planning */}
            <div className="group bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20">
              <div className="bg-red-400/20 rounded-full w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:bg-red-400/30 transition-colors">
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-red-400" />
              </div>
              <h3 className="text-white font-semibold text-xs sm:text-sm lg:text-sm leading-tight">Visa & Tours</h3>
            </div>

            {/* Meet & Assist */}
            <div className="group bg-white/10 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20">
              <div className="bg-pink-400/20 rounded-full w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex items-center justify-center mx-auto mb-2 sm:mb-3 group-hover:bg-pink-400/30 transition-colors">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-pink-400" />
              </div>
              <h3 className="text-white font-semibold text-xs sm:text-sm lg:text-sm leading-tight">Meet & Assist</h3>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Hero

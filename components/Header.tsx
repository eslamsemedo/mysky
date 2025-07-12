"use client"
import React from 'react'
import { Facebook, Twitter, Instagram, Youtube, X, Send, MapPin, ChevronDown, ShoppingCart, Search, Menu, Phone } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';


const Header = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleMenuClick = () => {
    setMenuOpen(!menuOpen);
  }

   const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setMenuOpen(false); // Close mobile menu after navigation
  };

  const navigationItems = [
    { label: "Home", id: "hero" },
    { label: "Destinations", id: "places" },
    { label: "About", id: "service" },
    { label: "Trips", id: "trips" },
    { label: "Why Us", id: "special" },
    { label: "Reviews", id: "reviews" },
    { label: "Contact", id: "footer" },
  ];

  return (
    <div
      className='w-full bg-blue-600 relative h-[80px]'
    >
      <div className="flex flex-col sm:flex-row justify-between items-center w-[95%] sm:w-[80%] mx-auto py-2 text-white gap-2 sm:gap-1">
        <div className="text-xs md:text-base text-center md:text-left">
          <p className="flex flex-col md:flex-row items-center gap-1 md:gap-2">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4 " /> <Link className='hover:text-blue-300' href={"https://maps.app.goo.gl/mMJuw4dU5TT1YZu76"}>Home</Link>
            </span>
            <span className="hidden md:inline">|</span>
            <span className="flex items-center gap-1">
              <Send className="w-4 h-4" /> mohamed.salem1467@gmail.com
            </span>
          </p>
        </div>
        <div className="flex gap-2 flex-row justify-center">
          <Link href={""}>
            <Facebook className="w-4 h-4 md:w-5 md:h-5" />
          </Link>
          <Link href={"https://www.instagram.com/mysky_travel?igsh=M21ueGdkc3EwZXg5"}>
            <Instagram className="w-4 h-4 md:w-5 md:h-5" />
          </Link>
        </div>
      </div>
      <div className='z-40 absolute flex justify-between items-center p-5 md:top-[50%] md:w-[90%] w-full md:rounded-tr-full md:rounded-br-full h-full bg-white'>
        {/* Left - Logo and Nav */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-4 overflow-hidden">
            <div className="w-[60px] h-[60px] rounded-full bg-orange-400 flex items-center justify-center text-white">
              <Image

                src={"/imgs/logo4.png"} // Replace with your logo path
                alt="Logo"
                width={100}
                height={100}
                className="object-cover scale-125"
              />
            </div>
            <span className="text-2xl font-bold">
              <span className="text-orange-400">MY</span><span className="text-blue-600">SKY</span>
            </span>
          </div>
          {/* 1135 */}
          {/* Nav Links */}
        </div>
        <div className="flex items-center gap-6">

          <ul className="max-[1135px]:hidden flex items-center gap-6 text-black font-medium">
            {navigationItems.map((item, index) => (
              <li
                key={index}
                className="cursor-pointer flex items-center gap-2 hover:text-orange-400 transition-colors duration-200"
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Right - Contact, Cart, Search, Button */}
        <div className="flex items-center gap-6 h-full">
          {/* Call Info */}
          <div className="flex items-center space-x-2 max-[650px]:hidden">
            <Link href={"https://wa.me/+201101515111"} className="w-10 h-10 rounded-full bg-orange-400 flex items-center justify-center text-white">
              <Phone className="w-6 h-6" />
            </Link>
            <div className="text-sm ">
              <p className="text-gray-600">Call Anytime</p>
              <p className="font-bold">+20 1101515111</p>
            </div>
          </div>

          {/* Cart and Search */}
          <div className="flex items-center space-x-4">
            {/* <div className="relative">
              <ShoppingCart className="w-6 h-6 text-black" />
              <span className="absolute -top-2 -right-2 bg-orange-400 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">3</span>
            </div> */}

            {/* <div>
              <Search className="w-5 h-5 text-black" />
            </div> */}
          </div>

          {/* Booking Button */}
          <button
          onClick={() => scrollToSection("places")}
           className="cursor-pointer max-[650px]:hidden bg-orange-400 text-white px-3 py-2 h-full rounded-full font-semibold">
            Booking Now
          </button>
          {/* the menu buttom with slider to review the options */}
          <div className="min-[1135px]:hidden">
            <button
              onClick={() => handleMenuClick()}
              className="p-2 rounded-full bg-orange-400 text-white">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* mobile */}
      <div
        className={`
          fixed inset-0 z-50 w-full h-full bg-gradient-to-br from-blue-50 to-white
          transform transition-all duration-300 ease-in-out
          ${menuOpen ? "translate-x-0" : "translate-x-full"}
          p-6
        `}
        style={{ willChange: 'transform', pointerEvents: menuOpen ? 'auto' : 'none', visibility: menuOpen ? 'visible' : 'hidden' }}
      >
        {/* Mobile menu content */}
        <div className="flex flex-col h-full relative">
          {/* Header with close button */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-12 h-12 rounded-full bg-orange-400 flex items-center justify-center overflow-hidden">
                <Image
                  src={"/imgs/logo4.png"}
                  alt="Logo"
                  width={40}
                  height={40}
                  className="object-cover scale-125"
                />
              </div>
              <span className="text-xl font-bold">
                <span className="text-orange-400">MY</span><span className="text-blue-600">SKY</span>
              </span>
            </div>
            <button
              onClick={handleMenuClick}
              className="p-3 rounded-full bg-orange-400 text-white hover:bg-orange-500 transition-colors duration-200"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Menu</h3>
            <ul className="space-y-4">
              {navigationItems.map((item, index) => (
                <li
                  key={index}
                  className="cursor-pointer group"
                  onClick={() => scrollToSection(item.id)}
                >
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-50 transition-all duration-200 group-hover:translate-x-2">
                    <div className="w-2 h-2 rounded-full bg-orange-400 group-hover:scale-125 transition-transform duration-200"></div>
                    <span className="text-lg font-medium text-gray-700 group-hover:text-orange-500 transition-colors duration-200">
                      {item.label}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          
        </div>
      </div>
    </div>
  )
}

export default Header

import React from 'react'
import { Headphones, Clock, Shield, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from 'next/image'


// const bg = '/imgs/1.jpg'

const service = () => {
  return (
    <>
      <div id="service" className="bg-white py-16 px-4 relative">
        {/* <Image
          src={bg}
          alt="world"
          fill
          priority
          className=" w-full h-full z-0"
        // style={{ objectFit: 'cover' }}
        /> */}
        <div className="max-w-7xl mx-auto z-10 items-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Image collage */}
            <div className="relative">
              <div className="grid grid-cols-2 grid-rows-3 gap-4 h-[500px]">
                {/* Main image - Woman with hat */}
                <div className="relative rounded-3xl row-span-2 overflow-hidden">
                  <Image
                    src="/service/enjoy.png"
                    alt="Traveler enjoying vacation"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-end justify-center p-4">
                    <div className="text-center">
                      {/* <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center backdrop-blur-sm">
                        <div className="w-24 h-24 bg-white/30 rounded-full"></div>
                      </div> */}
                      <div className="text-white text-sm font-medium">Traveler enjoying vacation</div>
                    </div>
                  </div>
                </div>

                {/* Mountain landscape with discount badge */}
                <div className="relative row-span-2">
                  <div className="relative rounded-3xl overflow-hidden h-full">
                    <Image
                      src="/service/mountain.png"
                      alt="Mountain Adventure"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-end justify-center p-4">
                      <div className="text-center">
                        {/* <div className="w-16 h-16 bg-green-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                          <div className="w-12 h-12 bg-white/20 rounded-full"></div>
                        </div> */}
                        <div className="text-white text-xs font-medium">Mountain Adventure</div>
                      </div>
                    </div>
                  </div>
                  {/* Discount badge */}
                  <div className="absolute -top-2 -right-2 bg-white rounded-full p-3 shadow-lg border-4 border-orange-400">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-500">50%</div>
                      <div className="text-xs text-orange-500 font-medium">Discount</div>
                    </div>
                  </div>
                </div>

                {/* Beach scene - spans full width */}
                <div className="col-span-2 relative rounded-3xl overflow-hidden h-32">
                  <Image
                    src="/service/sea.png"
                    alt="Beautiful coastal destination"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="text-white text-sm font-medium">Beautiful coastal destination</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Content */}
            <div className=" relative z-10 space-y-8">
              {/* Header */}
              <div>
                <p className="text-blue-500 font-medium mb-2">About Company</p>
                <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                  Our Main Goal To Provide Best Travel Solutions
                </h2>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
              From weekend escapes to once-in-a-lifetime expeditions, we turn travel dreams into seamless reality.  With insider expertise, hand-picked partners, and round-the-clock support, we handle every detail so you can simply enjoy the journey.
              </p>

              {/* Features grid */}
              <div className="grid grid-cols-2 gap-6">
                {/* Friendly Guide */}
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-500 rounded-full p-3 flex-shrink-0">
                    <Headphones className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Friendly Guide</h3>
                    <p className="text-sm text-gray-600">Our locally based guides aren’t just experts—they’re storytellers who share hidden gems and culture with a personal touch.

                    </p>
                  </div>
                </div>

                {/* Save Time */}
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-500 rounded-full p-3 flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Save Time</h3>
                    <p className="text-sm text-gray-600">Every itinerary is backed by vetted accommodations, trusted transport, and 24/7 assistance for total peace of mind.
                    </p>
                  </div>
                </div>

                {/* Safety Travel */}
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-500 rounded-full p-3 flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Safety Travel</h3>
                    <p className="text-sm text-gray-600">Skip the guesswork—our planning tools and priority access mean less waiting and more exploring on every trip.
                    </p>
                  </div>
                </div>

                {/* Best Price */}
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-500 rounded-full p-3 flex-shrink-0">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Best Price</h3>
                    <p className="text-sm text-gray-600">Thanks to global partnerships, we secure exclusive rates and transparent pricing—no surprises, just great value.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button
              <div>
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-medium">
                  Discover More
                </Button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default service






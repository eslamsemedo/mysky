import React from 'react'
import Image from "next/image"
import { Gift, MapPin, Users, Heart } from "lucide-react"

const special = () => {
  const features = [
    {
      image: "/speical/guides.png",
      icon: Gift,
      stat: "2000+",
      title: "Our Worldwide Guides",
      alt: "Travelers with backpacks exploring",
    },
    {
      image: "/speical/trusted.png",
      icon: MapPin,
      stat: "100%",
      title: "Trusted Tour Agency",
      alt: "People planning travel with maps",
    },
    {
      image: "/speical/tears.png",
      icon: Users,
      stat: "12+",
      title: "Years of Travel Experience",
      alt: "Travel luggage and accessories",
    },
    {
      image: "/speical/happy.png",
      icon: Heart,
      stat: "98%",
      title: "of Our Travelers are Happy",
      alt: "Person on mountain peak",
    },
  ]

  return (
    <section id="special" className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-gray-500 text-sm font-medium tracking-wider uppercase mb-4"><span className='text-orange-400'>MY</span><span className='text-blue-500'>SKY</span> SPECIALS</p>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800">Why Travel with <span className='text-orange-400'>MY</span><span className='text-blue-500'>SKY</span> ?</h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={index}
                className="bg-white rounded-2xl  shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image Container */}
                <div className="relative h-48 flex items-end justify-center">
                  <Image
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover rounded-2xl" />
                  {/* Icon Overlay */}
                  {/* <div className="  w-fit transform  translate-y-1/2  rounded-full p-3  z-40 pointer-events-none"> */}
                  <div className="w-fit transform translate-y-1/2 rounded-full p-3 z-40 pointer-events-none">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center shadow-lg z-40">
                      <IconComponent className="w-6 h-6 text-orange-500" />
                    </div>
                  </div>
                  {/* Content */}
                </div>
                <div className=" p-6 text-center ">
                  <div className="text-2xl font-bold text-slate-800 mb-2">{feature.stat}</div>
                  <div className="text-slate-600 font-medium">{feature.title}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default special


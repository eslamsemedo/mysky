import React from 'react'
import { Star } from "lucide-react"


const reviews = () => {
  const testimonials = [
    {
      id: 1,
      rating: 5,
      text: "Absolutely flawless from inquiry to touchdown back home! MYSKY’s team built a custom Morocco itinerary that blended souks, desert glamping, and a sunrise hot-air balloon — all I had to do was show up and smile.",
      name: "Sophie Martin",
      role: "Solo Adventurer",
    },
    {
      id: 2,
      rating: 5,
      text: "We booked a two-week family trip across Italy and every transfer, tour, and trattoria felt hand-picked just for us. The kids are still talking about making pizza in Naples, and I’m still amazed we never once felt rushed.",
      name: "Aaron Patel",
      role: "Family Traveler",
    },
    {
      id: 3,
      rating: 5,
      text: "As a last-minute backpacker I expected compromises, but MYSKY scored me mountain-view hostels in Peru and even snagged a spot on the coveted dawn entry to Machu Picchu. Best spontaneous decision I’ve ever made!",
      name: "Leila Chen",
      role: "Backpacker",
    },
  ];

  return (
    <section id="reviews" className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-gray-500 text-sm font-medium tracking-wider uppercase mb-2">REVIEW & TESTIMONIALS</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Top Reviews for <span className='text-orange-400'>MY</span><span className='text-blue-500'>SKY</span></h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Star Rating */}
              <div className="flex justify-center mb-6">
                {[...Array(testimonial.rating)].map((_, index) => (
                  <Star key={index} className="w-5 h-5 fill-orange-400 text-orange-400" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-600 text-center leading-relaxed mb-8">{testimonial.text}</p>

              {/* Customer Info */}
              <div className="text-center">
                <h4 className="font-bold text-gray-900 text-lg mb-1">{testimonial.name}</h4>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Dots
        <div className="flex justify-center space-x-2">
          <button className="w-3 h-3 rounded-full bg-orange-500"></button>
          <button className="w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors"></button>
          <button className="w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-400 transition-colors"></button>
        </div> */}
      </div>
    </section>
  )
}

export default reviews





"use client"
import React from 'react'
import { Smile, Star, Trophy, Award } from "lucide-react"
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'

const Awards = () => {

  const stats = [
    {
      icon: Smile,
      number: 70699,
      suffix: "+",
      label: "Satisfied Clients",
    },
    {
      icon: Star,
      number: 8121,
      suffix: "+",
      label: "Positive Review",
    },
    {
      icon: Trophy,
      number: 703,
      suffix: "+",
      label: "Winning Awards",
    },
    {
      icon: Award,
      number: 20,
      suffix: "+",
      label: "Years Experience",
    },
  ]

  const { ref, inView } = useInView({
    triggerOnce: true,   // only trigger once
    threshold: 0.3,       // percent of component visible
  });

  return (
    <div className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="flex flex-col items-center">
                <div className="relative w-48 h-48 rounded-full border-2 border-blue-200 bg-white flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="mb-4 transform transition-transform duration-300 hover:scale-110">
                    <IconComponent className="w-8 h-8 text-orange-500" strokeWidth={2} />
                  </div>
                  <div ref={ref} className="mb-2">
                    {/* <AnimatedCounter
                      end={stat.number}
                      suffix={stat.suffix}
                      startAnimation={hasIntersected}
                      duration={2000 + index * 200} // Stagger the animations slightly
                    /> */}
                    {inView && <CountUp end={stat.number} duration={2} className="text-4xl font-bold text-blue-400" />}
                  </div>
                  <div className="text-gray-700 text-sm font-medium text-center px-4">{stat.label}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Awards









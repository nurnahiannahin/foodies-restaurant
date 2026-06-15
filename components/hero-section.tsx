import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const HeroSection = () => {
  return (
    <section className="relative w-full h-auto lg:h-screen flex flex-col lg:flex-row items-center bg-gray-50 dark:bg-[#0a0a0a] overflow-hidden">
      
      {/* Left Side: Content - Optimized for height */}
      <div className="w-full lg:w-5/12 px-6 md:px-12 py-10 lg:py-0 flex flex-col gap-4 justify-center">
        {/* Label */}
        <div className="inline-flex items-center gap-2 text-teal-600 font-semibold tracking-wide uppercase text-xs">
          <span className="w-6 h-[2px] bg-teal-600"></span>
          Restaurant in Cox's Bazar
        </div>
        
        {/* Main Heading - Slightly tighter leading */}
        <h1 className="text-3xl md:text-5xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-[1.05] max-w-lg">
          Authentic Flavors, <br />
          <span className="text-teal-600">Crafted</span> with Passion
        </h1>
        
        {/* Description */}
        <p className="text-base lg:text-lg text-gray-600 dark:text-gray-400 max-w-md leading-relaxed">
          Experience the true essence of Bangladeshi cuisine, where traditional recipes meet premium ingredients in the heart of Cox's Bazar.
        </p>
        
        {/* Buttons - Slightly smaller padding */}
        <div className="flex flex-wrap gap-3 pt-2">
          <Button asChild className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-5 text-base rounded-full shadow-md">
            <Link href="/menu">View Menu</Link>
          </Button>
          <Button asChild variant="outline" className="px-6 py-5 text-base rounded-full border-2 border-gray-300 hover:border-teal-600">
            <Link href="/reservation">Reserve a Table</Link>
          </Button>
        </div>
      </div>

      {/* Right Side: Full Height Image */}
      <div className="w-full lg:w-7/12 h-[400px] lg:h-screen relative">
        <Image 
          src="/images/hero1.jpg" 
          alt="Delicious Bangladeshi Biryani"
          fill
          className="object-cover lg:rounded-l-[3rem]"
          priority
        />
        {/* Gradient overlay to help text visibility if overlapping on small screens */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent lg:hidden" />
      </div>

    </section>
  )
}

export default HeroSection
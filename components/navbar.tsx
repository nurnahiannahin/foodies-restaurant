'use client'

import Link from "next/link"
import { useState } from "react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white px-6 md:px-12 py-4 flex justify-between items-center border-b border-gray-100 sticky top-0 z-50">
      
      {/* Logo Section */}
      <div className="flex items-center">
        <Link href="/" onClick={() => setIsOpen(false)}>
          <div className="flex items-center cursor-pointer">
            <span className="font-sans font-bold text-2xl md:text-3xl tracking-tighter text-gray-900">
              Food
            </span>
            <span className="font-sans font-light text-2xl md:text-3xl tracking-tight text-gray-500">
              ies
            </span>
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-teal-500 rounded-full ml-1 mt-2"></div>
          </div>
        </Link>
      </div>

      {/* Hamburger Button */}
      <button 
        className="md:hidden p-2 text-gray-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {/* Navigation Section */}
      <div className={`${isOpen ? 'flex' : 'hidden'} md:flex absolute md:static top-full left-0 w-full md:w-auto bg-white flex-col md:flex-row items-center gap-6 md:gap-8 p-6 md:p-0 shadow-lg md:shadow-none border-t md:border-none`}>
        <ul className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <li>
            <Link href="/menu" className="text-gray-800 hover:text-teal-600 font-sans text-lg md:text-xl font-medium transition-colors" onClick={() => setIsOpen(false)}>
              Menu
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-gray-800 hover:text-teal-600 font-sans text-lg md:text-xl font-medium transition-colors" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>

        <Link href="/reservation" onClick={() => setIsOpen(false)}>
          <button className="px-6 py-2 rounded-full border-2 border-green-500 text-green-600 hover:bg-green-50 transition-all font-sans text-lg font-semibold">
            Reservation
          </button>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
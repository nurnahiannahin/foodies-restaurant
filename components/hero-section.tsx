import React from 'react'
import { Button } from './ui/button'
import { Link } from 'lucide-react'

const HeroSection = () => {
  return (
    <div className="bg-gray-200 p-8 w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Welcome to Foodies</h1>
      <p className="text-lg">Enjoy the best food in town!</p>
      <Button asChild className="px-6 py-3 rounded-lg">
        <a href="/reservation">Make a Reservation</a>
      </Button>
    </div>
  )
}

export default HeroSection

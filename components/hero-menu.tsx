import React from 'react'
import Menus from './menu'

const HeroMenu = () => {
  return (
    <section className="max-w-[1200px] mx-auto mt-20 mb-20 px-6 py-16">
            <div className="mb-12 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Our Menu</h2>
                <p className="text-gray-500 text-xl">Hand-picked flavors, crafted with passion.</p>
            </div>

            <Menus />
    </section>
  )
}

export default HeroMenu

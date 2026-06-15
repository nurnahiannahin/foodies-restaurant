import Menus from '@/components/menu'
import React from 'react'

const page = () => {
  return (
    <section className="max-w-[1200px] mx-auto mb-10 px-6 py-16">
            <div className="mb-12 text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">All Menu</h2>
                <p className="text-gray-500 text-xl">Hand-picked flavors, crafted with passion.</p>
            </div>

            <Menus />
    </section>
  )
}

export default page

'use client'

const Page = () => {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-[#0a0a0a] py-16 px-6">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Header: Scaled to standard heading size */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-16 text-center tracking-tight">
          Experience <span className="text-teal-600">Foodies</span>
        </h1>

        {/* Layout: Grid with balanced gaps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Section 1: Visit Us - Compact Version */}
          <div className="bg-gray-50 dark:bg-gray-900/50 p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Visit Us</h2>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Address</p>
                <p className="text-base font-medium text-gray-800 dark:text-gray-200">Main Road, Cox's Bazar</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Phone</p>
                <p className="text-base font-medium text-teal-600 dark:text-teal-400">+880 123 456 789</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Opening Hours</p>
                <p className="text-base font-medium text-gray-800 dark:text-gray-200">Daily: 10AM - 10PM</p>
              </div>
            </div>
          </div>

          {/* Section 2: Our Passion */}
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Passion</h2>
            <div className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed space-y-4">
              <p>
                At Foodies, we believe every dish tells a story. Founded in Cox's Bazar, our restaurant was born to bring authentic, high-quality flavors to our community.
              </p>
              <p>
                Our chefs use locally sourced ingredients to balance tradition with modern culinary innovation. We strive to make every meal feel like a celebration.
              </p>
            </div>
            
            <div className="mt-2">
              <a href="/reservation" className="inline-block px-8 py-3 bg-teal-600 font-semibold text-white rounded-full hover:bg-teal-700 transition-all shadow-md">
                Reserve a Table
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Page
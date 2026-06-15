const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] text-gray-300 py-12 px-6 border-t border-gray-800">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center md:text-left">
        
        {/* Brand Section */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2 flex flex-col items-center md:items-start">
          <h2 className="text-2xl font-bold text-white mb-3">Foodies</h2>
          <p className="text-lg italic text-teal-400 mb-4">
            "Authentic flavors, crafted with passion."
          </p>
          <p className="text-sm md:text-base text-gray-400 max-w-xs">
            Providing premium culinary experiences with locally sourced ingredients. 
            Join us for a journey of taste.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-lg font-semibold text-white mb-4">Navigation</h4>
          <ul className="space-y-2 text-sm md:text-base">
            <li><a href="/menu" className="hover:text-teal-400 transition-colors">Menu</a></li>
            <li><a href="/reservation" className="hover:text-teal-400 transition-colors">Reservations</a></li>
            <li><a href="/contact" className="hover:text-teal-400 transition-colors">Contact</a></li>
            <li><a href="/admin/dashboard" className="hover:text-teal-400 transition-colors">Admin Panel</a></li>
          </ul>
        </div>

        {/* Contact/Location */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-lg font-semibold text-white mb-4">Find Us</h4>
          <div className="space-y-1 text-sm md:text-base text-gray-400">
            <p>Cox's Bazar, Bangladesh</p>
            <p className="text-teal-400 font-medium pt-1">Daily: 10AM - 10PM</p>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1200px] mx-auto mt-10 pt-6 border-t border-gray-800 text-center md:text-left">
        <p className="text-xs md:text-sm text-gray-600">
          © {new Date().getFullYear()} Foodies. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
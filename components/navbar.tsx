import Link from "next/link"


const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <div>
        <h1 className="text-white text-lg font-bold">Foodies</h1>
      </div>

      <div>
        <ul>
          <Link href="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
          <Link href="/menu" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Menu</Link>
          <Link href="/reservation" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Reservation</Link>
          <Link href="/about" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About</Link>
          <Link href="/contact" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar

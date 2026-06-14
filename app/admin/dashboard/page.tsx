'use client'

import { supabase } from '@/lib/supabaseClient'
import Image from 'next/image'
import { useEffect, useState } from 'react'


interface MenuItem {
    id: number;
    name: string;
    description: string;
    price: number;
    category?: string;
    image_url: string;
    available?: boolean; // Fixed typo
    created_at: string;
}

interface Reservation {
    id: number;
    name: string;
    phone: string;
    date: string; // Change from Date to string
    time: string;
    guests: number;
    message?: string;
}

const page = () => {

    const [reservationList, setReservationList] = useState<Reservation[]>([])

    const [menu, setMenu] = useState<MenuItem[]>([])
    const [error, setError] = useState<string | null>(null) // Added error state

    const [available, setAvailable] = useState('')

    useEffect(() => {
      const fetchData = async () => {
        const { data, error } = await supabase.from('menu_items').select('*')

        if (error) {
            setError(error.message)
        } else {
            setMenu(data as MenuItem[])
        }
      }

      fetchData()
    }, [])

    useEffect(() => {
      const fetchReservationData = async () => {
        const { data, error } = await supabase.from('reservations').select('*')

        if(error) {
            setError(error.message)
        } else {
            setReservationList(data as Reservation[])
        }
      }

      fetchReservationData()
    }, [])


    // Menu additon

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(1)
    const [category, setCategory] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const handleMenuSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const { error } = await supabase
         .from('menu_items')
         .insert({
            name,
            description,
            price,
            category,
            image_url: imageUrl
         })

         if(error) {
            setStatus("error")
         } else {
            setStatus('success')
            setName('')
            setDescription('')
            setPrice(1)
            setCategory('')
            setImageUrl('')
         }
    } 
    
    
    
    
  return (
    <div>
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <p>Welcome to the admin dashboard. Here you can manage reservations, view analytics, and configure settings.</p>

        {/* // Customers and Reservations Section */}
        <div className="mt-6 p-4 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mt-6 mb-2">Recent Reservations</h2>
             <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Customer Name</th>
                        <th className="border border-gray-300 p-2">Phone</th>
                        <th className="border border-gray-300 p-2">Date</th>
                        <th className="border border-gray-300 p-2">Time</th>
                        <th className="border border-gray-300 p-2">Guests</th>
                        <th className="border border-gray-300 p-2">Message</th>
                    </tr>
                </thead>
                <tbody>
                    {reservationList.map((Reservation) => (
                        <tr key={Reservation.id}>
                            <td className="border border-gray-300 p-2">{Reservation.name}</td>
                            <td className="border border-gray-300 p-2">{Reservation.phone}</td>
                            <td className="border border-gray-300 p-2">{new Date(Reservation.date).toLocaleDateString()}</td>
                            <td className="border border-gray-300 p-2">{Reservation.time}</td>
                            <td className="border border-gray-300 p-2">{Reservation.guests}</td>
                            <td className="border border-gray-300 p-2">{Reservation.message}</td>
                        </tr>
                    ))}
                </tbody>
             </table>
        </div>

        {/* // Menu Management Section */}

        <div className="mt-6 p-4 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mt-6 mb-2">Menu Management</h2>
            <p>Here you can add, edit, or remove menu items.</p>
            {/* Add new menu item */}
            <form onSubmit={handleMenuSubmit} className="mt-4 p-4 border w-2/4 border-gray-300 rounded-lg">
                <input type="text" placeholder="Dish Name" 
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 className="p-2 border border-gray-300 rounded mb-2 w-full"
                />
                <input type="text" placeholder="Description" 
                 value={description}
                 onChange={(e) => setDescription(e.target.value)}
                 className="p-2 border border-gray-300 rounded mb-2 w-full" 
                />
                <input type="number" placeholder="Price"
                 value={price}
                 onChange={(e) => setPrice(Number(e.target.value))}
                 className="p-2 border border-gray-300 rounded mb-2 w-full"
                />
                <input type="text" placeholder="Category" 
                 value={category}
                 onChange={(e) => setCategory(e.target.value)}
                 className="p-2 border border-gray-300 rounded mb-2 w-full" 
                />
                <input type="text" placeholder="Image URL"
                 value={imageUrl}
                 onChange={(e) => setImageUrl(e.target.value)}
                 className="p-2 border border-gray-300 rounded mb-2 w-full"
                />
                
                <button 
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                disabled={loading}
                >
                    {loading ? 'Adding Menu...' : 'Add Menu Item'}
                </button>

                {status === 'success' && <p className="text-green-600 mt-2">Menu Added Successfully!</p>}
                {status === 'error' && <p className='text-red-600 mt-2'>Failed to add menu</p>}

            </form>

            {/* Existing Menu Items */}
            <div className="mt-6 p-4 border border-gray-300 rounded-lg w-full">
                <h1 className="text-lg font-semibold mt-6 mb-2">Existing Menu Items</h1>
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">Dish Name</th>
                            <th className="border border-gray-300 p-2">Description</th>
                            <th className="border border-gray-300 p-2">Price</th>
                            <th className="border border-gray-300 p-2">Category</th>
                            <th className="border border-gray-300 p-2">Image URL</th>
                            <th className="border border-gray-300 p-2">Available</th>
                            <th className="border border-gray-300 p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menu.map((menuItem) => (
                            <tr key={menuItem.id}>
                                <td className="border border-gray-300 p-2">{menuItem.name}</td>
                                <td className="border border-gray-300 p-2">{menuItem.description}</td>
                                <td className="border border-gray-300 p-2">{menuItem.price}</td>
                                <td className="border border-gray-300 p-2">{menuItem.category}</td>
                                <td className="border border-gray-300 p-2">{menuItem.image_url ? 'Food Image' :  menuItem.name}</td>
                                <td className="border border-gray-300 p-2">
                                    {menuItem.available ? "Yes" : "No"}
                                </td>
                                <td className="border border-gray-300 p-2">
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Edit</button>
                                    <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 ml-2">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default page

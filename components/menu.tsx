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

const Menus = () => {
    const [data, setData] = useState<MenuItem[]>([])
    const [loading, setLoading] = useState(true) // Added loading state
    const [error, setError] = useState<string | null>(null) // Added error state

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const { data, error } = await supabase.from('menu_items').select('*')
            
            if (error) {
                setError(error.message)
            } else {
                console.log("Fetched Data:", data); // Check your browser console
                setData(data as MenuItem[])
            }
            setLoading(false)
        }

        fetchData()
    }, [])

    if (loading) return <div>Loading menu...</div>
    if (error) return <div>Error loading menu: {error}</div>

    return (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.map((menuItem) => (
                <div key={menuItem.id} className="border p-4 rounded-lg">
                    {/* Ensure image_url is a valid path */}
                    <Image 
                        // Fallback to a placeholder if image_url is null or empty
                        src={menuItem.image_url || '/placeholder-image.png'} 
                        alt={menuItem.name} 
                        width={400} 
                        height={300} 
                        className="w-full h-48 object-cover rounded-md mb-4" 
                    />
                    <h2 className="text-xl font-bold">{menuItem.name}</h2>
                    <p className="text-gray-600">{menuItem.description}</p>
                    <p className="font-semibold mt-2">Price: ${menuItem.price}</p>
                </div>
            ))}
        </section>
    )
}

export default Menus
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
    available?: boolean;
    created_at: string;
}

const Menus = () => {
    const [data, setData] = useState<MenuItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const { data, error } = await supabase.from('menu_items').select('*')
            if (error) {
                setError(error.message)
            } else {
                setData(data as MenuItem[])
            }
            setLoading(false)
        }
        fetchData()
    }, [])

    if (loading) return <div className="text-center py-20 text-gray-500">Loading our signature dishes...</div>
    if (error) return <div className="text-center py-20 text-red-500">Error loading menu: {error}</div>

    return (
    <div className="w-full px-6 py-12 md:px-12">
        {/* Adjusted Grid: Increased gap for balance, 2 columns on lg screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
            {data.map((menuItem) => (
            <div 
                key={menuItem.id} 
                className="flex flex-col gap-4 group"
            >
                {/* Image: Reduced height for better screen fit */}
                <div className="relative w-full h-[250px] md:h-[300px] rounded-3xl overflow-hidden shadow-lg">
                {menuItem.image_url && (
                    <Image 
                        src={menuItem.image_url} 
                        alt={menuItem.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                )}
                </div>
                
                {/* Content: Adjusted text sizes for better hierarchy */}
                <div className="flex flex-col gap-1 px-1">
                <div className="flex justify-between items-baseline gap-4">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                    {menuItem.name}
                    </h1>
                    <span className="text-xl md:text-2xl font-bold text-teal-600 whitespace-nowrap">
                    Tk. {menuItem.price}
                    </span>
                </div>
                
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                    {menuItem.description}
                </p>
                </div>
            </div>
            ))}
        </div>
    </div>
  );
}

export default Menus
'use client'

import { supabase } from '@/lib/supabaseClient'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

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

interface Reservation {
    id: number;
    name: string;
    phone: string;
    date: string;
    time: string;
    guests: number;
    message?: string;
}

const Page = () => {

    const router = useRouter()
    const [authChecked, setAuthChecked] = useState(false)
    const [imageFile, setImageFile] = useState<File | null>(null)

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                router.push('/admin')
            } else {
                setAuthChecked(true)
            }
        }
        checkAuth()
    }, [])

    const [reservationList, setReservationList] = useState<Reservation[]>([])
    const [menu, setMenu] = useState<MenuItem[]>([])
    const [error, setError] = useState<string | null>(null)

    const fetchData = async () => {
        const { data, error } = await supabase.from('menu_items').select('*')
        if (error) setError(error.message)
        else setMenu(data as MenuItem[])
    }

    useEffect(() => {
        if (!authChecked) return
        fetchData()
        const fetchReservationData = async () => {
            const { data, error } = await supabase.from('reservations').select('*')
            if (error) setError(error.message)
            else setReservationList(data as Reservation[])
        }
        fetchReservationData()
    }, [authChecked])

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(1)
    const [category, setCategory] = useState('')
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const handleMenuSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setStatus('idle')

        let uploadedImageUrl = ''

        if (imageFile) {
            const fileExt = imageFile.name.split('.').pop()
            const fileName = `${Date.now()}.${fileExt}`

            const { error: uploadError } = await supabase.storage
                .from('menu-images')
                .upload(fileName, imageFile)

            if (uploadError) {
                setStatus('error')
                setLoading(false)
                return
            }

            const { data } = supabase.storage
                .from('menu-images')
                .getPublicUrl(fileName)

            uploadedImageUrl = data.publicUrl
        }

        const { error } = await supabase
            .from('menu_items')
            .insert({
                name,
                description,
                price,
                category,
                image_url: uploadedImageUrl
            })

        if (error) {
            setStatus("error")
        } else {
            setStatus('success')
            setName(''); setDescription(''); setPrice(1); setCategory(''); setImageFile(null)
            fetchData()
        }
        setLoading(false)
    }

    if (!authChecked) return <p className="p-8 text-center">Checking authentication...</p>

    return (
        <div className="max-w-7xl mx-auto p-6 md:p-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Admin Dashboard</h1>
                <button
                    onClick={async () => {
                        await supabase.auth.signOut()
                        router.push('/admin')
                    }}
                    className="px-6 py-2.5 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                >
                    Logout
                </button>
            </div>
            
            <div className="mt-8 p-6 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-bold mb-6">Recent Reservations</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-base">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-900">
                                <th className="border border-gray-200 dark:border-gray-800 p-4 text-left">Customer</th>
                                <th className="border border-gray-200 dark:border-gray-800 p-4 text-left">Phone</th>
                                <th className="border border-gray-200 dark:border-gray-800 p-4 text-left">Date</th>
                                <th className="border border-gray-200 dark:border-gray-800 p-4 text-left">Time</th>
                                <th className="border border-gray-200 dark:border-gray-800 p-4 text-left">Guests</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservationList.map((res) => (
                                <tr key={res.id}>
                                    <td className="border border-gray-200 dark:border-gray-800 p-4">{res.name}</td>
                                    <td className="border border-gray-200 dark:border-gray-800 p-4">{res.phone}</td>
                                    <td className="border border-gray-200 dark:border-gray-800 p-4">{new Date(res.date).toLocaleDateString()}</td>
                                    <td className="border border-gray-200 dark:border-gray-800 p-4">{res.time}</td>
                                    <td className="border border-gray-200 dark:border-gray-800 p-4">{res.guests}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-10 p-6 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm">
                <h2 className="text-2xl font-bold mb-6">Menu Management</h2>
                <form onSubmit={handleMenuSubmit} className="p-6 border border-gray-200 dark:border-gray-800 rounded-2xl w-full lg:w-1/2">
                    <input type="text" placeholder="Dish Name" value={name} onChange={(e) => setName(e.target.value)} className="p-3 text-sm border border-gray-300 rounded-lg mb-4 w-full dark:bg-gray-900" />
                    <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="p-3 text-sm border border-gray-300 rounded-lg mb-4 w-full dark:bg-gray-900" />
                    <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="p-3 text-sm border border-gray-300 rounded-lg mb-4 w-full dark:bg-gray-900" />
                    <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} className="p-3 text-sm border border-gray-300 rounded-lg mb-4 w-full dark:bg-gray-900" />
                    <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="p-2 text-sm border border-gray-300 rounded-lg mb-4 w-full" />

                    <button className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors w-full" disabled={loading}>
                        {loading ? 'Adding...' : 'Add Menu Item'}
                    </button>
                    {status === 'success' && <p className="text-sm text-green-600 mt-3">Menu Added Successfully!</p>}
                    {status === 'error' && <p className='text-sm text-red-600 mt-3'>Failed to add menu</p>}
                </form>

                <div className="mt-10">
                    <h3 className="text-xl font-bold mb-4">Existing Menu Items</h3>
                    <table className="w-full border-collapse text-base">
                        <thead>
                            <tr className="bg-gray-50 dark:bg-gray-900">
                                <th className="border border-gray-200 dark:border-gray-800 p-4 text-left">Dish Name</th>
                                <th className="border border-gray-200 dark:border-gray-800 p-4 text-left">Price</th>
                                <th className="border border-gray-200 dark:border-gray-800 p-4 text-left">Category</th>
                            </tr>
                        </thead>
                        <tbody>
                            {menu.map((item) => (
                                <tr key={item.id}>
                                    <td className="border border-gray-200 dark:border-gray-800 p-4">{item.name}</td>
                                    <td className="border border-gray-200 dark:border-gray-800 p-4">{item.price}</td>
                                    <td className="border border-gray-200 dark:border-gray-800 p-4">{item.category}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Page
'use client'

import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabaseClient"
import { useEffect, useState } from "react"


const Reservation = () => {

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [guests, setGuests] = useState(1)
    const [requests, setRequests] = useState('')
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        
        const { error } = await supabase
         .from('reservations')
         .insert({
            name,
            phone,
            date,
            time,
            guests: Number(guests),
            message: requests
         })

         if (error) {
            setStatus('error')
         } else {
            setStatus('success')
            setName('')
            setPhone('')
            setDate('')
            setTime('')
            setGuests(1)
            setRequests('')
         }
    }

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm">
      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Make a Reservation</h2>
      
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Helper function to style inputs */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
          <input type="text"
           id="name"
           name="name"
           value={name}
           onChange={(e) => setName(e.target.value)}
           required
           className="p-2.5 border rounded-lg border-gray-300 dark:border-gray-700 bg-transparent"
            />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
          <input type="tel" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required className="p-2.5 border rounded-lg border-gray-300 dark:border-gray-700 bg-transparent" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="date" className="text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
            <input type="date" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} required className="p-2.5 border rounded-lg border-gray-300 dark:border-gray-700 bg-transparent" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="time" className="text-sm font-medium text-gray-700 dark:text-gray-300">Time</label>
            <input type="time" id="time" name="time" value={time} onChange={(e) => setTime(e.target.value)} required className="p-2.5 border rounded-lg border-gray-300 dark:border-gray-700 bg-transparent" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="guests" className="text-sm font-medium text-gray-700 dark:text-gray-300">Number of Guests</label>
          <input type="number" id="guests" name="guests" value={guests} onChange={(e) => setGuests(Number(e.target.value))} min="1" required className="p-2.5 border rounded-lg border-gray-300 dark:border-gray-700 bg-transparent" />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="requests" className="text-sm font-medium text-gray-700 dark:text-gray-300">Special Requests</label>
          <textarea id="requests" name="requests" value={requests} onChange={(e) => setRequests(e.target.value)} rows={4} className="p-2.5 border rounded-lg border-gray-300 dark:border-gray-700 bg-transparent"></textarea>
        </div>

        <Button type="submit" className="w-full mt-2 rounded-lg"
         disabled={loading}
        >
            {loading ? 'submitting...' : 'Submit Reservation'}
        </Button>

        {status === 'success' && <p className="text-green-600 mt-2">Reservation successful!</p>}
        {status === 'error' && <p className="text-red-600 mt-2">Failed to submit reservation. Please try again.</p>}
      </form>
    </div>
  )
}

export default Reservation
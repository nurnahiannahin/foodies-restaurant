'use client'

import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabaseClient"
import { useState } from "react"

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
             setLoading(false)
           } else {
             setStatus('success')
             setLoading(false)
             setName(''); setPhone(''); setDate(''); setTime(''); setGuests(1); setRequests('')
           }
    }

  return (
    <div className="w-full py-16 px-6 bg-white dark:bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Side: Branding */}
        <div className="flex flex-col gap-6 pt-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
            Book your <span className="text-teal-600">table.</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-md">
            Experience authentic flavors in the heart of Cox's Bazar. Reserve your spot today.
          </p>
          
          <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Need help?</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">+880 123 456 789</p>
          </div>
        </div>

        {/* Right Side: Form - Standard Input Sizing */}
        <div className="bg-white dark:bg-black p-8 md:p-10 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Full Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="p-3 text-base border rounded-xl border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-teal-500 outline-none transition-all" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Phone</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required className="p-3 text-base border rounded-xl border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-teal-500 outline-none transition-all" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Date</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="p-3 text-base border rounded-xl border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-teal-500 outline-none transition-all" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Time</label>
                <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required className="p-3 text-base border rounded-xl border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-teal-500 outline-none transition-all" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Guests</label>
              <input type="number" value={guests} onChange={(e) => setGuests(Number(e.target.value))} min="1" required className="p-3 text-base border rounded-xl border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-teal-500 outline-none transition-all" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Requests</label>
              <textarea value={requests} onChange={(e) => setRequests(e.target.value)} rows={2} className="p-3 text-base border rounded-xl border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-teal-500 outline-none transition-all"></textarea>
            </div>

            <Button type="submit" className="w-full mt-2 h-12 rounded-xl text-base font-bold bg-teal-600 hover:bg-teal-700" disabled={loading}>
              {loading ? 'Submitting...' : 'Confirm Reservation'}
            </Button>

            {status === 'success' && <p className="text-sm text-teal-600 text-center font-bold">Reservation confirmed!</p>}
          </form>
        </div>
      </div>
    </div>
  )
}

export default Reservation
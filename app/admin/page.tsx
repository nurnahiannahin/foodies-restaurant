'use client'

import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const page = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // Handle login logic here

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
            alert('Login failed: ' + error.message)
        } else {
            router.push('admin/dashboard')
        }
    }

  return (
    <div className="max-w-xs mx-auto mt-10 mb-10 p-6 border rounded-lg shadow-sm bg-gray-50">
        <form onSubmit={handleSubmit} action="" className="flex flex-col gap-4">
            <input 
            type="email" 
            name="email" 
            id="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="p-2 border border-gray-300 rounded"
            />
            <input 
            type="password" 
            name="password" 
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="p-2 border border-gray-300 rounded"
            />
            <button 
            type="submit" 
            className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
            Login
            </button>
        </form>
    </div>
  )
}

export default page

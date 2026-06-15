'use client'

import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Page = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) {
           alert('Login failed: ' + error.message)
        } else {
            router.push('/admin/dashboard')
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0a] px-6">
        {/* Standard container width for login forms */}
        <div className="w-full max-w-md bg-white dark:bg-black p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
            
            <div className="mb-8 text-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome back</h1>
                <p className="text-sm text-gray-500">Sign in to your admin dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Email Address</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@foodies.com"
                        className="p-3 border border-gray-300 dark:border-gray-800 rounded-xl bg-transparent text-base text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                        required
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Password</label>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="p-3 border border-gray-300 dark:border-gray-800 rounded-xl bg-transparent text-base text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none transition-all"
                        required
                    />
                </div>

                <button 
                    type="submit" 
                    className="w-full py-3 mt-2 bg-teal-600 text-white text-base font-semibold rounded-xl hover:bg-teal-700 transition-colors"
                >
                    Sign In
                </button>
            </form>
            
            <p className="mt-8 text-center text-xs text-gray-400">
                © {new Date().getFullYear()} Foodies Admin
            </p>
        </div>
    </div>
  )
}

export default Page
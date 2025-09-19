"use client"

import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { LoginForm } from './_Component/LoginForm/LoginForm'

export default function Login() {
  const searchParams = useSearchParams()
  const message = searchParams.get('message')

  useEffect(() => {
    if (message === 'password-changed') {
      toast.success('Password changed successfully! Please login with your new password.')
    }
  }, [message])

  return (
    <main className='min-h-screen flex items-center justify-center'>
      <div className='w-full max-w-md'>
        <h2 className='text-2xl font-bold'>Login</h2>
        <LoginForm />
      </div>
    </main>
  )
}

'use server'

import { RegisterResponse, FailedRegisterResponse } from '@/interfaces/register'

export type RegisterPayload = {
    name: string
    email: string
    phone: string
    password: string
    rePassword: string
}

export async function registerAction(payload: RegisterPayload) {
    try {
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            cache: 'no-store',
        })

        let data: RegisterResponse | FailedRegisterResponse | null = null
        try {
            data = (await response.json()) as RegisterResponse
        } catch {
            data = null
        }

        if (response.ok && data && (data as RegisterResponse)?.message === 'success') {
            return { success: true as const, message: 'Account created successfully!' }
        }

        const errorMessage = (data as FailedRegisterResponse)?.message || (data as FailedRegisterResponse)?.errors?.[0]?.msg || 'Registration failed'
        return { success: false as const, error: errorMessage }
    } catch {
        return { success: false as const, error: 'Something went wrong' }
    }
}



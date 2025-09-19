'use server'

import { ForgotPasswordRequest, ForgotPasswordResponse, ResetPasswordRequest, ResetPasswordResponse } from '@/interfaces/profile'

export async function forgotPasswordAction(email: string) {
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        })

        const data: ForgotPasswordResponse = await response.json()

        if (!response.ok) {
            return {
                success: false as const,
                error: data?.message || 'Failed to send reset code'
            }
        }

        return {
            success: true as const,
            data: data,
        }
    } catch {
        return {
            success: false as const,
            error: 'Something went wrong'
        }
    }
}

export async function resetPasswordAction(email: string, newPassword: string) {
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, newPassword }),
        })

        const data: ResetPasswordResponse = await response.json()

        if (!response.ok) {
            return {
                success: false as const,
                error: data?.message || 'Failed to reset password'
            }
        }

        return {
            success: true as const,
            data: data,
        }
    } catch {
        return {
            success: false as const,
            error: 'Something went wrong'
        }
    }
}

export async function verifyResetCodeAction(resetCode: string) {
    try {
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ resetCode }),
        })

        const data = await response.json()

        if (!response.ok) {
            return {
                success: false as const,
                error: data?.message || 'Invalid or expired code'
            }
        }

        return {
            success: true as const,
            data,
        }
    } catch {
        return {
            success: false as const,
            error: 'Something went wrong'
        }
    }
}

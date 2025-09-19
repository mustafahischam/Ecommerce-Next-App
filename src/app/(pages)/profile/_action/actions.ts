'use server'

import { getUserToken } from '@/Helpers/getUserToken'
import { UpdateProfileRequest, UpdateProfileResponse, ChangePasswordRequest, ChangePasswordResponse } from '@/interfaces/profile'

export async function getUserProfileAction() {
    try {
        const token = await getUserToken()
        if (!token) {
            return { success: false as const, error: 'Unauthorized' }
        }

        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/users/getMe`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                token,
            },
            cache: 'no-store',
        })

        const data = await response.json()

        if (!response.ok) {
            return {
                success: false as const,
                error: data?.message || 'Failed to fetch profile'
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

export async function updateProfileAction(profileData: UpdateProfileRequest) {
    try {
        const token = await getUserToken()
        if (!token) {
            return { success: false as const, error: 'Unauthorized' }
        }

        // Filter out empty/undefined values and don't send email if it's the same
        const filteredData = Object.fromEntries(
            Object.entries(profileData).filter(([key, value]) =>
                value !== undefined && value !== null && value !== ''
            )
        )

        console.log('Updating profile with data:', filteredData)
        console.log('Using token:', token.substring(0, 20) + '...')

        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/users/updateMe`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                token,
            },
            body: JSON.stringify(filteredData),
        })

        const data: UpdateProfileResponse = await response.json()

        console.log('API Response status:', response.status)
        console.log('API Response data:', data)

        if (!response.ok) {
            return {
                success: false as const,
                error: data?.message || `Failed to update profile (Status: ${response.status})`
            }
        }

        return {
            success: true as const,
            data: data,
        }
    } catch (error) {
        console.error('Profile update error:', error)
        return {
            success: false as const,
            error: 'Something went wrong'
        }
    }
}

export async function changePasswordAction(passwordData: ChangePasswordRequest) {
    try {
        const token = await getUserToken()
        if (!token) {
            return { success: false as const, error: 'Unauthorized' }
        }

        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                token,
            },
            body: JSON.stringify(passwordData),
        })

        const data: ChangePasswordResponse = await response.json()

        if (!response.ok) {
            return {
                success: false as const,
                error: data?.message || 'Failed to change password'
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



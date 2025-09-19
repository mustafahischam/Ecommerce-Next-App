'use server'

import { getUserToken } from '@/Helpers/getUserToken'
import { AddressesResponse, Address } from '@/interfaces/address'

export async function listAddressesAction() {
    try {
        const token = await getUserToken()
        if (!token) return { success: false as const, error: 'Unauthorized' }

        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses`, {
            headers: { token, 'Content-Type': 'application/json' },
            cache: 'no-store',
        })
        const data: AddressesResponse = await res.json()
        if (!res.ok) return { success: false as const, error: (data as AddressesResponse)?.message || 'Failed to load addresses' }
        return { success: true as const, data }
    } catch {
        return { success: false as const, error: 'Failed to load addresses' }
    }
}

export async function addAddressAction(payload: Omit<Address, '_id'>) {
    try {
        const token = await getUserToken()
        if (!token) return { success: false as const, error: 'Unauthorized' }

        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses`, {
            method: 'POST',
            headers: { token, 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
        const data = await res.json()
        if (!res.ok) return { success: false as const, error: data?.message || 'Failed to add address' }
        return { success: true as const }
    } catch {
        return { success: false as const, error: 'Failed to add address' }
    }
}

export async function removeAddressAction(addressId: string) {
    try {
        const token = await getUserToken()
        if (!token) return { success: false as const, error: 'Unauthorized' }

        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`, {
            method: 'DELETE',
            headers: { token },
        })
        const data = await res.json()
        if (!res.ok) return { success: false as const, error: data?.message || 'Failed to remove address' }
        return { success: true as const }
    } catch {
        return { success: false as const, error: 'Failed to remove address' }
    }
}

export async function updateAddressAction(addressId: string, payload: Omit<Address, '_id'>) {
    try {
        const token = await getUserToken()
        if (!token) return { success: false as const, error: 'Unauthorized' }

        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses/${addressId}`, {
            method: 'PUT',
            headers: { token, 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        })
        const data = await res.json()
        if (!res.ok) return { success: false as const, error: data?.message || 'Failed to update address' }
        return { success: true as const }
    } catch {
        return { success: false as const, error: 'Failed to update address' }
    }
}



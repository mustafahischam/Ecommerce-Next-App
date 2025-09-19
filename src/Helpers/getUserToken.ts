import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'

export async function getUserToken() {
    try {
        const session = await getServerSession(authOptions)
        return session?.token || null
    } catch (error) {
        console.error('Error getting user token:', error)
        return null
    }
}
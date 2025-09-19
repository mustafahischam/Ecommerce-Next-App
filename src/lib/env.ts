// Environment configuration for server actions
export const getNextAuthSecret = () => {
    return process.env.NEXTAUTH_SECRET || 'a41OEnUZlJJXtYvEOl54WvObalq19Cpxvs/FOZqBooQ='
}

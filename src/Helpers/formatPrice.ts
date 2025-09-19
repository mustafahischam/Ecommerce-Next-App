

export default function formatCurrency(num: number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EGP',
    }).format(num)
}
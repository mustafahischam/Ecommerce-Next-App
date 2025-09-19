"use client"

import { useEffect, useState } from 'react'
import type { Address } from '@/interfaces'
import { listAddressesAction, addAddressAction, removeAddressAction, updateAddressAction } from './_action/actions'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2Icon, TrashIcon, PlusIcon } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function Addresses() {
    const [addresses, setAddresses] = useState<Address[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [submitting, setSubmitting] = useState<boolean>(false)

    const [city, setCity] = useState('')
    const [phone, setPhone] = useState('')
    const [details, setDetails] = useState('')
    const [alias, setAlias] = useState('')

    // Inline edit state
    const [editingId, setEditingId] = useState<string | null>(null)
    const [editAlias, setEditAlias] = useState('')
    const [editCity, setEditCity] = useState('')
    const [editPhone, setEditPhone] = useState('')
    const [editDetails, setEditDetails] = useState('')

    async function refresh() {
        setLoading(true)
        const res = await listAddressesAction()
        if (res.success) {
            setAddresses(res.data.data || [])
        } else {
            toast.error(res.error || 'Unable to load addresses')
        }
        setLoading(false)
    }

    async function onAddAddress(e: React.FormEvent) {
        e.preventDefault()
        setSubmitting(true)
        const payload = { city, phone, details, alias }
        const res = await addAddressAction(payload)
        if (res.success) {
            toast.success('Address added')
            setCity(''); setPhone(''); setDetails(''); setAlias('')
            refresh()
        } else {
            toast.error(res.error || 'Failed to add address')
        }
        setSubmitting(false)
    }

    async function onRemove(id: string) {
        const res = await removeAddressAction(id)
        if (res.success) {
            toast.success('Address removed')
            setAddresses(currentAddresses => currentAddresses.filter(address => address._id !== id))
        } else {
            toast.error(res.error || 'Failed to remove')
        }
    }

    function startEdit(addr: Address) {
        setEditingId(addr._id)
        setEditAlias(addr.alias || '')
        setEditCity(addr.city)
        setEditPhone(addr.phone)
        setEditDetails(addr.details)
    }

    async function saveEdit() {
        if (!editingId) return
        const res = await updateAddressAction(editingId, { alias: editAlias, city: editCity, phone: editPhone, details: editDetails })
        if (res.success) {
            toast.success('Address updated')
            setAddresses(currentAddresses => currentAddresses.map(address => (
                address._id === editingId
                    ? { ...address, alias: editAlias, city: editCity, phone: editPhone, details: editDetails }
                    : address
            )))
            setEditingId(null)
        } else {
            toast.error(res.error || 'Failed to update')
        }
    }

    useEffect(() => { refresh() }, [])

    return (
        <div className="container mx-auto py-6 px-4">
            <h1 className="text-3xl font-bold mb-6">My Addresses</h1>

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-4">
                    {loading ? (
                        <div className="flex items-center gap-2 text-muted-foreground"><Loader2Icon className="size-4 animate-spin" /> Loading...</div>
                    ) : addresses.length === 0 ? (
                        <Card className="p-6 text-muted-foreground">No addresses yet. Add one on the right.</Card>
                    ) : (
                        addresses.map(addr => (
                            <Card key={addr._id} className="p-4">
                                {editingId === addr._id ? (
                                    <div className="grid gap-3 md:grid-cols-2">
                                        <div className="grid gap-2">
                                            <Label>Address name</Label>
                                            <Input value={editAlias} onChange={(e) => setEditAlias(e.target.value)} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label>City</Label>
                                            <Input value={editCity} onChange={(e) => setEditCity(e.target.value)} />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label>Phone</Label>
                                            <Input value={editPhone} onChange={(e) => setEditPhone(e.target.value)} />
                                        </div>
                                        <div className="grid gap-2 md:col-span-2">
                                            <Label>Details</Label>
                                            <Input value={editDetails} onChange={(e) => setEditDetails(e.target.value)} />
                                        </div>
                                        <div className="flex gap-2 md:col-span-2">
                                            <Button className="" onClick={saveEdit} type="button">Save</Button>
                                            <Button variant="outline" type="button" onClick={() => setEditingId(null)}>Cancel</Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="font-semibold">{addr.alias || 'Address name'}</p>
                                            <p className="text-sm text-muted-foreground">{addr.details}</p>
                                            <p className="text-sm text-muted-foreground">{addr.city} • {addr.phone}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button variant="outline" onClick={() => startEdit(addr)}>Edit</Button>
                                            <Button variant="outline" size="icon" onClick={() => onRemove(addr._id)}>
                                                <TrashIcon className="size-4" />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </Card>
                        ))
                    )}
                </div>

                <Card className="p-6 h-fit">
                    <h2 className="text-xl font-bold mb-4">Add New Address</h2>
                    <form onSubmit={onAddAddress} className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="alias">Address name (optional)</Label>
                            <Input id="alias" value={alias} onChange={(e) => setAlias(e.target.value)} placeholder="Home, Office..." />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="details">Details</Label>
                            <Input id="details" value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Street, building, floor..." />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="city">City</Label>
                            <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Cairo" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="01xxxxxxxxx" />
                        </div>
                        <Button disabled={submitting} className="w-full">
                            {submitting ? (<><Loader2Icon className="size-4 mr-2 animate-spin" />Saving...</>) : (<><PlusIcon className="size-4 mr-2" />Save Address</>)}
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    )
}







import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { CheckoutResponse } from '@/interfaces/cart'
import { listAddressesAction } from '@/app/(pages)/addresses/_action/actions'
import { createCashOrderAction, createCheckoutSessionAction } from './_action/actions'
import { toast } from 'react-hot-toast'
import { Address } from '@/interfaces/address'
export default function CheckOut({ cartId }: { cartId: string }) {

    const detailsInput = useRef<HTMLInputElement>(null)
    const cityInput = useRef<HTMLInputElement>(null)
    const phoneInput = useRef<HTMLInputElement>(null)
    const [addresses, setAddresses] = useState<{ _id: string, details: string, city: string, phone: string }[]>([])
    const [selectedAddressId, setSelectedAddressId] = useState<string>('')

    useEffect(() => {
        (async () => {
            const res = await listAddressesAction()
            if (res.success) {
                const list = res.data.data?.map((a: Address) => ({ _id: a._id, details: a.details, city: a.city, phone: a.phone })) || []
                setAddresses(list)
            }
        })()
    }, [])

    async function handleCardCheckout() {
        const shippingAddress = selectedAddressId
            ? addresses.find(a => a._id === selectedAddressId)
            : {
                details: detailsInput.current?.value,
                city: cityInput.current?.value,
                phone: phoneInput.current?.value,
            }

        const result = await createCheckoutSessionAction(cartId, shippingAddress as Address)
        if (result.success) {
            location.href = result.data.session.url
        } else {
            toast.error(result.error || 'Failed to checkout')
        }
    }

    async function handleCashOrder() {
        const shippingAddress = selectedAddressId
            ? addresses.find(a => a._id === selectedAddressId)
            : {
                details: detailsInput.current?.value,
                city: cityInput.current?.value,
                phone: phoneInput.current?.value,
            }

        const result = await createCashOrderAction(cartId, shippingAddress as Address)
        if (result.success) {
            toast.success('Order placed successfully!')
            location.href = '/allorders'
        } else {
            toast.error(result.error || 'Failed to place order')
        }
    }

    return <>

        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button className='w-full h-11 text-base font-semibold' >
                        Proceed to Checkout
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Choose or add shipping address</DialogTitle>
                        <DialogDescription>Select a saved address or enter a new one.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        {addresses.length > 0 && (
                            <div className="grid gap-2">
                                <label className='text-sm font-medium'>Saved addresses</label>
                                <select
                                    className='h-10 border rounded px-3'
                                    value={selectedAddressId}
                                    onChange={(e) => setSelectedAddressId(e.target.value)}
                                >
                                    <option value="">— Use a new address —</option>
                                    {addresses.map(a => (
                                        <option key={a._id} value={a._id}>{`${a.city} • ${a.phone} • ${a.details}`}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        {selectedAddressId === '' && (
                            <div className="grid gap-3">
                                <Label htmlFor="city">City</Label>
                                <Input ref={cityInput} id="city" name="city" />
                            </div>
                        )}
                        {selectedAddressId === '' && (
                            <div className="grid gap-3">
                                <Label htmlFor="phone">Phone</Label>
                                <Input ref={phoneInput} id="phone" name="phone" />
                            </div>
                        )}
                        {selectedAddressId === '' && (
                            <div className="grid gap-3">
                                <Label htmlFor="details">Details</Label>
                                <Input ref={detailsInput} id="details" name="details" />
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button className='cursor-pointer' onClick={handleCashOrder} type="button">Cash on Delivery</Button>
                        <Button className='cursor-pointer' onClick={handleCardCheckout} type="button">Checkout with Card</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    </>
}

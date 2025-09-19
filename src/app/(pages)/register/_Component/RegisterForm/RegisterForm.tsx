"use client"

import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { schema } from '@/Schema/registerSchema'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Loader2Icon, User2Icon, Mail, Phone, Lock } from 'lucide-react'
import { toast } from 'react-hot-toast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { registerAction } from '@/app/(pages)/register/_action/actions'
import { signIn } from 'next-auth/react'

type RegisterFields = {
    name: string
    email: string
    phone: string
    password: string
    rePassword: string
}

export default function RegisterForm() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()

    const form = useForm<RegisterFields>({
        resolver: zodResolver(schema),
        mode: 'onChange',
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            password: '',
            rePassword: '',
        },
    })

    async function onSubmit(values: RegisterFields) {
        setIsLoading(true)
        try {
            const result = await registerAction(values)
            if (result.success) {
                toast.success(result.message)
                // Auto login after successful signup
                const signInResult = await signIn('credentials', {
                    redirect: true,
                    callbackUrl: '/',
                    email: values.email,
                    password: values.password,
                })
                // If for some reason sign-in doesn't redirect, keep a fallback
                if (!signInResult) {
                    router.push('/')
                }
                form.reset()
            } else {
                toast.error(result.error)
            }
        } catch {
            toast.error('Something went wrong. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="max-w-md mx-auto  shadow-2xl border-0 bg-white">
            <div className="p-10">
                <h2 className="text-3xl font-extrabold mb-2 text-center text-primary tracking-tight drop-shadow">
                    Create your account
                </h2>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
                        {/* Basic info */}
                        <div className="grid gap-2 ">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base font-semibold text-gray-700">Full name</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <User2Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                                <Input className="pl-9 h-11 rounded-lg" placeholder="John Doe" autoComplete="name" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base font-semibold text-gray-700">Email</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                                <Input className="pl-9 h-11 rounded-lg" placeholder="example@example.com" type="email" autoComplete="email" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base font-semibold text-gray-700">Phone</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                            <Input className="pl-9 h-11 rounded-lg" placeholder="01xxxxxxxxx" type="tel" autoComplete="tel" {...field} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        {/* Passwords */}
                        <div className="grid gap-2 ">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base font-semibold text-gray-700">Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                                <Input className="pl-9 h-11 rounded-lg" placeholder="Enter your password" type="password" autoComplete="new-password" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="rePassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-base font-semibold text-gray-700">Confirm password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                                                <Input className="pl-9 h-11 rounded-lg" placeholder="Re-enter your password" type="password" autoComplete="new-password" {...field} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>



                        <Button disabled={isLoading || !form.formState.isValid}
                            type="submit"
                            className="w-full font-semibold py-3 rounded-lg bg-primary hover:bg-primary/90 transition text-lg shadow">
                            {isLoading && <Loader2Icon className="animate-spin mr-2 inline" />}
                            Create Account
                        </Button>

                        <div className="text-center text-sm text-muted-foreground mt-2">
                            Already have an account?{' '}
                            <Link href="/login" className="text-primary underline font-medium hover:text-primary/80 transition">
                                Sign in
                            </Link>
                        </div>
                    </form>
                </Form>
            </div>
        </Card>
    )
}

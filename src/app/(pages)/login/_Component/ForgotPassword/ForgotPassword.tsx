"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Loader2Icon, MailIcon, KeyIcon } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { forgotPasswordAction, resetPasswordAction, verifyResetCodeAction } from '../../_action/forgotPasswordActions'
import { z } from 'zod'
import { passwordSchema } from '@/Schema/registerSchema'

export default function ForgotPassword() {
    const [isOpen, setIsOpen] = useState(false)
    const [step, setStep] = useState<'email' | 'code' | 'reset'>('email')
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [codeError, setCodeError] = useState<string>('')
    const [passwordError, setPasswordError] = useState<string>('')

    const meetsLength = newPassword.length >= 8 && newPassword.length <= 50
    const hasUpper = /[A-Z]/.test(newPassword)
    const hasLower = /[a-z]/.test(newPassword)
    const hasNumber = /[0-9]/.test(newPassword)
    const hasSpecial = /[^A-Za-z0-9]/.test(newPassword)

    const handleSendResetCode = async (e: React.FormEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (!email) {
            toast.error('Please enter your email')
            return
        }

        setLoading(true)
        const result = await forgotPasswordAction(email)
        if (result.success) {
            toast.success('Reset code sent to your email!')
            setStep('code')
        } else {
            toast.error(result.error || 'Failed to send reset code')
        }
        setLoading(false)
    }

    const handleVerifyCode = async (e: React.FormEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (!code) {
            setCodeError('Please enter the verification code')
            return
        }
        setLoading(true)
        const result = await verifyResetCodeAction(code)
        if (result.success) {
            toast.success('Code verified. Enter your new password.')
            setStep('reset')
        } else {
            setCodeError(result.error || 'Invalid code')
        }
        setLoading(false)
    }

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (!newPassword || !confirmPassword) {
            setPasswordError('Please fill in all fields')
            return
        }
        if (newPassword !== confirmPassword) {
            setPasswordError('Passwords do not match')
            return
        }
        const parsed = passwordSchema.safeParse(newPassword)
        if (!parsed.success) {
            setPasswordError('Password does not meet requirements')
            return
        }

        setLoading(true)
        const result = await resetPasswordAction(email, newPassword)
        if (result.success) {
            toast.success('Password reset successfully! You can now login with your new password.')
            handleClose()
        } else {
            setPasswordError(result.error || 'Failed to reset password')
        }
        setLoading(false)
    }

    const handleClose = () => {
        setIsOpen(false)
        setStep('email')
        setEmail('')
        setNewPassword('')
        setConfirmPassword('')
        setCode('')
        setCodeError('')
        setPasswordError('')
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="link" className="p-0 h-auto text-sm text-primary hover:underline">
                    Forgot your password?
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                {step === 'email' ? (
                    <>
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <MailIcon className="size-5" />
                                Forgot Password
                            </DialogTitle>
                            <DialogDescription>
                                Enter your email address and we will send you a reset code.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSendResetCode}>
                            <div className="grid gap-4 py-4">
                                <div>
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Loader2Icon className="size-4 mr-2 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        'Send Reset Code'
                                    )}
                                </Button>
                            </DialogFooter>
                        </form>
                    </>
                ) : step === 'code' ? (
                    <>
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <KeyIcon className="size-5" />
                                Enter Verification Code
                            </DialogTitle>
                            <DialogDescription>
                                We sent a 6-digit code to your email. Enter it below.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleVerifyCode}>
                            <div className="grid gap-4 py-4">
                                <div>
                                    <Label className='pb-2' htmlFor="code">Verification Code</Label>
                                    <Input
                                        id="code"
                                        value={code}
                                        onChange={(e) => { setCode(e.target.value); if (codeError) setCodeError('') }}
                                        placeholder="e.g. 123456"
                                        required
                                    />
                                    {codeError && (
                                        <p className="text-sm text-red-600 mt-1">{codeError}</p>
                                    )}
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setStep('email')}>
                                    Back
                                </Button>
                                <Button type="submit" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Loader2Icon className="size-4 mr-2 animate-spin" />
                                            Verifying...
                                        </>
                                    ) : (
                                        'Verify Code'
                                    )}
                                </Button>
                            </DialogFooter>
                        </form>
                    </>
                ) : (
                    <>
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <KeyIcon className="size-5" />
                                Reset Password
                            </DialogTitle>
                            <DialogDescription>
                                Check your email for the reset code, then enter your new password below.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleResetPassword}>
                            <div className="grid gap-4 py-4">
                                <div>
                                    <Label htmlFor="email-display">Email</Label>
                                    <Input
                                        id="email-display"
                                        value={email}
                                        disabled
                                        className="bg-muted"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="new-password">New Password</Label>
                                    <Input
                                        id="new-password"
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => { setNewPassword(e.target.value); if (passwordError) setPasswordError('') }}
                                        placeholder="Enter new password"
                                        required
                                    />
                                    <div className="mt-2 text-xs text-muted-foreground space-y-1">
                                        <p className={`${meetsLength ? 'text-green-600' : ''}`}>• 8-50 characters</p>
                                        <p className={`${hasUpper ? 'text-green-600' : ''}`}>• At least one uppercase letter</p>
                                        <p className={`${hasLower ? 'text-green-600' : ''}`}>• At least one lowercase letter</p>
                                        <p className={`${hasNumber ? 'text-green-600' : ''}`}>• At least one number</p>
                                        <p className={`${hasSpecial ? 'text-green-600' : ''}`}>• At least one special character</p>
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                                    <Input
                                        id="confirm-password"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => { setConfirmPassword(e.target.value); if (passwordError) setPasswordError('') }}
                                        placeholder="Confirm new password"
                                        required
                                    />
                                    {passwordError && (
                                        <p className="text-sm text-red-600 mt-1">{passwordError}</p>
                                    )}
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setStep('email')}>
                                    Back
                                </Button>
                                <Button type="submit" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Loader2Icon className="size-4 mr-2 animate-spin" />
                                            Resetting...
                                        </>
                                    ) : (
                                        'Reset Password'
                                    )}
                                </Button>
                            </DialogFooter>
                        </form>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}

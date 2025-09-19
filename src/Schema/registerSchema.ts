import { z } from 'zod'

export const passwordSchema = z.string().nonempty('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .max(50, 'Password must be less than 50 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')

export const schema = z.object({
    name: z.string().nonempty('Name is required')
        .min(2, 'Name must be at least 2 characters long')
        .max(50, 'Name must be less than 50 characters long')
        .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),

    email: z.string().nonempty('Email is required')
        .email('Please enter a valid email address')
        .max(100, 'Email must be less than 100 characters'),

    password: passwordSchema,

    phone: z.string()
        .nonempty('Phone number is required')
        .regex(/^01[0125][0-9]{8}$/, 'Please enter a valid Egyptian phone number'),

    rePassword: z.string().nonempty('Please confirm your password'),
}).refine((data) => data.password === data.rePassword, {
    path: ['rePassword'],
    message: 'Passwords must match',
})



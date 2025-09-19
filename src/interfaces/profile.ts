export interface UserProfile extends UserResponse {
    _id?: string
    phone?: string
    profileImage?: string
    dateOfBirth?: string
    gender?: string
    address?: string
    city?: string
    country?: string
    createdAt?: string
    updatedAt?: string
}

export interface UpdateProfileRequest {
    name?: string
    email?: string
    phone?: string
    dateOfBirth?: string
    gender?: string
    address?: string
    city?: string
    country?: string
}

export interface UpdateProfileResponse {
    status?: string
    message?: string
    user?: UserProfile
}

export interface ChangePasswordRequest {
    currentPassword: string
    password: string
    rePassword: string
}

export interface ChangePasswordResponse {
    status?: string
    message?: string
    token?: string
}

export interface ForgotPasswordRequest {
    email: string
}

export interface ForgotPasswordResponse {
    status?: string
    message?: string
}

export interface ResetPasswordRequest {
    email: string
    newPassword: string
}

export interface ResetPasswordResponse {
    status?: string
    message?: string
    token?: string
}

import { UserResponse } from "./login"

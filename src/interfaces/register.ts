export interface RegisterUser {
    name: string
    email: string
    role?: string
    phone?: string
    _id?: string
}

export interface RegisterResponse {
    message: 'success'
    user?: RegisterUser
}

export interface ValidationErrorItem {
    msg: string
    path?: string
    value?: unknown
    location?: string
}

export interface FailedRegisterResponse {
    message?: string
    errors?: ValidationErrorItem[]
}



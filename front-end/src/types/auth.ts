export interface TLoginInput {
    email: string
    password: string
}

export interface TSignupInput {
    fullName: string
    email: string
    phone: string
    password: string
    age: number
}

export interface ILoginResponse {
    accessToken: string
    refreshToken: string
}

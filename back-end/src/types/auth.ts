import { z } from 'zod'
import { loginSchema, signupSchema } from '../utils/validations/auth.schemas'

export type TLoginPayload = z.infer<typeof loginSchema>

export interface ILoginResponse {
	token: string
}

export type TSignupPayload = z.infer<typeof signupSchema>

export interface ISignupResponse extends Omit<TSignupPayload, 'password'> {
	id: string
}

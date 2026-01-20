import { z } from 'zod'
import { loginSchema, signupSchema } from '../utils/validations/auth.schemas'

export type TLoginInput = z.infer<typeof loginSchema>

export interface ILoginResponse {
	token: string
}

export type TSignupInput = z.infer<typeof signupSchema>

export interface ISignupResponse extends Omit<TSignupInput, 'password'> {
	id: string
}

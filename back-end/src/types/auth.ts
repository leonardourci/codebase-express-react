import { z } from 'zod'
import { loginSchema, signupSchema } from '../utils/validations/auth.schemas'

export type TLoginInput = z.infer<typeof loginSchema>

export interface ILoginResponse {
	accessToken: string
	refreshToken: string
}

export type TSignupInput = z.infer<typeof signupSchema>

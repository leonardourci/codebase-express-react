import { z } from 'zod'
import { validateTokenSchema } from '../utils/validations/jwt.schemas'

export interface IToken {
    userId: string
}

export type TValidateTokenPayload = z.infer<typeof validateTokenSchema>
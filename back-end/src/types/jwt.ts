import { z } from 'zod'
import { validateTokenSchema } from '../utils/validations/jwt.schemas'

export enum ETokenPurpose {
    EMAIL_VERIFICATION = 'email-verification',
    PASSWORD_RESET = 'password-reset'
}

export interface IToken {
    userId: string
    purpose?: ETokenPurpose
    iat?: number  // issued at
    exp?: number  // expiration time
}

export type TValidateTokenInput = z.infer<typeof validateTokenSchema>
import { z } from 'zod'
import { refreshTokenSchema } from '../utils/validations/refreshToken.schemas'

export type TRefreshTokenInput = z.infer<typeof refreshTokenSchema>

export interface IRefreshTokenResponse {
    accessToken: string
    refreshToken: string
}
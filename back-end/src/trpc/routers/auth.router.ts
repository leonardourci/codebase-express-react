import { z } from 'zod'

import { router, procedure } from '../trpc'
import { protectedProcedure } from '../middleware/auth.middleware'
import { loginSchema, signupSchema } from '../../utils/validations/auth.schemas'
import { refreshTokenSchema } from '../../utils/validations/refresh-token.schemas'
import { authenticateUser, registerUser, refreshAccessToken, revokeUserRefreshToken, authenticateWithGoogle, verifyUserEmail, resendVerificationEmail } from '../../services/auth.service'
import { googleAuthSchema } from '../../utils/validations/google-auth.schemas'

export const authRouter = router({
    google: procedure
        .input(googleAuthSchema)
        .mutation(async ({ input }) => {
            return await authenticateWithGoogle(input)
        }),

    login: procedure
        .input(loginSchema)
        .mutation(async ({ input }) => {
            return await authenticateUser(input)
        }),

    signup: procedure
        .input(signupSchema)
        .mutation(async ({ input }) => {
            return await registerUser(input)
        }),

    refresh: procedure
        .input(refreshTokenSchema)
        .mutation(async ({ input }) => {
            return await refreshAccessToken(input)
        }),

    logout: protectedProcedure
        .mutation(async ({ ctx }) => {
            await revokeUserRefreshToken({ userId: ctx.user.id })
            return { success: true }
        }),

    verifyEmail: procedure
        .input(z.object({ token: z.string() }))
        .mutation(async ({ input }) => {
            await verifyUserEmail(input)
            return { success: true, message: 'Email verified successfully' }
        }),

    resendVerificationEmail: protectedProcedure
        .mutation(async ({ ctx }) => {
            await resendVerificationEmail({ userId: ctx.user.id })
            return { success: true, message: 'Verification email sent' }
        })
})
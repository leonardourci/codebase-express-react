import { router } from '../trpc'
import { protectedProcedure } from '../middleware/auth.middleware'
import { updateUserSchema } from '../../utils/validations/user.schemas'
import { getUserProfile, updateUserProfile } from '../../services/user.service'

export const userRouter = router({
    getUserById: protectedProcedure
        .query(async ({ ctx }) => {
            return await getUserProfile({ userId: ctx.user.id })
        }),

    updateUserById: protectedProcedure
        .input(updateUserSchema)
        .mutation(async ({ ctx, input }) => {
            return await updateUserProfile({ userId: ctx.user.id, updates: input })
        })
})
import { trpcClient } from '../lib/trpc'
import type { TUpdateUserInput } from '@/types'

export class UserService {
    async getProfile() {
        return await trpcClient.user.getUserById.query()
    }

    async updateProfile(updates: TUpdateUserInput) {
        return await trpcClient.user.updateUserById.mutate(updates)
    }
}

export const userService = new UserService()
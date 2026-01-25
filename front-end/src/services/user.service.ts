import { trpcClient } from '../lib/trpc'

export interface IUpdateUserInput {
    fullName?: string
    email?: string
    phone?: string
    age?: number
}

export class UserService {
    async getProfile() {
        return await trpcClient.user.getUserById.query()
    }

    async updateProfile(updates: IUpdateUserInput) {
        return await trpcClient.user.updateUserById.mutate(updates)
    }
}

export const userService = new UserService()
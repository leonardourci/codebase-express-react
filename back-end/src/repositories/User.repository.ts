import {ISignupPayload, ISignupResponse} from '../interfaces/auth'
import {IUserInfoByEmailResponse} from '../interfaces/user'
import {IUserRepository} from '../interfaces/repository'

/**
 * @todo
 * - criar adapters pra resposta do banco e transformar de snake_case pra camelCase
 */

export default class UserRepository implements IUserRepository {
    getUserByEmail = async (email: string): Promise<IUserInfoByEmailResponse> => {
        return {
            id: 1,
            passwordHash: '$2b$10$b1vft0gkw/3pBsh6HGqdtOEMW5OVqi919Awm2wpabVK4xwsgbS3my' // senhateste
        }
    }

    create = async (payload: ISignupPayload): Promise<ISignupResponse> => {
        return {
            id: 1,
            age: payload.age,
            email: payload.email,
            fullName: payload.fullName,
        }
    }
}

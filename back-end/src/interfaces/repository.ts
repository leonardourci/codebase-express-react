import {ISignupPayload, ISignupResponse} from './auth'
import {IUserInfoByEmailResponse} from './user'

export interface IUserRepository {
    getUserByEmail(email: string): Promise<IUserInfoByEmailResponse>

    create(payload: ISignupPayload): Promise<ISignupResponse>
}

export default interface IRepositories {
    user: IUserRepository
}

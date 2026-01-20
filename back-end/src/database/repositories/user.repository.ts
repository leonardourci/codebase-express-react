import knex from '../knex'
import { ISignupResponse } from '../../types/auth'
import { User } from '../models/User.model'
import { ICreateUserInput, IUserInfoByEmailResponse } from '../../types/user'

export async function createUser(input: ICreateUserInput): Promise<ISignupResponse> {
	const [row] = await knex(User.tableName)
		.insert({
			email: input.email,
			full_name: input.fullName,
			age: input.age,
			phone: input.phone,
			password_hash: input.passwordHash,
			created_at: new Date(),
			updated_at: new Date()
		})
		.returning(['id', 'email', 'full_name', 'age', 'password_hash'])

	return new User({
		email: row.email,
		fullName: row.full_name,
		phone: row.phone,
		passwordHash: row.password_hash,
		age: row.age
	}).toSignupResponse()
}

export const getUserByEmail = async (input: Pick<User, 'email'>): Promise<IUserInfoByEmailResponse | null> => {
	const [row] = await knex(User.tableName).where({ email: input.email }).select()

	if (!row) return null

	const user = new User(row).toUserInfoByEmailResponse()

	return user
}

export const getUserById = async (input: { id: string }): Promise<User | null> => {
	const [row] = await knex(User.tableName).where({ id: input.id }).select()

	if (!row) return null

	return new User(row).toJSON()
}

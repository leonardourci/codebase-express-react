import knex from '../knex'
import { ISignupResponse } from '../../types/auth'
import { ICreateUserInput, IUserInfoByEmailResponse, IUser, IUserDbRow } from '../../types/user'
import { keysToCamelCase, keysToSnakeCase } from '../../utils/caseConversion'

const USERS_TABLE = 'users'

export async function createUser(input: ICreateUserInput): Promise<ISignupResponse> {
	const insertData = keysToSnakeCase<ICreateUserInput, Partial<IUserDbRow>>(input)

	const [row] = await knex(USERS_TABLE)
		.insert(insertData)
		.returning(['id', 'email', 'full_name', 'age', 'phone'])

	return {
		id: row.id,
		email: row.email,
		fullName: row.full_name,
		age: row.age,
		phone: row.phone
	}
}

export const getUserByEmail = async (input: { email: string }): Promise<IUserInfoByEmailResponse | null> => {
	const [row] = await knex(USERS_TABLE).where({ email: input.email }).select()

	if (!row) return null

	return {
		id: row.id,
		passwordHash: row.password_hash
	}
}

export const getUserById = async (input: { id: string }): Promise<IUser | null> => {
	const [row] = await knex(USERS_TABLE).where({ id: input.id }).select()

	if (!row) return null

	return keysToCamelCase<IUserDbRow, IUser>(row)
}

export const getUserByRefreshToken = async ({ refreshToken }: { refreshToken: string }): Promise<IUser | null> => {
	const [row] = await knex(USERS_TABLE)
		.where({ refresh_token: refreshToken })
		.select()

	if (!row) return null

	return keysToCamelCase<IUserDbRow, IUser>(row)
}

export const updateUserById = async ({ userId, updates }: {
	userId: string,
	updates: Partial<Pick<IUser, 'email' | 'fullName' | 'phone' | 'age' | 'passwordHash' | 'refreshToken'>>
}
): Promise<void> => {
	const updateData = keysToSnakeCase<typeof updates & { updatedAt: Date }, Partial<IUserDbRow>>({
		...updates,
		updatedAt: new Date()
	})

	await knex(USERS_TABLE)
		.where({ id: userId })
		.update(updateData)
}
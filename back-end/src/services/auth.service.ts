import bcrypt from 'bcrypt'

import { generateJwtToken } from '../utils/jwt'
import { CustomError } from '../utils/errors'
import { EStatusCodes } from '../utils/statusCodes'
import { TLoginInput, ILoginResponse, TSignupInput, ISignupResponse } from '../types/auth'
import { createUser, getUserByEmail } from '../database/repositories/user.repository'

const { HASH_SALT } = process.env

export async function authenticateUser(input: TLoginInput): Promise<ILoginResponse> {
	const userInfo = await getUserByEmail({ email: input.email })

	if (!userInfo) throw new CustomError('Email or password is wrong', EStatusCodes.UNAUTHORIZED)

	const isValidPassword = bcrypt.compareSync(input.password, userInfo.passwordHash)

	if (!isValidPassword) throw new CustomError('Email or password is wrong', EStatusCodes.UNAUTHORIZED)

	return { token: generateJwtToken({ userId: userInfo.id }) }
}

export async function registerUser(input: TSignupInput): Promise<ISignupResponse> {
	const passwordHash = bcrypt.hashSync(input.password, Number(HASH_SALT) ?? '')

	return await createUser({ ...input, passwordHash })
}

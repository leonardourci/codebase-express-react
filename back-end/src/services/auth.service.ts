import bcrypt from 'bcrypt'

import { generateJwtToken, verifyJwtToken } from '../utils/jwt'
import { CustomError } from '../utils/errors'
import { EStatusCodes } from '../utils/statusCodes'
import { TLoginInput, ILoginResponse, TSignupInput, ISignupResponse } from '../types/auth'
import { TRefreshTokenInput, IRefreshTokenResponse } from '../types/refreshToken'
import {
	createUser,
	getUserByEmail,
	getUserByRefreshToken,
	updateUserById
} from '../database/repositories/user.repository'

const { HASH_SALT } = process.env

export async function authenticateUser(input: TLoginInput): Promise<ILoginResponse> {
	const user = await getUserByEmail({ email: input.email })

	if (!user) throw new CustomError('Email or password is wrong', EStatusCodes.UNAUTHORIZED)

	const isValidPassword = bcrypt.compareSync(input.password, user.passwordHash)

	if (!isValidPassword) throw new CustomError('Email or password is wrong', EStatusCodes.UNAUTHORIZED)

	const accessToken = generateJwtToken({ userId: user.id })
	const refreshToken = accessToken

	await updateUserById({ userId: user.id, updates: { refreshToken } })

	return {
		accessToken,
		refreshToken
	}
}

export async function registerUser(input: TSignupInput): Promise<ISignupResponse> {
	const passwordHash = bcrypt.hashSync(input.password, Number(HASH_SALT) ?? '')

	return await createUser({ ...input, passwordHash })
}

export async function refreshAccessToken(input: TRefreshTokenInput): Promise<IRefreshTokenResponse> {
	verifyJwtToken({ token: input.refreshToken })

	const user = await getUserByRefreshToken({ refreshToken: input.refreshToken })

	if (!user) {
		throw new CustomError('Invalid refresh token', EStatusCodes.UNAUTHORIZED)
	}

	const accessToken = generateJwtToken({ userId: user.id })
	const refreshToken = accessToken

	await updateUserById({ userId: user.id, updates: { refreshToken } })

	return {
		accessToken,
		refreshToken: refreshToken
	}
}

export async function revokeUserRefreshToken(userId: string): Promise<void> {
	await updateUserById({ userId, updates: { refreshToken: undefined } })
}
import jwt from 'jsonwebtoken'

import { CustomError, ZodValidationError } from './errors'
import { EStatusCodes } from './statusCodes'
import globalConfig from './globalConfig'
import { IUser } from '../types/user'
import { TValidateTokenInput, IToken } from '../types/jwt'
import { validateTokenSchema } from './validations/jwt.schemas'

export const generateJwtToken = (input: { userId: IUser['id'] }) => jwt.sign(input, globalConfig.jwtSecret, { expiresIn: '7d' })

export const verifyJwtToken = (input: TValidateTokenInput): void => {
	const { data, error } = validateTokenSchema.safeParse(input)

	if (error) throw new ZodValidationError(error)

	try {
		const token = data!.token.split('Bearer ')[1]

		jwt.verify(token!, globalConfig.jwtSecret)
	} catch (err) {
		throw new CustomError(`TOKEN_ERROR: ${err}`, EStatusCodes.UNAUTHORIZED)
	}
}

export const decodeJwtToken = ({ token }: TValidateTokenInput): IToken => {
	const { data, error } = validateTokenSchema.safeParse({ token })

	if (error) throw new ZodValidationError(error)

	return jwt.decode(data.token) as IToken
}
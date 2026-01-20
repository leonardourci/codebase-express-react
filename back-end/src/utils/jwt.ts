import jwt from 'jsonwebtoken'

import { CustomError, ZodValidationError } from './errors'
import { EStatusCodes } from './statusCodes'
import globalConfig from './globalConfig'
import { IUser } from '../types/user'
import { TValidateTokenPayload, IToken } from '../types/jwt'
import { validateTokenSchema } from './validations/jwt.schemas'

export const generateJwtToken = (payload: { userId: IUser['id'] }) => jwt.sign(payload, globalConfig.jwtSecret, { expiresIn: '1d' })

export const verifyJwtToken = (payload: TValidateTokenPayload): void => {
	const { data, error } = validateTokenSchema.safeParse(payload)

	if (error) throw new ZodValidationError(error)

	try {
		const token = data!.token.split('Bearer ')[1]

		jwt.verify(token!, globalConfig.jwtSecret)
	} catch (err) {
		throw new CustomError(`TOKEN_ERROR: ${err}`, EStatusCodes.UNAUTHORIZED)
	}
}

export const decodeJwtToken = ({ token }: TValidateTokenPayload): IToken => {
	const { data, error } = validateTokenSchema.safeParse({ token })

	if (error) throw new ZodValidationError(error)

	return jwt.decode(data.token) as IToken
}

import { ZodValidationError } from '../utils/errors'
import { EStatusCodes } from '../utils/statusCodes'
import { TLoginInput, ILoginResponse, TSignupInput } from '../types/auth'
import { loginSchema, signupSchema } from '../utils/validations/auth.schemas'
import { authenticateUser, registerUser } from '../services/auth.service'
import { IPerformJsonCallback } from '../adapters/expressAdapter'

export async function loginHandler(input: TLoginInput): Promise<IPerformJsonCallback<ILoginResponse>> {
	const { data, error } = loginSchema.safeParse(input)

	if (error) throw new ZodValidationError(error)

	return {
		response: await authenticateUser(data),
		status: EStatusCodes.OK
	}
}

export async function signupHandler(input: TSignupInput): Promise<IPerformJsonCallback<any>> {
	const { data, error } = signupSchema.safeParse(input)

	if (error) throw new ZodValidationError(error)

	return {
		response: await registerUser(data),
		status: EStatusCodes.OK
	}
}

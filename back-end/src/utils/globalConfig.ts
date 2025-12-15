import { JoiValidationError } from './errors'
import { validateGlobalEnvs } from './validations/Envs.validator'

const { value, error } = validateGlobalEnvs(process.env)

if (error) {
	throw new JoiValidationError(error)
}

export default {
	nodeEnv: value.NODE_ENV,
	restPort: value.REST_PORT,
	databaseConnectionString: value.DATABASE_CONNECTION_STRING,
	hashSalt: value.HASH_SALT,
	jwtSecret: value.JWT_SECRET
} as const

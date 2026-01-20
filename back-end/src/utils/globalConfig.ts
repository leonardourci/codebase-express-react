import { ZodValidationError } from './errors'
import { globalEnvsSchema } from './validations/envs.schemas'

const { data, error } = globalEnvsSchema.safeParse(process.env)

if (error) {
	throw new ZodValidationError(error)
}

export default {
	nodeEnv: data.NODE_ENV,
	restPort: data.REST_PORT,
	databaseConnectionString: data.DATABASE_CONNECTION_STRING,
	hashSalt: data.HASH_SALT,
	jwtSecret: data.JWT_SECRET,
	stripeSecretKey: data.STRIPE_SECRET_KEY
} as const

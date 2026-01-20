import { z } from 'zod'
import { globalEnvsSchema } from '../utils/validations/envs.schemas'

export enum ENodeEnvs {
	DEVELOPMENT = 'development',
	PRODUCTION = 'production',
	TEST = 'test'
}

export type TGlobalEnvsPayload = z.infer<typeof globalEnvsSchema>

import { Knex } from 'knex'
import globalConfig from '../utils/globalConfig'

const config: Knex.Config = {
	client: 'pg',
	connection: globalConfig.databaseConnectionString,
	migrations: {
		tableName: 'knex_migrations',
		directory: './src/db/migrations',
		extension: 'ts'
	}
}

export default config

import { cleanTestData, getTestDb } from "./test-db"

describe('Test Database Integration', () => {
    beforeEach(async () => {
        await cleanTestData()
    })

    it('should have access to the test database', async () => {
        const db = getTestDb()
        expect(db).toBeDefined()

        const tables = await db.raw(`
            SELECT tablename 
            FROM pg_tables 
            WHERE schemaname = 'public'
        `)

        const tableNames = tables.rows.map((row: any) => row.tablename)
        expect(tableNames).toContain('users')
        expect(tableNames).toContain('products')
        expect(tableNames).toContain('billings')
        expect(tableNames).toContain('knex_migrations')
    })

    it('should cleanup test data successfully', async () => {
        const db = getTestDb()

        await db('users').insert({
            email: 'test@example.com',
            full_name: 'Test User',
            phone: '1234567890',
            age: 25,
            password_hash: 'hashedpassword'
        })

        const usersBefore = await db('users').select('*')
        expect(usersBefore).toHaveLength(1)

        await cleanTestData()

        const usersAfter = await db('users').select('*')
        expect(usersAfter).toHaveLength(0)
    })

    it('should maintain database connection across multiple calls', async () => {
        const db1 = getTestDb()
        const db2 = getTestDb()

        expect(db1).toBe(db2)
    })
})
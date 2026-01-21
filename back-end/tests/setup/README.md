# Test Setup Utilities

This directory contains utilities for setting up and managing test infrastructure.

## TestDatabaseManager

The `TestDatabaseManager` class provides database lifecycle management for integration tests.

### Features

- **Isolated Test Databases**: Creates unique test databases for each test run
- **Automatic Setup/Teardown**: Handles database creation, migration, and cleanup
- **Connection Management**: Provides Knex connection instances for test use
- **Data Isolation**: Ensures tests don't interfere with each other

### Usage

```typescript
import TestDatabaseManager from './test-database'

describe('My Integration Tests', () => {
  let testDbManager: TestDatabaseManager

  beforeAll(async () => {
    testDbManager = new TestDatabaseManager()
    await testDbManager.setup()
    await testDbManager.migrate()
  })

  afterAll(async () => {
    await testDbManager.teardown()
  })

  beforeEach(async () => {
    await testDbManager.cleanup() // Clean data between tests
  })

  it('should test database operations', async () => {
    const db = testDbManager.getConnection()
    
    // Use db for your tests
    await db('users').insert({ ... })
    const users = await db('users').select('*')
    
    expect(users).toHaveLength(1)
  })
})
```

### Methods

- `setup()`: Creates test database and establishes connection
- `migrate()`: Runs database migrations to set up schema
- `cleanup()`: Removes all test data from tables
- `teardown()`: Drops test database and closes connections
- `getConnection()`: Returns Knex connection instance
- `getTestDbName()`: Returns the unique test database name

### Requirements

- PostgreSQL database server running
- Valid `DATABASE_CONNECTION_STRING` environment variable
- Database migrations in `src/db/migrations/`

### Environment Variables

Set these in your test environment:

```bash
DATABASE_CONNECTION_STRING=postgresql://user:password@localhost:5432/main_db
TEST_DATABASE_URL=postgresql://user:password@localhost:5432/test_db
```

The TestDatabaseManager will create unique test databases based on the connection string provided.
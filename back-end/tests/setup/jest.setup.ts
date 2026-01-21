// This file runs before each test file

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret-key-for-integration-tests';
process.env.HASH_SALT = '10';
process.env.REST_PORT = '3001'; // Different port for test server

process.env.DATABASE_CONNECTION_STRING = process.env.TEST_DATABASE_URL || 'postgresql://test_user:test_password@localhost:5433/postgres';

process.env.STRIPE_SECRET_KEY = 'sk_test_fake_key_for_integration_tests';

// Increase timeout for integration tests
jest.setTimeout(30000);
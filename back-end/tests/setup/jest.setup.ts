// This file runs before each test file

import { DEFAULT_TEST_DB_CONNECTION } from "../../src/database/knexfile";

// Mock email service before any imports
jest.mock('../../src/services/email.service', () => ({
    sendVerificationEmail: jest.fn().mockResolvedValue(undefined),
    sendPasswordResetEmail: jest.fn().mockResolvedValue(undefined)
}))

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret-key-for-integration-tests';
process.env.HASH_SALT = '10';
process.env.REST_PORT = '3001'; // Different port for test server

process.env.DATABASE_CONNECTION_STRING = process.env.TEST_DATABASE_URL || DEFAULT_TEST_DB_CONNECTION

process.env.STRIPE_SECRET_KEY = 'sk_test_fake_key_for_integration_tests';
process.env.STRIPE_WEBHOOK_SECRET = 'whsec_test_fake_webhook_secret_for_integration_tests';

// Additional required environment variables
process.env.GOOGLE_CLIENT_ID = 'test-google-client-id';
process.env.RESEND_API_KEY = 're_test_fake_api_key';
process.env.RESEND_FROM_EMAIL = 'test@example.com';
process.env.APP_URL = 'http://localhost:5173';

// Increase timeout for integration tests
jest.setTimeout(30000);
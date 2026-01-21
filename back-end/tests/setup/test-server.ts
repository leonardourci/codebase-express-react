import { Server } from 'http'
import app from '../../src/app'
import { getTestDb } from './test-db'

let testServer: Server | null = null
const TEST_PORT = 3001

export async function startTestServer(): Promise<string> {
    if (testServer) {
        return `http://localhost:${TEST_PORT}`
    }

    // Ensure test database is ready
    const testDb = getTestDb()
    await testDb.migrate.latest()

    return new Promise((resolve, reject) => {
        testServer = app.listen(TEST_PORT, (err?: Error) => {
            if (err) {
                reject(err)
            } else {
                resolve(`http://localhost:${TEST_PORT}`)
            }
        })
    })
}

export async function stopTestServer(): Promise<void> {
    if (!testServer) {
        return
    }

    return new Promise((resolve, reject) => {
        testServer!.close((err?: Error) => {
            if (err) {
                reject(err)
            } else {
                testServer = null
                resolve()
            }
        })
    })
}
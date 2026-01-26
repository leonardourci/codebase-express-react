#!/bin/sh
set -e

echo "Waiting for database to be ready..."
until npx knex raw "SELECT 1" --knexfile dist/database/knexfile.js > /dev/null 2>&1; do
  echo "Database is unavailable - sleeping"
  sleep 2
done

echo "Database is ready. Running migrations..."
npx knex migrate:latest --knexfile dist/database/knexfile.js

echo "Migrations completed. Starting server..."
exec "$@"


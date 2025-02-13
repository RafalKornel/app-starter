#!/bin/bash
set -e

# Check if the required environment variables are set
if [[ -z "$POSTGRES_DB" || -z "$POSTGRES_USER" || -z "$POSTGRES_PASSWORD" ]]; then
  echo "Environment variables POSTGRES_DB, POSTGRES_USER, or POSTGRES_PASSWORD are not set. Exiting."
  exit 1
fi

# Function to check if a database exists
database_exists() {
  psql -U "$POSTGRES_USER" -d postgres -tc "SELECT 1 FROM pg_database WHERE datname = '$POSTGRES_DB'" | grep -q 1
}

# Function to check if a user exists
user_exists() {
  psql -U "$POSTGRES_USER" -d postgres -tc "SELECT 1 FROM pg_roles WHERE rolname = '$POSTGRES_USER'" | grep -q 1
}

# Only create the database and user if they do not exist
if database_exists; then
  echo "Database '$POSTGRES_DB' already exists. Skipping creation."
else
  echo "Creating database '$POSTGRES_DB'."
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "postgres" <<-EOSQL
      CREATE DATABASE "$POSTGRES_DB";
EOSQL
fi

if user_exists; then
  echo "User '$POSTGRES_USER' already exists. Skipping creation."
else
  echo "Creating user '$POSTGRES_USER' with provided password."
  psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "postgres" <<-EOSQL
      CREATE USER "$POSTGRES_USER" WITH ENCRYPTED PASSWORD '$POSTGRES_PASSWORD';
      GRANT ALL PRIVILEGES ON DATABASE "$POSTGRES_DB" TO "$POSTGRES_USER";
EOSQL
fi

echo "Database and user setup completed."

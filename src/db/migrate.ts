import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema/gtfs_schedule'

// This will run migrations on the database, skipping the ones already applied
const migrationClient = postgres(process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/postgres', {max: 1});

const db = drizzle(migrationClient, { schema });

async function runMigrations() {
  try {
    await migrate(db, { migrationsFolder: './db/migrations' });
    console.log('Migrations ran successfully');
    await migrationClient.end();
  } catch (err) {
    console.error('Error running migrations', err);
  }
}

runMigrations();
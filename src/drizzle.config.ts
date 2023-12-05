import dotenv from 'dotenv';
import type { Config } from 'drizzle-kit';

dotenv.config({ path: '.env.local' });
 
export default {
	schema: './db/schema/gtfs_schedule.ts',
	out: './db/migrations',
	driver: 'pg', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
	dbCredentials: {
        connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/postgres',
	},
} satisfies Config;
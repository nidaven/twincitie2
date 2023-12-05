import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema/gtfs_schedule'
 
export const client = postgres(process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/postgres');

export const db = drizzle(client, { schema });
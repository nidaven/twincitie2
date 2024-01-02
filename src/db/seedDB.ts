import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { agency, routes, trips, stop_times, stops, calendar, calendar_dates, shapes } from './schema/gtfs_schedule'; // Ensure this path is correct and these modules exist
import { client } from './core'; 
import path from 'path';
import { unzip, Open, Parse, Extract } from 'unzipper';
import { seedTable } from './seedTable';

interface Tables {
  [key: string]: any; // Replace 'any' with the actual type of your tables
}

export const tables: Tables = { agency, routes, trips, stop_times, stops, calendar, calendar_dates, shapes };

async function seedData({ url }: { url: string; }): Promise<void> {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  console.log(`Downloaded ${buffer.byteLength} bytes`);
  const directory = await Open.buffer(Buffer.from(buffer));
 
  for (const file of directory.files) {
    const tableName = path.basename(file.path, '.txt'); 
    const fileContent = await file.buffer();

    console.log(`Starting seeding operation for ${tableName}`);
    await seedTable(tableName, fileContent);
  } 
}

const GTFS_SCHEDULE_URL = `${process.env.TFWM_SCHEDULE_BASE_URL}?app_id=${process.env.TFWM_API_ID}&app_key=${process.env.TFWM_APP_KEY}`;
console.log(`Downloading GTFS schedule from ${GTFS_SCHEDULE_URL}`);

seedData({ url: GTFS_SCHEDULE_URL })
  .catch(console.error)
  .finally(() => {
    console.log('Closing database connection');
    client.end();
  });

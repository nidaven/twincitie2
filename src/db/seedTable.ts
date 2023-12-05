import { Readable } from 'stream';
import csv from 'csv-parser';
import { db } from './core';
import { tables } from './seed';
import { shapes } from './schema/gtfs_schedule';

export async function seedTable(tableName: string, fileContent: Buffer) {
  const table = tables[tableName];
  if (!table) {
    console.error(`Unknown table: ${tableName}`);
    return;
  }

  const stream = Readable.from(fileContent.toString()).pipe(csv());
  // for await (const record of stream) {
  //   records.push(record);
  // }

  console.log('Sample record for table', tableName);
  console.log(`Removing all existing records from ${tableName}`);

  await db.delete(table);

  console.log(`Seeding data into ${tableName}`);
  let count = 0;

  if (table === shapes) {
    console.log('Modifying shape_dist_traveled');
    for await (const record of stream) {
      if (record.shape_dist_traveled === '') {
        record.shape_dist_traveled = null;
      }
      await db.insert(table).values(record);
      count++;
    }
  }
  else {
    for await (const record of stream) {
      await db.insert(table).values(record);
      count++;
    }
  }
  console.log(`Seeded ${count} records into ${tableName}`);
}

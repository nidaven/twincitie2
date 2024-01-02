import {agency} from '@/db/schema/gtfs_schedule'
import { db } from '@/db/core'
import { sql } from 'drizzle-orm';

const agency_name = 'Diamond Bus'

export async function GET(request: Request) {
    const fetchAgencyData = async () => {
        const result = await db.execute(sql`SELECT agency_name as name FROM ${agency} where ${agency.agency_name} = ${agency_name} LIMIT 1`)
        return result
      };
    const data = await fetchAgencyData()
    return Response.json(data)
}
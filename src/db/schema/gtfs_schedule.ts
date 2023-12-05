// schema.ts
import { pgTable, text, varchar, integer, date, boolean, numeric  } from "drizzle-orm/pg-core";

export const agency = pgTable('agency', {
  agency_id: varchar('agency_id', { length: 256 }).primaryKey(),
  agency_name: text('agency_name'),
  agency_url: text('agency_url'),
  agency_timezone: text('agency_timezone'),
  agency_lang: varchar('agency_lang', { length: 2 }),
  agency_phone: varchar('agency_phone', { length: 50 }),
});

export const stops = pgTable('stops', {
  stop_id: varchar('stop_id', { length: 256 }).primaryKey(),
  stop_code: varchar('stop_code', { length: 50 }),
  stop_name: text('stop_name'),
  stop_lat: numeric('stop_lat'),
  stop_lon: numeric('stop_lon'),
  location_type: integer('location_type'),
  parent_station: varchar('parent_station', { length: 256 }),
});

export const routes = pgTable('routes', {
  route_id: varchar('route_id', { length: 256 }),//.primaryKey(),
  agency_id: varchar('agency_id', { length: 256 }),//.references(() => agency.agency_id),
  route_short_name: varchar('route_short_name', { length: 50 }),
  route_long_name: text('route_long_name'),
  route_desc: text('route_desc'),
  route_type: integer('route_type'),
  route_url: text('route_url'),
  route_color: varchar('route_color', { length: 6 }),
  route_text_color: varchar('route_text_color', { length: 6 }),
  route_sort_order: integer('route_sort_order'),
});

export const trips = pgTable('trips', {
  route_id: varchar('route_id', { length: 256 }),//.references(() => routes.route_id),
  service_id: varchar('service_id', { length: 256 }),//.references(() => calendar.service_id),
  trip_id: varchar('trip_id', { length: 256 }).primaryKey(),
  trip_headsign: varchar('trip_headsign', { length: 256 }),
  trip_short_name: varchar('trip_short_name', { length: 50 }),
  direction_id: integer('direction_id'),
  block_id: varchar('block_id', { length: 256 }),
  shape_id: varchar('shape_id', { length: 256 }),
  wheelchair_accessible: integer('wheelchair_accessible'),
  bikes_allowed: integer('bikes_allowed'),
});

export const stop_times = pgTable('stop_times', {
  trip_id: varchar('trip_id', { length: 256 }), //.references(() => trips.trip_id ),
  arrival_time: text('arrival_time'),
  departure_time: text('departure_time'),
  stop_id: varchar('stop_id', { length: 256 }),//.references(() => stops.stop_id),
  stop_sequence: integer('stop_sequence'),
  stop_headsign: varchar('stop_headsign', { length: 256 }),
  pickup_type: integer('pickup_type'),
  drop_off_type: integer('drop_off_type'),
  continuous_pickup: integer('continuous_pickup'),
  continuous_drop_off: integer('continuous_drop_off'),
  shape_dist_traveled: text('shape_dist_traveled'),
  timepoint: integer('timepoint'),
});

export const calendar = pgTable('calendar', {
  service_id: varchar('service_id', { length: 256 }).primaryKey(),
  monday: boolean('monday'),
  tuesday: boolean('tuesday'),
  wednesday: boolean('wednesday'),
  thursday: boolean('thursday'),
  friday: boolean('friday'),
  saturday: boolean('saturday'),
  sunday: boolean('sunday'),
  start_date: text('start_date'),
  end_date: text('end_date'),
});

export const calendar_dates = pgTable('calendar_dates', {
  service_id: varchar('service_id', { length: 256 }),//.references(() => calendar.service_id),
  date: text('date'),
  exception_type: integer('exception_type'),
});

export const shapes = pgTable('shapes', {
  shape_id: varchar('shape_id', { length: 256 }),
  shape_pt_lat: numeric('shape_pt_lat'),
  shape_pt_lon: numeric('shape_pt_lon'),
  shape_pt_sequence: integer('shape_pt_sequence'),
  shape_dist_traveled: numeric('shape_dist_traveled'),
});


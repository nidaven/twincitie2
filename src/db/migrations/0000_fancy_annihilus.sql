CREATE TABLE IF NOT EXISTS "agency" (
	"agency_id" varchar(256) PRIMARY KEY NOT NULL,
	"agency_name" text,
	"agency_url" text,
	"agency_timezone" text,
	"agency_lang" varchar(2),
	"agency_phone" varchar(50)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "calendar" (
	"service_id" varchar(256) PRIMARY KEY NOT NULL,
	"monday" boolean,
	"tuesday" boolean,
	"wednesday" boolean,
	"thursday" boolean,
	"friday" boolean,
	"saturday" boolean,
	"sunday" boolean,
	"start_date" text,
	"end_date" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "calendar_dates" (
	"service_id" varchar(256),
	"date" text,
	"exception_type" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "routes" (
	"route_id" varchar(256),
	"agency_id" varchar(256),
	"route_short_name" varchar(50),
	"route_long_name" text,
	"route_desc" text,
	"route_type" integer,
	"route_url" text,
	"route_color" varchar(6),
	"route_text_color" varchar(6),
	"route_sort_order" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shapes" (
	"shape_id" varchar(256),
	"shape_pt_lat" numeric,
	"shape_pt_lon" numeric,
	"shape_pt_sequence" integer,
	"shape_dist_traveled" numeric
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stop_times" (
	"trip_id" varchar(256),
	"arrival_time" text,
	"departure_time" text,
	"stop_id" varchar(256),
	"stop_sequence" integer,
	"stop_headsign" varchar(256),
	"pickup_type" integer,
	"drop_off_type" integer,
	"continuous_pickup" integer,
	"continuous_drop_off" integer,
	"shape_dist_traveled" text,
	"timepoint" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stops" (
	"stop_id" varchar(256) PRIMARY KEY NOT NULL,
	"stop_code" varchar(50),
	"stop_name" text,
	"stop_lat" numeric,
	"stop_lon" numeric,
	"location_type" integer,
	"parent_station" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "trips" (
	"route_id" varchar(256),
	"service_id" varchar(256),
	"trip_id" varchar(256) PRIMARY KEY NOT NULL,
	"trip_headsign" varchar(256),
	"trip_short_name" varchar(50),
	"direction_id" integer,
	"block_id" varchar(256),
	"shape_id" varchar(256),
	"wheelchair_accessible" integer,
	"bikes_allowed" integer
);

-- set up postgresql database called "wheniwork_mini_api"
-- then, run the query below to set up the shifts table

CREATE TABLE "shifts" (
	"id" SERIAL PRIMARY KEY,
	"start" TIMESTAMPTZ NOT NULL,
	"end" TIMESTAMPTZ NOT NULL,
	"title" VARCHAR(50) NOT NULL
);
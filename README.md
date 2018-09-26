# time-tracker



```SQL
CREATE TABLE "projects" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(255) NOT NULL
	);

CREATE TABLE "entries" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(255) NOT NULL,
	"project_id" INT REFERENCES "projects" NOT NULL,
	"date" DATE NOT NULL,
	"start_time" TIME(4) NOT NULL,
	"end_time" TIME(4) NOT NULL
	);
	
INSERT INTO "projects" ("name")
	VALUES('Koala Holla'), ('Server Side Calculator');
	
INSERT INTO "entries" ("name", "project_id", "date", "start_time", "end_time")
	VALUES ('deploy calculator', 2, '2018-09-17', '04:15', '06:45'), 
	('add some koala data', 1, '2018-09-25', '12:00', '04:50'), 
	('style koala table', 1, '2018-09-06', '09:00', '10:35');
  ```
# Time Tracker

This app is meant for users to manage ongoing projects and time spent on tasks associated with each project. Users can add or delete projects and tasks along with the specific date and times spent on a specific task. The reports view allows users to visualize the number of hours spent on individual projects or tasks.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites and Installation

All dependencies are located in the package.json file. Assuming you have node installed, run the command below from the terminal inside the project directory.

```
npm install
```

To set up the database, create a new PostgreSQL database named 'time_tracker' and run the commands in database.sql (listed below) to create tables and add dummy data for testing.

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

## Built With

* [MomentJS](https://momentjs.com/) - Used for time formatting
* [ChartJS](https://maven.apache.org/) - Used to generate bar charts
* [PaletteJS](https://rometools.github.io/rome/) - Used to dynamically generate color palettes
* [AngularJS](https://angularjs.org/) - Front-end Framework
* [angular-route](https://www.npmjs.com/package/angular-route) - Used for client-side routing
* [AngularJS Material](https://material.angularjs.org/) - Used for styling
* [hex-to-rgba](https://www.npmjs.com/package/hex-to-rgba) - Used to convert colors from hex to rgba format
* [Node](https://nodejs.org/) - Used for backend functionality
* [Express](http://expressjs.com/) - Backend framework
* [PostgreSQL](https://www.postgresql.org/) - Database

## Authors

* **Christopher Brenberg** - *Initial work* - [cbrenberg](https://github.com/cbrenberg)

## Acknowledgments

* [Prime Digital Academy](https://primeacademy.io)




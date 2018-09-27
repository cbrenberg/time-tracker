//requires
const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
//const url = require('url'); //required for heroku config later
//require routers here


//globals
const app = express();
const PORT = process.env.PORT || 5000;

//uses
app.use(bodyParser.json());
app.use(express.static('server/public'));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})


/* ----------- MODULE OUT TO POOL.JS LATER ------------- */
//pool setup
let config = {
  host: 'localhost',
  port: 5432,
  database: 'time_tracker',
  max: 10,
  idleTimeoutMillis: 30000
};

const pool = new pg.Pool(config);

pool.on('connect', () => {
  console.log('Postgresql connected');
})

pool.on('error', (err) => {
  console.log('Unexpected error on idle client', err);
  process.exit(-1);
})

/* ----------- MODULE OUT TO SEPARATE ROUTERS LATER ------------- */

//routes

//POST NEW TIME ENTRY
app.post('/entries', (req, res) => {
  console.log('req.body:', req.body);
  pool.query( `INSERT INTO "entries" ("name", "project_id", "date", "start_time", "end_time")
	            VALUES ($1, $2, $3, $4, $5)`, [req.body.name, req.body.project_id, req.body.date, req.body.start_time, req.body.end_time])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('Error adding entry to database.', error);
      res.sendStatus(500);
    })//end pool query
})//end POST

//GET TIME ENTRIES
app.get('/entries', (req, res) => {
  console.log('/entries GET');
  pool.query(`SELECT "entries"."id", "entries"."name", "entries"."date", ("entries"."end_time" - "entries"."start_time") as "duration" , "projects"."name" as "project"  
              FROM "entries"
              JOIN "projects" on "projects"."id" = "entries"."project_id";`)
  .then((results) => {
    res.send(results.rows);
  })
  .catch((error) => {
    console.log('Error retrieving entries');
    res.sendStatus(500);
  })
})//end GET

//DELETE TIME ENTRY
app.delete('/entries', (req, res) => {
  console.log('/entries DELETE');
  pool.query(`DELETE FROM "entries" WHERE "id"=$1;`, [req.query.id])
  .then(() => {
    console.log('Deleted listing');
    res.sendStatus(200);
  })
  .catch((error) => {
    console.log("error deleting entry", error);
    res.sendStatus(500);
  })
  
})//end DELETE
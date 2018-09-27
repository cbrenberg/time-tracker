const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


//POST NEW TIME ENTRY
router.post('/', (req, res) => {
  console.log('req.body:', req.body);
  pool.query(`INSERT INTO "entries" ("name", "project_id", "date", "start_time", "end_time")
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
router.get('/', (req, res) => {
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

//GET PROJECT IDs AND NAMES
router.get('/projects', (req, res) => {
  console.log('/entries/projects GET');
  pool.query(`SELECT * FROM "projects";`)
    .then((results) => {
      res.send(results.rows);
    })
    .catch((error) => {
      console.log('Error retrieving projects');
      res.sendStatus(500);
    })
})//end GET

//DELETE TIME ENTRY
router.delete('/', (req, res) => {
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

module.exports = router;
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


//POST new project
router.post('/', (req, res) => {
  console.log('req.body:', req.body);
  pool.query(`INSERT INTO "projects" ("name")
	            VALUES ($1)`, [req.body.name])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('Error adding entry to database.', error);
      res.sendStatus(500);
    })//end pool query
})//end POST

//GET projects
router.get('/', (req, res) => {
  pool.query(`SELECT "projects"."id", "projects"."name",  SUM(("entries"."end_time" - "entries"."start_time")) as "duration"
              FROM "projects"
              LEFT JOIN "entries" ON "projects"."id" = "entries"."project_id"
              GROUP BY "projects"."id";`)
  .then((results) => {
    res.send(results.rows);
  })
  .catch((err) => {
    console.log('Error retrieving projects:', err);
    res.sendStatus(500);
  });//end query
})//end GET

//DELETE project
router.delete('/', (req, res) => {
  console.log('/projects DELETE');
  pool.query(`DELETE FROM "projects" WHERE "id" = $1`, [req.query.id])
    .then(() => {
      console.log('Project deleted');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('Error deleting project', error);
      res.sendStatus(500);
    })//end query
})//end DELETE

module.exports = router;
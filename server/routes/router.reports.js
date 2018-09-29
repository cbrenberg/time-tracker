const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/projects', (req, res) => {
  console.log('/reports/projects GET');
  pool.query(`SELECT "projects"."id", "projects"."name",  SUM(("entries"."end_time" - "entries"."start_time")) as "duration"
              FROM "projects"
              LEFT JOIN "entries" ON "projects"."id" = "entries"."project_id"
              GROUP BY "projects"."id";`)
    .then((results) => {
      console.log('back from /reports/projects with', results.rows);
      res.send(results.rows);
    })
    .catch((error) => {
      console.log('Error getting project summary data', error);
      res.sendStatus(500);
    })
})


router.get('/tasks', (req, res) => {
  console.log('/reports/tasks GEt');
  pool.query(`SELECT "entries"."id", "entries"."name", "entries"."date", ("entries"."end_time" - "entries"."start_time") as "duration" , "projects"."name" as "project"  
              FROM "entries"
              JOIN "projects" ON "projects"."id" = "entries"."project_id";`)
    .then((results) => {
      console.log('back from /reports/tasks with', results.rows);
      res.send(results.rows);
    })
    .catch((error) => {
      console.log('Error getting task data', error);
      res.sendStatus(500);
    })
})




module.exports = router;
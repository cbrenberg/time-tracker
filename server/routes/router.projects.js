const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


//POST NEW TIME ENTRY
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

module.exports = router;
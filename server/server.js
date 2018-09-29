//requires
const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
//const url = require('url'); //required for heroku config later
//require routers here
const entries = require('./routes/router.entries');
const projects = require('./routes/router.projects');
const reports = require('./routes/router.reports')


//globals
const app = express();
const PORT = process.env.PORT || 5000;

//uses
app.use(bodyParser.json());
app.use(express.static('server/public'));

//routes
app.use('/entries', entries);
app.use('/projects', projects);
app.use('/reports', reports);

//spin up server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
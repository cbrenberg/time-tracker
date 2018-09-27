const pg = require('pg');
//url parsing for heroku config - uncomment next line to enable
// const url = require('url')


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

module.exports = pool;
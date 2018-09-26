//requires
const express = require('express');
const bodyParser = require('body-parser');
//require routers here


//globals
const app = express();
const PORT = process.env.PORT || 5000;

//uses
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('server/public'));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})
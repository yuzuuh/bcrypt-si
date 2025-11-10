'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const fccTesting = require('./freeCodeCamp/fcctesting.js');
const bcrypt = require('bcrypt'); // <= requerido tal cual
const app = express();
const cors = require('cors');
app.use(cors());
fccTesting(app);

const saltRounds = 12;
const myPlaintextPassword = 'sUperpassw0rd!';
const someOtherPlaintextPassword = 'pass123';

//START_ASYNC -do not remove notes, place code between correct pair of notes.
bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
  if (err) console.error(err);
  else {
    console.log('Hash asíncrono:', hash);
    bcrypt.compare(myPlaintextPassword, hash, (err, result) => {
      console.log('Coincide (async)?', result);
    });
  }
});
//END_ASYNC

//START_SYNC
const hashSync = bcrypt.hashSync(myPlaintextPassword, saltRounds);
console.log('Hash síncrono:', hashSync);
const resultSync = bcrypt.compareSync(myPlaintextPassword, hashSync);
console.log('Coincide (sync)?', resultSync);
//END_SYNC

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Listening on port ' + PORT));


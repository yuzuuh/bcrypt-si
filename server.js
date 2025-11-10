'use strict';
const express     = require('express');
const bodyParser  = require('body-parser');
const fccTesting  = require('./freeCodeCamp/fcctesting.js');
const bcrypt      = require('bcrypt');
const app         = express();
const cors        = require('cors');
app.use(cors());
fccTesting(app);

const saltRounds = 12;
const myPlaintextPassword = 'sUperpassw0rd!';
const someOtherPlaintextPassword = 'pass123';

//START_ASYNC
bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Hash asíncrono:", hash);

    bcrypt.compare(myPlaintextPassword, hash, (err, res) => {
      if (err) console.error(err);
      else console.log("Coinciden (async):", res);
    });
  }
});
//END_ASYNC

//START_SYNC
try {
  const hashSync = bcrypt.hashSync(myPlaintextPassword, saltRounds);
  console.log("Hash síncrono:", hashSync);

  const result = bcrypt.compareSync(myPlaintextPassword, hashSync);
  console.log("Coinciden (sync):", result);
} catch (err) {
  console.error(err);
}
//END_SYNC

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log("Listening on port:", PORT);
});

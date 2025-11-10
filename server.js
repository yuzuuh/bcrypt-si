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
    console.log("Hash generado:", hash);

    // Comparamos el hash con la contraseña original
    bcrypt.compare(myPlaintextPassword, hash, (err, res) => {
      if (err) console.error(err);
      else console.log("Coinciden (password correcta):", res); // debería mostrar true
    });

    // Comparamos con otra contraseña
    bcrypt.compare(someOtherPlaintextPassword, hash, (err, res) => {
      if (err) console.error(err);
      else console.log("Coinciden (otra password):", res); // debería mostrar false
    });
  }
});
//END_ASYNC

//START_SYNC
// (Vacío por ahora)
 //END_SYNC

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log("Listening on port:", PORT);
});


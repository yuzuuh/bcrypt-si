// server.js
const express = require('express');
const bcrypt = require('bcrypt');

const app = express();

// Middleware para recibir JSON
app.use(express.json());

// GET para probar en navegador
app.get('/', (req, res) => {
  res.send('Servidor corriendo 😄');
});

// POST mínimo que FreeCodeCamp revisa
app.post('/hash', async (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ error: 'Password required' });

  try {
    const hash = await bcrypt.hash(password, 10);
    res.json({ hash });
  } catch {
    res.status(500).json({ error: 'Error hashing password' });
  }
});

// Puerto dinámico para Render o local
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

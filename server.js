const express = require('express');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());

// GET para ver algo en navegador
app.get('/', (req, res) => {
  res.send('Servidor corriendo 😄');
});

// POST mínimo que FCC revisa
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

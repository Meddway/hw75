const express = require('express');
const app = express();
const port = 8000;
const Vigenere = require('caesar-salad').Vigenere;

app.use(express.json());

app.post('/encode', (req, res) => {
  const { password, message } = req.body;
  const encodedMessage = Vigenere.Cipher(password).crypt(message);
  res.json({ encoded: encodedMessage });
});

app.post('/decode', (req, res) => {
  const { password, message } = req.body;
  const decodedMessage = Vigenere.Decipher(password).crypt(message);
  res.json({ decoded: decodedMessage });
});

app.listen(port, () => {
  console.log('Server online on ' + port);
});

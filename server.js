const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;


// Static dosyaları sunma
app.use(express.static('public'));

// Soruları JSON dosyasından okuma
app.get('/api/questions', (req, res) => {
  fs.readFile('./data/questions.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Sorular yüklenemedi!');
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});

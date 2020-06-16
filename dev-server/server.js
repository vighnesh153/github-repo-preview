const PORT = 4242;
const HOST = `http://localhost:${PORT}`;

const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers',
    'Content-Type, Authorization');
  next();
});

app.get('/content', (req, res) => {
  res.send(Math.random().toString());
});

const getFile = () => {
  const isDir = Math.random() < 0.5;
  const name = isDir ? 'Directory' : 'File';
  const type = isDir ? 'dir' : 'file';
  const download_url = isDir ? null : HOST + '/content';
  const url = isDir ? HOST + '/files' : null;

  return { name, type, url, download_url };
};

app.get('/files', (req, res) => {
  const result = [];
  const count = Math.floor(Math.random() * 10) + 3;
  for (let i = 0; i < count; i++) {
    result.push(getFile());
  }
  res.json(result);
});

app.listen(PORT, () => {
  console.log('Listening on port: ' + PORT);
});

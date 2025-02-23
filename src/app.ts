import express from 'express';
import connectDB from './db';
const app = express();
const port = 3000;

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Listening at http://localhost:${port}`);
});
import express from 'express';
import connectDB from './db';
import notesRoute from './notesRoute';
import bodyParser from 'body-parser';
const app = express();
const port = 3000;

connectDB();

app.use(bodyParser.json());
app.use('/notes', notesRoute);

app.listen(port, () => {
  return console.log(`Listening at http://localhost:${port}`);
});
import express from 'express';
import connectDB from './db';
import NotesController from './controller';
const app = express();
const port = 3000;

connectDB();

app.get('/', 
  NotesController.getNotes
);

app.listen(port, () => {
  return console.log(`Listening at http://localhost:${port}`);
});
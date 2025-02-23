import express, { Express, Request, Response, NextFunction } from 'express';
import connectDB from './db';
import notesRoute from './notesRoute';
import bodyParser from 'body-parser';
const app: Express = express();
const port = 3000;

connectDB();

app.use(bodyParser.json());
app.use('/notes', notesRoute);

// catch-all route handler
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(500);
  const err = new Error(`Can't find ${req.originalUrl}`);
  next(err);
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error); // Log the error for debugging
  res.status(500).json({ message: error.message }); // Respond with the error message
});

app.listen(port, () => {
  return console.log(`Listening at http://localhost:${port}`);
});
import app from "./app";
import connectDB from "./db";
import 'dotenv/config';

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Listening at http://localhost:${process.env.PORT}`);
});
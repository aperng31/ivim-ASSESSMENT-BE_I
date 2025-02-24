import app from "./app";
import connectDB from "./db";
const PORT = 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
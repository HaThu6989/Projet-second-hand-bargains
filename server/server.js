import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import UserRoute from "./routes/user.routes.js";
import ProductRoute from "./routes/product.routes.js";

dotenv.config();
const { FRONTEND_URL, MONGODB_URL, PORT } = process.env;

const app = express();

app.use(
  cors({
    credentials: true,
    origin: FRONTEND_URL,
  })
);

app.use(express.json());

mongoose
  .connect(MONGODB_URL)
  .then(() => console.log("Connected to MongoDB", MONGODB_URL))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send(`<h1>Home</h1>`);
});

app.use("/user", UserRoute);
app.use("/product", ProductRoute);

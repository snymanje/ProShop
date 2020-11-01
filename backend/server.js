import express from "express";
import dotenv from "dotenv";
import "colors";
import connectDB from "./config/db.js";
import products from "./data/products.js";

dotenv.config();

const app = express();

connectDB();

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((product) => product._id === req.params.id);
  res.json(product);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend is running on PORT ${PORT} in ${process.env.NODE_ENV} mode.`.bgBlue.bold);
});

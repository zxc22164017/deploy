const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./route").auth;
const picRouter = require("./route").picture;

mongoose
  .connect("mongodb://127.0.0.1/memeDB")
  .then(() => {
    console.log("connect to mongoDB successfully");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", authRoute);
app.use("/picture", picRouter);

app.listen(8080, () => {
  console.log("server run on port 8080");
});

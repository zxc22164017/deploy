const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./route").auth;
const picRouter = require("./route").picture;
const corsOptions = {
  origin: "http://localhost:3000", // frontend URI (ReactJS)
};
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("connect to mongoDB successfully");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", authRoute);
app.use("/picture", picRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("server run on port" + PORT);
});

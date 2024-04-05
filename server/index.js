const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./route").auth;
const picRouter = require("./route").picture;
const corsOptions = {
  //deployment
  origin: "https://picturefront.onrender.com", // frontend URI (ReactJS)
};
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("connect to mongoDB successfully");
  })
  .catch((e) => {
    console.log(e);
  });

app.use(cors(corsOptions)); //delpoyment
// app.use(cors()); //local test
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", authRoute);
app.use("/picture", picRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("server run on port" + PORT);
});

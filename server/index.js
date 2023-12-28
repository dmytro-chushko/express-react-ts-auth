require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const router = require("./router");

const PORT = process.env.PORT || 5000;
const HOST_DB = process.env.HOST_DB || "";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api", router);

const start = async () => {
  try {
    await mongoose.connect(HOST_DB);

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();

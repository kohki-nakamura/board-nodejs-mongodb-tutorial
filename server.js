const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 3000;
const Thread = require("./models/Thread");

app.use(express.json()); // 忘れがちなので注意
app.use(express.static("public"));

/* データベース接続 */
require('dotenv').config();
const password = process.env.MONGO_DB_PASSWORD
mongoose.connect(
  `mongodb+srv://mongo:${password}@cluster0.xzqeh8f.mongodb.net/threads?retryWrites=true&w=majority`
).then(
  () => console.log("データベース接続に成功しました")
).catch(
  (err) => console.log(err)
);

app.get("/api/v1/threads", async(req, res) => {
  try {
    const threads = await Thread.find({});
    res.status(200).json(threads);
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/v1/threads", async(req, res) => {
  try {
    const createThread = await Thread.create(req.body);
    res.status(200).json(createThread);
  } catch (err) {
    console.log(err);
  }
  });

app.listen(PORT, console.log("server running"));
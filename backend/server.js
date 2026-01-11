const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/editor");

const DocSchema = new mongoose.Schema({
  content: String
});
const Doc = mongoose.model("Doc", DocSchema);

// Get document
app.get("/doc", async (req, res) => {
  let doc = await Doc.findOne();
  if (!doc) {
    doc = await Doc.create({ content: "" });
  }
  res.json(doc);
});

// Save document
app.post("/doc", async (req, res) => {
  await Doc.updateOne({}, { content: req.body.content });
  res.send("Document saved");
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});

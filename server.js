const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.mongourl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log("db connected");

const FormSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const FormData = mongoose.model("FormData", FormSchema);

app.post("/submit", (req, res) => {
  const newFormData = new FormData({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });

  newFormData
    .save()
    .then(() => res.status(200).json({ message: "Data saved successfully" }))
    .catch((err) => res.status(400).json({ error: "Unable to save data" }));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

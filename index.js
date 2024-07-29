const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost/qna-responses", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Mongoose Schema and Model
const responseSchema = new mongoose.Schema({
  questionId: String,
  answer: String,
  textAnswer: String,
  timestamp: { type: Date, default: Date.now },
});
const Response = mongoose.model("Response", responseSchema);

// Define Routes
app.post("/api/submit-response", async (req, res) => {
  const { questionId, answer, textAnswer } = req.body;
  try {
    const newResponse = new Response({ questionId, answer, textAnswer });
    await newResponse.save();
    res.status(201).send("Response saved");
  } catch (error) {
    res.status(500).send("Error saving response");
  }
});

app.get("/api/log-click", (req, res) => {
  console.log("Link was clicked");
  res.status(200).send("Click logged");
});

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

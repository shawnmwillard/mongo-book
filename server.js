const express = require("express");
const app = express();

const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("./routes"));

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/pizzahunt",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// For development
mongoose.set("debug, true");

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));

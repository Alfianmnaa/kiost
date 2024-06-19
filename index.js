const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors"); // Add CORS package

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Endpoint to save data to data.json
app.get("/", (req, res) => {
  res.send("Hello");
});
app.post("/save-data", (req, res) => {
  const newData = req.body;
  const file = path.join(__dirname, "../public/script/data.json");

  fs.readFile(file, (err, data) => {
    if (err) {
      console.error("Failed to read data.json:", err);
      res.status(500).send("Failed to save data");
      return;
    }

    let jsonData = JSON.parse(data);
    jsonData.push(newData);

    fs.writeFile(file, JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.error("Failed to write to data.json:", err);
        res.status(500).send("Failed to save data");
        return;
      }
      res.status(200).send("Data saved successfully");
    });
  });
});

// Running the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors"); // Add CORS package

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
const corsOption = {
  origin: ["https://kiost.netlify.app", "https://kiost.netlify.app/", "https://kiost.vercel.app/", "http://localhost:5173", "http://localhost:3000", "http://localhost:4000"],
  credentials: true,
};

app.use(cors(corsOption));
// Endpoint to save data to data.json
app.get("/", (req, res) => {
  res.send("Hello");
});
app.post("/save-data", (req, res) => {
  const newData = req.body;
  const file = path.join(__dirname, "../public/script/data.json");
  console.log("Received data:", newData);

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

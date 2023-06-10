const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/fetch-file", async (req, res) => {
  try {
    const { url } = req.query;
    const response = await axios.get(url);
    res.send(response.data);
  } catch (error) {
    console.log("Fetch Error:", error);
    res.status(500).send("Error fetching the file");
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require("express");
const axios = require("axios"); // Import the Axios library

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  // Set the CORS headers to allow any origin
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/fetch-file", async (req, res) => {
  try {
    const { url } = req.query; // Get the 'url' query parameter
    const response = await axios.get(url); // Fetch the file using Axios
    res.send(response.data); // Send the file content as the response
  } catch (error) {
    console.log("Fetch Error:", error);
    res.status(500).send("Error fetching the file"); // Send an error response if there's an error fetching the file
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const express = require("express");
const mongoose = require("mongoose");
const Furniture = require("./models/furniture");
const cors = require("cors"); // Import the cors package
const fs = require("fs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Middleware

app.use(express.json());
app.use(cors());
// Routes
app.get("/upload", async (req, res) => {
  try {
    // Read the JSON file
    const rawData = fs.readFileSync("furnitureData.json");
    const data = JSON.parse(rawData);

    // Convert price to integer
    data.forEach((item) => {
      item.price = parseInt(item.price.replace(",", ""), 10); // Remove comma and parse to integer
    });

    // Insert data into MongoDB
    await Furniture.insertMany(data);
    res.status(201).send("Data uploaded successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});
app.get("/rem", async (req, res) => {
  try {
    await Furniture.updateMany(
      { category: { $regex: /red\s/i } }, // Match documents with category containing "red "
      { $set: { category: { $regexFindAndReplace: { input: "$category", regex: "red ", replacement: "", options: "i" } } } }
    )
    .then((result) => {
      console.log(`${result.nModified} documents updated successfully.`);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    res.send("done");
  } catch (error) {
    console.log(error);
    res.send('fail')
  }
});
app.post("/filter", async (req, res) => {
  console.log("in");
  try {
    const { color, category, minPrice, maxPrice } = req.body;

    // Build filter query
    const filter = {};
    if (color) filter.color = color;
    if (category) filter.category = category;
    if (
      minPrice !== undefined &&
      minPrice !== null &&
      maxPrice !== undefined &&
      maxPrice !== null
    ) {
      filter.price = { $gte: minPrice || 0, $lte: maxPrice };
    } else if (minPrice !== undefined && minPrice !== null) {
      filter.price = { $gte: minPrice };
    } else if (maxPrice !== undefined && maxPrice !== null) {
      filter.price = { $lte: maxPrice };
    }
    console.log(filter);

    // Query MongoDB using filter
    const result = await Furniture.find(filter);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db,js");
const bodyParser = require("body-parser");
const foodRouter = require("./routes/foodRoute");
const userRouter = require("./routes/userRoute");
const dotenv = require("dotenv");
const cartRouter = require("./routes/cartRoute");
const orderRouter = require("./routes/orderRoute");

dotenv.config();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT;

// Enable CORS for all routes
app.use(cors());

// Connect to MongoDB
connectDB();

// API ENDPOINT
app.use("/images", express.static("uploads"));
app.use("/api/v1/food", foodRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/order", orderRouter);

// Middleware

app.get("/", (req, res) => {
  res.send("API WRKING");
});

app.listen(PORT, () => {
  console.log(`Start running at http://localhost:${PORT}`);
});

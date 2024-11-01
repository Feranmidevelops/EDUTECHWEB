const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const authRoute = require("./src/routes/auth.route");
const userRoute = require("./src/routes/user.route");
const documentRoute = require("./src/routes/document.route");
const PORT = process.env.PORT || 4000;

const app = express();

// Convert data into JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(express.static(path.join(__dirname, "../frontend/public")));

// Set up path to access view folder and set ejs as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "frontend", "views"));

// Route handling
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/documents", documentRoute); // Ensure this route is correctly defined

app.get("/", (req, res) => {
  res.render("home");
});

// Error handling middleware (optional, but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Connect to Mongo Database
console.log(process.env.DB_URL);
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to MongoDB", { connectTimeoutMS: 30000 });
  })
  .catch((err) => {
    console.error("Error connecting to database", err.message);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

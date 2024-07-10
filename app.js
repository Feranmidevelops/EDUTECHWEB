const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();
const authRoute = require("./src/routes/auth.route");
const userRoute = require("./src/routes/user.route");
const PORT = process.env.PORT | 3000;

const app = express();

//convert data into json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//set up path to access view folder and set ejs at view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home");
});

//middleware for routes that begin with /auth
app.use("/api/auth", authRoute);
app.use("/api", userRoute);

//runs if undefined routes are acessed
app.all("*", (req, res, next) => {
  res.send("This route doesn't exist");
});

//connect to Mongo Databas
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to database", err.message);
  });

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
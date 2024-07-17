const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
require("dotenv").config();
const authRoute = require("./src/routes/auth.route");
const userRoute = require("./src/routes/user.route");
const PORT = process.env.PORT | 3000;

const app = express();

//convert data into json
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
app.use(express.static(path.join(__dirname, "public")));

//set up path to access view folder and set ejs at view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home");
});

//middleware for routes that begin with /auth
app.use("/auth", authRoute);
app.use("/user", userRoute);

//runs if undefined routes are acessed
app.all("*", (req, res, next) => {
  res.redirect("/");
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

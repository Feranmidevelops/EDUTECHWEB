const express = require("express");
const path = require("path");
require('dotenv').config()
const authRoute = require("./src/routes/auth.route");
const PORT = process.env.PORT | 3000;

const app = express();

//convert data into json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//set up path to access view folder and set ejs at view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("login");
});

//middleware for routes that begin with /auth
app.use("/auth", authRoute);

//runs if undefined routes are acessed
app.all("*", (req, res, next) => {
  res.send("This route doesn't exist");
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

const mongoose = require('mongoose');
//connect to Mongo Database

const mongoConnection = mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to monogDB", err.message);
  });

  module.exports = mongoConnection
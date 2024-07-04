const mongoose = require("mongoose");

//connect to the database
const {mongoConnection} = require("../../config")
mongoConnection()

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  }
});

const User = new mongoose.model("User", userSchema);

module.exports = User;

const express = require('express');
const path = require('path');
const crypt = require('bcrypt');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();


app.set('view engine', 'ejs');
//static file for css(but e no fine i no wan use am.)
//app.use(express.static("login.ejs"));
app.set('views', path.join(__dirname, 'views'))





app.get("/", (req, res) =>{
    res.render("login");
});




app.get('/login', (req, res) => {
    const messages =  {
      error: 'Invalid username or password'
    };
    res.render('/login', { messages });
  });
  


app.get("/register", (req, res) =>{
    res.render("register");
});


app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
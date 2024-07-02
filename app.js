const express = require('express');
const path = require('path');
const crypt = require('bcrypt');
const mongoose = require('mongoose');
const session = require('express-session');
const collection = require("./config");



const app = express();
//convert data into json 
app.use(express.json());

app.use(express.urlencoded({extended: false}));


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


//register user
app.post("/register", async (req, res) => {
  const data = {
    name: req.body.username,
    email: req.body.email,
    password: req.body.password
  }
  
  //if user exists
  const existingUser = await collection.findOne({email: data.email});

  if(existingUser) {
    res.send("user already exists, try another email");
  }else {
    //hashing password using bcrypt
    const saltRounds = 10; //numbber of round for bcrypt
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    data.password = hashedPassword; 
    //replace real pw with hash

  const userdata = await collection.insertMany(data);
  console.log(userdata);
  }


} );


app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
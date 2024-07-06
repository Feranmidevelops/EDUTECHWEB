// this logic registers and adds data to database
exports.registerUser = async (req, res) => {
    // const data = {
  //   name: req.body.username,
  //   email: req.body.email,
  //   password: req.body.password,
  // };

  // //if user exists
  // const existingUser = await collection.findOne({ email: data.email });

  // if (existingUser) {
  //   res.send("user already exists, try another email");
  // } else {
  //   //hashing password using bcrypt
  //   const saltRounds = 10; //numbber of round for bcrypt
  //   const hashedPassword = await bcrypt.hash(data.password, saltRounds);
  //   data.password = hashedPassword;
  //   //replace real pw with hash

  //   const userdata = await collection.insertMany(data);
  //   console.log(userdata);
  // }
  console.log("Registering user...");
};

//this logic checks user data and logs user in
exports.loginUser = async (req, res) => {
  console.log("Registering user...");
};

//this logic renders a register form
exports.registerForm = async (req, res) => {
  res.render("register");
  console.log("Fetching the register form...");
};

//this logic renders a login form
exports.loginForm = async (req, res) => {
  res.render("login")
  console.log("Fetching the login form...");
};

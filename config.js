const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb+srv://workwithferanmi:pKQH95ePA6g9R6Kn@edutechweb.fioi5un.mongodb.net/?appName=edutechweb" ,); 

// check if its working

connect.then(() => {
    console.log('database connected successfully');
});
.catch(() => {
    console.log('database cant be connected');
});

//schema

const LoginSchema = new mongoose.Schema({
    name: {
        type: string,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


//collect
const collection = new mongoose.model('users', LoginSchema);








/*
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://workwithferanmi:pKQH95ePA6g9R6Kn@edutechweb.fioi5un.mongodb.net/?appName=edutechweb";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    
    await client.connect();
    
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

    await client.close();
  }
}
run().catch(console.dir);
*/

const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.pathname || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();


// middleware
app.use(cors());
app.use(express.json());



// Home 
app.get('/', (req, res) => {
   res.send("Sectors server is running")
})



// console.log(process.env.DB_PASSWORD);
// MongoDB 
// const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.guif9pr.mongodb.net/?retryWrites=true&w=majority`;
const uri = "mongodb+srv://Users_Details:PfuESfXbEBGQpYTS@cluster0.guif9pr.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
   try {
      const usersCollection = client.db('Users_Details').collection('userInfo');
      const sectorsCollection = client.db('Users_Details').collection('sectors');

      app.post('/users', async (req, res) => {
         const body = req.body;
         const result = await usersCollection.insertOne(body);
         res.send(result)
      })
      app.get('/allSectors', async (req, res) => {
         const query = {};
         const sectors = await sectorsCollection.find(query).toArray();
         res.send(sectors)
      })
   }
   finally { }
}
run().catch(er => console.log(er))






app.listen(port, () => {
   console.log("Port is", port);
})


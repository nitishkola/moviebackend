const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();

app.use(cors()); // Enable CORS
app.use(express.json());

const client = new MongoClient('mongodb+srv://admin:admin1610@cluster0.iwtqpst.mongodb.net/?retryWrites=true&w=majority');
client.connect();
const db = client.db('counselling');
const col = db.collection('register');

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Check if user exists
      const user = await usersCollection.findOne({ username, password });
      if (!user) {
        return res.status(401).send('Invalid username or password');
      }
  
      // Set session or JWT token for authentication
      // For simplicity, let's assume setting a session cookie
      // req.session.user = user;
      res.send('Login successful');
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).send('Error logging in');
    }
  });

app.post('/register', async (req, res) => {
    try {
        await col.insertOne(req.body); // Wait for insertion to complete
        res.send('Inserted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/retrieve', async (req, res) => {
    
        const result = await col.find().toArray(); // Wait for data retrieval to complete
        console.log(result);
        res.send(result);
})
app.put('/users/:id',async (req,res)=>{
    const {id}=req.params
    const {name, role, email, password}=req.body
    const result= col.updateOne({_id: new ObjectId(id)},
    {$set: {name, role, email, password}})
    res.send('updated')
}
    )
app.delete('/users/:id',async(req,res)=> {
    const {id}=req.params
    const result= await col.deleteOne({_id: new ObjectId(id)})
    res.json({message:"deleted Successfully"})
})

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/about', (req, res) => {
    res.send('<h1>Hello World</h1>');
});

app.listen('8080', () => {
    console.log('Server is Running');
});


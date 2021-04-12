const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()

app.use(cors());
app.use(bodyParser.json());

const port = 5000;

console.log(process.env.DB_PASS
    )
app.get('/', (req, res) => {
res.send('Hello World!')
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wthiz.mongodb.net/doctorsPortal?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const AppointmentCollection = client.db("doctorsPortal").collection("appointments");
app.post('/addAppointment',(req, res)=>{
    const appointment = req.body;
    AppointmentCollection.insertOne(appointment)
    .then( result => {
        res.send(result.insertedCount> 0)
    })
})


})

app.listen(process.env.PORT || port)

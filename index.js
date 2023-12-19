const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const multer  = require('multer');
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const uri = "mongodb+srv://nazrul08:mother08@cluster0.6u8iq.mongodb.net/volunteer?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const app = express();
app.use(fileUpload());
app.use(cors());
app.use(bodyParser.json());
const pass = "mother08";


app.get('/',(req,res) => {
    res.send("Assalamualaikum")
})

client.connect(err => {
  const collection = client.db("volunteer").collection("user");
  const volunteerCollection = client.db("volunteer").collection("addVolunteer");
  // perform actions on the collection object

// app.post('/addUser',(req,res) =>{
//   collection.insertMany(req.body)
//   .then(result => console.log("inserted successfully"))
// })




  app.get('/getService',(req,res) =>{
    collection.find({})
    .toArray((err,documents)=>{
        res.send(documents);
    })
  })

 app.post('/addVolunteer',(req,res) => {

   volunteerCollection.insertOne(req.body)
   .then(result =>{
     res.send(result)
   })
 })


 app.get('/getRegisteredService',(req,res)=>{

   volunteerCollection.find({email:req.query.email})
   .toArray((err,documents)=>{
     res.send(documents)
   })
 })

 
 app.delete('/deleteService/:id', function (req, res) {
  const serviceId = req.params.id;
  volunteerCollection.deleteOne({
    
    _id:ObjectId(`${serviceId}`) 
  })
  .then(function(result) {
    res.send(result.deletedCount>0)
    console.log(result)
  })
})

app.get('/getAllServices',(req,res)=>{

  volunteerCollection.find({})
  .toArray((err,documents)=>{
    res.send(documents)
  })
})



app.post('/uploadWithFile',(req,res)=>{
     
 const sampleFile = req.files.myFile;
 const uploadPath ='uploads/image' + sampleFile.name;
 sampleFile.mv(uploadPath, function(err) {
  if (err){
    console.log("upload failed");
  }else{
    const event = {
      img:sampleFile.name
    }
    volunteerCollection.insertOne(event)
   .then(result =>{
     console.log("inserted Successfully");
   })
  }
});
})


});



app.listen(5000,()=>console.log("Alhamdulillah"))
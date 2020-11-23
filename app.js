const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Port = process.env.Port|| 5000;

mongoose.connect('mongodb://localhost:27017/myapp', {
    useNewUrlParser: true,
useCreateIndex:true,
useUnifiedTopology:true,

});
const connection = mongoose.connection;
connection.once("open",()=>{
    console.log('mongo db connected22');
});

//middleware
app.use(express.json());
const userRoute =require("./routes/user");
app.use("/user", userRoute);

app.route("/").get((req,res)=>res.json("your first res api23"));

app.listen(Port,()=> console.log("your server run 5000"));

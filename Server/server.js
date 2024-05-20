const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const Router = require('./Routes/user.routes');
require('dotenv').config();
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false}));

// Server connection:
app.use(Router);
// app.use(express.json())

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    try{
        console.log(`Server listening on ${PORT} port..!`);
    }catch(error){
        console.log(`Server having error : ${error}`);
    }
});


// MongoDB connection:

const connectMongoDB = async () =>{
    const uri = process.env.DB_URL;
    try{
       await mongoose.connect(uri);
       console.log(`MongoDB connected successfully..!`);
    }catch(error){
       console.log(`MongoDB having connecting issue : ${error}`);
    }

}; connectMongoDB();

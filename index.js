const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
// to use content in env file
require('dotenv').config()
//intialiazing app of express
const app = express();
const cors = require('cors');
 const corsOptions = {
     origin:'*',
     methods:'GET,HEAD,PUT,PATCH,POST,DELETE',
     allowHeaders: 'Content-Type, Authorization'
}

app.use(cors(corsOptions));
 
app.use(bodyParser.json())
 
// connect to database
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true,useUnifiedTopology: true})
 
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Database connection successful!'));
 
//connecting the routes

const blogRouter = require('./routes/user');
app.use('/api/v1/blog/', blogRouter);
 
app.listen(process.env.PORT || 3000, ()=> console.log(`Server is running on port ${process.env.PORT || 3000}`))
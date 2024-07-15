const mongoose = require('mongoose');
 
const blogSchema = new mongoose.Schema({
    Blog_Title:{
        type: String,
        required :true
    },
    Description:{
        type: String,
        required:true
    },
    Author_Name:{
        type:String,
        required:true
    }
 
},  {timestamps: true} )
module.exports = mongoose.model('Blog',blogSchema);
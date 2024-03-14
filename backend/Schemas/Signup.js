const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const SignupSchema = new mongoose.Schema({

    email:{
         type:String,
         required:true
    },

    fullname:{
        type:String,
        required:true
   },

   username:{
    type:String,
    required:true
   },

   password:{
    type:String,
    required:true
   },

   profilephoto:{
    type:String
   },


    followers:[{
        type:ObjectId,
        ref:'SignupUsers'
    }],
    
    following:[{
        type:ObjectId,
        ref:'SignupUsers'
    }],

    
})

const SignupModel = mongoose.model('SignupUsers',SignupSchema);
module.exports = SignupModel;

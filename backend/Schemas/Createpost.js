const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types

const CreatepostSchema = new mongoose.Schema({

    title:{
        type: String,
    },

    image:{
        type: String,
        required: true
    },

    location:{
        type: String,
    },

    timestamp:{
        type: String,
    },

    likes:[{
        type: ObjectId,
        ref: "SignupUsers"
    }],

    comments:[{
        comment: {type:String},
        postedBy:{
            type: ObjectId,
            ref: "SignupUsers"
        }
    }],

    postedBy:{
       type: ObjectId,
       ref: "SignupUsers"
    }
    
},{timestamps:true})

const CreatepostModel = mongoose.model('Createdposts',CreatepostSchema);
module.exports = CreatepostModel;

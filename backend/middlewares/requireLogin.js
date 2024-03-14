const jwt = require('jsonwebtoken');
const Jwt_secret = 'jafgjsgjgvsvh';
const mongoose = require('mongoose');
const SignupModel = require('../Schemas/Signup');


module.exports = (req,res,next) => {
  
    const { authorization } = req.headers;
    if(!authorization){
        return res.status(401).json({error:'You must be logged in 1'})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,Jwt_secret,(err, payload) => {
        if(err){
            return res.status(401).json({error:'You must be logged in 2'})
        }
        const {_id} = payload
        SignupModel.findById(_id).then(userData=>{
            req.user = userData
            next()
        })
    })
    
}


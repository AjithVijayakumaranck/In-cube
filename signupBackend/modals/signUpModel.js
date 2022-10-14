const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const joi = require('joi')
const passwordComplexity = require('joi-password-complexity')
const { type } = require('@testing-library/user-event/dist/type')
const ObjectId = mongoose.Schema.ObjectId
const submited = new mongoose.Schema({  });

const signUpTemplate = new mongoose.Schema({
firstName:{
    type:String,
    required:true
},
lastName:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
},
LatestForm:{
    type:ObjectId,
},
// SubmitedForm:{

// }
// ,
date:{
    type:Date,
    default:Date.now()
}
});

signUpTemplate.methods.generateAuthToken=()=>{
  const token = jwt.sign({
    _id:this._id
  },process.env.JWTPRIVATEKEY,{
    expiresIn:"7d"
  })
  return token
}

const User=mongoose.model('users',signUpTemplate)

const validate=(data)=>{
    const schema=joi.object({
        firstName:joi.string().required().label('First Name'),
        lastName:joi.string().required().label('Last Name'),
        lastName:joi.string().required().label('Email'),
        password:joi.string().required().label('Password'),
    });
    return schema.validate(data)
}


module.exports={User,validate};

 
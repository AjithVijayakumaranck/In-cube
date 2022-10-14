const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.ObjectId


const incubationForm = new mongoose.Schema({
name:{
    type:String,
    required:true
},
address:{
    type:String,
    required:true
},
city:{
    type:String,
    required:true
},
state:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
phoneNumber:{
    type:String,
    required:true
},
companyName:{
    type:String,
    required:true
},
backGround:{
    type:String,
    required:true
},
applicantId:{
    type:ObjectId,
    required:true
},
products:{
    type:String,
    required:true
},
problem:{
    type:String,
    required:true
},
solution:{
    type:String,
    required:true
},
vProposition:{
    type:String,
    required:true
},
Incubation:{
    type:String,
    required:true
},
companyLogo:{
    type:String,
    required:true
},
pendingstatus:{
    type:Boolean,
    default:true
},
approvestatus:{
    type:Boolean,
    default:false
},
declinestatus:{
    type:Boolean,
    default:false
},
slotstatus:{
    type:Boolean,
    default:false
},
latest:{
    type:Boolean,
    default:true
},
date:{
    type:Date,
    default:Date.now()
}
},
{ timestamps: true }
);



const Incubation=mongoose.model('Applicants',incubationForm)

module.exports={Incubation};

 
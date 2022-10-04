const express =require('express')
const bcrypt =require('bcrypt')
const router =express.Router()
const {User,validate} = require('../modals/signUpModel')
const { route } = require('./auth')



router.post('/signup',async (req,res)=>{
    // console.log(req.body);
try {
    const {error}=validate(req.body);
    if(error){
   console.log('error is here');
   const {User,validate} = require('../modals/signUpModel')
    }
    const user=await User.findOne({email:req.body.email})
    if(user){
    return res.status(409).send({message:"User with given email already exist"} )
 }

    const saltPassword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(req.body.password,saltPassword)
    const signedUpUser= await new User({
              firstName:req.body.firstName,
              lastName:req.body.lastName,
              email:req.body.email,
              password:securePassword
    })
    console.log(signedUpUser);
    signedUpUser.save().then(data => {
        console.log(data);
 res.status(201).send({message:"user created successfully"});

}).catch(e=>{
        console.log('boommmaaaaa');
        console.log(e);
        res.status(500).send({message:"internal server error"});
        res.json(e)
    })
} catch (error) {
    console.log(error);
}
})

router.post('/applicationlist',(req,res)=>{
    res.json('hellodude')
})

module.exports=router
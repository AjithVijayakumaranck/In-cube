const router = require("express").Router()
const bcrypt =require("bcrypt")
const {User} = require('../modals/signUpModel')
const {Incubation} = require('../modals/incubationForm')
const joi = require('joi')
const jwt = require("jsonwebtoken")
const oneday = 1000*60*60*24
const multer = require('multer')
const { response } = require("express")
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("stage 1");
        cb(null, 'b')
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + '--' + file.originalname)
    }
})
const upload = multer({ storage: fileStorageEngine })

const  {countc1,countr1,countr2} = require('../rows')

router.post('/fetchrow',(req,res)=>{
    res.json({countc1,countr1,countr2})
})
router.post('/bookingSeat',async (req,res)=>{
    console.log(req.body);
    console.log(countr1.length);
    const applicant=await Incubation.findOne({_id:req.body.booking[0]})
    // console.log(req.body.booking[0],user);
if(req.body.booking.length != 0){
    for(let i=0;i<countr1.length;i++){
        if(countr1[i].seatNumber==req.body.seatno){
           console.log(countr1[i],"helo google");
           countr1[i].occupied=true
           countr1[i].occupiedBy=applicant.companyName
           console.log(countr1[i]);
           await Incubation.updateOne({_id:req.body.booking[0]},{
            $set:{
            slotstatus:true
            }
           })
           res.json({status:true,message:"Slot Booked",countc1,countr1,countr2})
        }
       }
 
}else{
    res.json({message:"select a company"})
}
})


router.post('/formsubmited',(req,res)=>{
    console.log(req.body,"helooo");
    Incubation.find({ applicantId:req.body.userId }).sort({
        createdAt: -1}).limit(1).then((response)=>{
        console.log(response);
        res.json(response[0])
    })
})

// router.get('/token',(req,res)=>{
//     console.log(req.header);
// })

router.post('/viewForm',(req,res)=>{
    console.log(req.body);
  Incubation.findOne({_id:req.body.applicant_id}).then((response)=>{
    res.status(200).json({response})
  }
  )
})

router.post("/login",async(req,res)=>{


       console.log(req.body,"hello google");
       const user = await User.findOne({email:req.body.email})
       console.log(user);
       if(user){
        const validPassword= await bcrypt.compare(req.body.password,user.password)
        if(validPassword){

          const token = jwt.sign({
                firstName:user.firstName,
                lastName:user.lastName,
                email:user.email,
            },process.env.JWTPRIVATEKEY,{
                expiresIn:oneday
            });

        res.status(200).json({token,user});

        }else{
            return res.status(401).send({message:"invalid Email or Password"} )
        }
       }

})

router.post("/test",upload.single("logo"),async(req,res)=>{

    // const {Incubation, Incubation, Incubation} = require('../modals/incubationForm')
    console.log(req.body,"have a nice daty");  
    console.log(req.file);  

    const IncubationForm = await new Incubation({
        name:req.body.name,
        address:req.body.address,
        city:req.body.city,
        state:req.body.state,
        email:req.body.email,
        phoneNumber:req.body.phoneNumber,
        companyName:req.body.companyName,
        backGround:req.body.backGround,
        products:req.body.products,
        problem:req.body.problem,
        solution:req.body.solution,
        vProposition:req.body.vPropostion,
        Incubation:req.body.incubation,
        companyLogo:req.file.filename,
        applicantId:req.body.applicantId,
        pendingstatus:true,
        approvestatus:false,
        declinestatus:false
        })
       
 IncubationForm.save().then((data)=>{
    console.log(data,"he is yout data");
    // console.log("successfully applied");
    res.json('gg')
 })

})
router.post('/applicationlist',async (req,res)=>{
    // console.log('code is here');
    const datas=await Incubation.find({approvestatus:true,declinestatus:false,slotstatus:false})
    console.log(datas);
    res.status(200).json(datas)
})
router.post('/declinedlist',async (req,res)=>{
    console.log('code is here');
    const datas=await Incubation.find({approvestatus:false,declinestatus:true,slotstatus:false})
    console.log(datas);
    res.status(200).json(datas)
})
router.post('/allocatedlist',async (req,res)=>{
    console.log('code is here');
    const datas=await Incubation.find({approvestatus:true,declinestatus:false,slotstatus:true})
    console.log(datas);
    res.status(200).json(datas)
})

router.post('/pendinglist',async (req,res)=>{
    console.log('code is here');
    const datas=await Incubation.find({pendingstatus:true,latest:false})
    console.log(datas);
    res.status(200).json(datas)
})
router.post('/latestlist',async (req,res)=>{
    console.log('code is here');
    const datas=await Incubation.find({latest:true})
    console.log(datas,"helloo");
    res.status(200).json(datas)
})
router.post('/approve_application',async (req,res)=>{
    console.log("have a nice day");
    // console.log(req.body.applicationID);
   Incubation.updateOne({_id:req.body.applicationID},{
    $set:{
        pendingstatus:false,
        approvestatus:true
    }
   }).then(async(response)=>{
    const datas=await Incubation.find({pendingstatus:true})
    res.status(200).json(datas)
    console.log(response);
   })
})
router.post('/decline_application',async (req,res)=>{
    console.log("have a noie day");
   Incubation.updateOne({_id:req.body.applicationID},{
    $set:{
        pendingstatus:false,
        approvestatus:false,
        declinestatus:true
    }
   }).then(async(response)=>{
    const datas=await Incubation.find({pendingstatus:true})
    res.status(200).json(datas)
    console.log(response);
   })
})
router.post('/notification',async (req,res)=>{
    console.log("have a noie day");
   Incubation.updateOne({_id:req.body.formId},{
    $set:{
       latest:false
    }
   }).then(async(response)=>{
   const datas=await Incubation.find({pendingstatus:true})
   const latest=await Incubation.find({latest:true})
    res.status(200).json({datas,latest})
    console.log(response);
   })
})

module.exports = router
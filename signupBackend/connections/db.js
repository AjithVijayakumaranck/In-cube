const mongoose = require('mongoose')

module.exports=()=>{
    const connectionParams={
        useNewUrlParser:true,
        useUnifiedTopology:true
    };
    try {
        mongoose.connect(process.env.DATABASE_ACCESS,connectionParams)
        console.log(":connected to database")
    } catch (error) {
        console.log(err);
    }
}
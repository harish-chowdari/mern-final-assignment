
const mongoose = require("mongoose")


const EmpSchema = mongoose.Schema({
    name :{
        type:String
    },
    email :{
        type:String
    },
    mobile :{
        type:Number
    },
    designation :{
        type:String
    }, 
    gender :{
        type:String
    },
    courses :{
        type:[String]
    },
    image :{
        type:String
    },
}, {timestamps : true})


module.exports = mongoose.model('EmpSchema', EmpSchema)
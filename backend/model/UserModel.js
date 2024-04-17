const mongoose = require("mongoose")


const MernSchema = mongoose.Schema({
    userName : {
        type:String
    },
    password : {
        type:String

    }
})


module.exports = mongoose.model("MernSchema", MernSchema)
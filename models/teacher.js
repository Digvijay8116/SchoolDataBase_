const mongoose = require("mongoose")


const teacherSchema = mongoose.Schema({
    name :{
        type:String,
        require:true
    },
    age :{ 
        type:Number,
        require :true
    },
    phoneNumber : {
        type : String,
        require : true
    },
    teacherId :{
        type:Number,
        require : true
    },
    expertIn :{
        type :String,
        require :true
    }
})

module.exports = mongoose.model("teachers",teacherSchema)
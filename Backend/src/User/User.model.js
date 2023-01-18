const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    first_name:{type:String,required:true},
    last_name:{type:String},
    id:{type:Number,required:true},
    tasks:{type:Array,default:[]},
    columns:{type:Array,default:[]},
})

const User=mongoose.model("user",userSchema)

module.exports=User
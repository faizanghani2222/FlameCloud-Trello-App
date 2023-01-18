const express=require("express")
const User = require("./User.model")

const app=express.Router()

app.post("/login",async(req,res)=>{
    try{
        let d=req.body
        let data=await User.findOne({id:d.id})
        if(data){
            console.log(data)
            res.send(data)
        }else{
            let u=new User(d)
            u=await u.save()
            res.send(u)
        }
        
    }catch(e){
        console.log(e)
        res.status(401).send({message:e})
    }
})


app.get("/",async(req,res)=>{
    try{
        let data=await User.find()
        res.send(data)
    }catch(e){
        res.status(401).send({error:e})
    }
})

module.exports=app
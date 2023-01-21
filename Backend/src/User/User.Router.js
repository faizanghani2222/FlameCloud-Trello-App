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


app.patch("/updateTask",async(req,res)=>{
    try{
        let {id,status,task,title}=req.body
        let t=await User.findOne({id:id})
        let data=t.tasks
        let check=[]
        data=data.filter((el)=>{
            if(el.title!==task){
                return el
            }else{
                check.push(el)
            }
        })
        if(check.length>0){
            let d={
                title,
                status
            }
            data.push(d)
            let updated=await User.findOneAndUpdate({id:id},{tasks:data})
            res.send(updated)
        }else{
            res.status(401).send({message:"error"}) 
        }
        
    }catch(e){
        res.status(401).send({message:"error",error:e}) 
    }
})


app.patch("/addTask",async(req,res)=>{
    try{
        let {id,status,title}=req.body
        let t=await User.findOne({id:id})
        let data=t.tasks
        let col=t.columns
       if(status && title){
        if(!col.includes(status)){
            col.push(status)
        }
      
        let d={
            title,
            status
        }
        data.push(d)
        let updated=await User.findOneAndUpdate({id:id},{tasks:data,columns:col})
        res.send(updated) 
       }else{
        res.status(401).send({message:"error"}) 
       }
        
    }catch(e){
        res.status(401).send({message:"error",error:e}) 
    }
})


app.patch("/deleteTask",async(req,res)=>{
    try{
        let {id,title}=req.body
        let t=await User.findOne({id:id})
        let data=t.tasks
        data=data.filter((el)=>{
            if(el.title!==title){
                return el
            }
        })
        let updated=await User.findOneAndUpdate({id:id},{tasks:data})
        res.send(updated) 
        
    }catch(e){
        res.status(401).send({message:"error",error:e}) 
    }
})


module.exports=app
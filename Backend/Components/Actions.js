const User = require("../src/User/User.model")


const addColumn=async(id,query)=>{
    try{
        let t=await User.findOne({id:id})
        let col=t.columns
        let name=query[1]
        if(!col.includes(name)){
            col.push(name)
        }
        let updated=await User.findOneAndUpdate({id:id},{columns:col})
        return {message:"success"}
    }catch(e){
        return {message:"error"}
    }
}

const removeColumn=async(id,query)=>{
    try{
        let t=await User.findOne({id:id})
        let data=t.tasks
        let col=t.columns
        let status=query[1]
        data=data.filter((el)=>{
            if(el.status.toLowerCase()!==status.toLowerCase()){
                return el
            }
        })
        col=col.filter((el)=>{
            if(el.toLowerCase()!==status.toLowerCase()){
                return el
            }
        })
        let updated=await User.findOneAndUpdate({id:id},{tasks:data,columns:col})
        return {message:"success"}
    }catch(e){
        return {message:"error"}
    }
    }

const addTask=async(id,query)=>{
try{
    let t=await User.findOne({id:id})
    let data=t.tasks
    let col=t.columns
    let status=query[1]
    if(!col.includes(status)){
        col.push(status)
    }
    query.shift()
    query.shift()
    query=query.join(" ")
    let d={
        title:query,
        status
    }
    data.push(d)
    let updated=await User.findOneAndUpdate({id:id},{tasks:data,columns:col})
    return {message:"success"}
}catch(e){
    return {message:"error"}
}
}



const changeStatus=async(id,query)=>{
    try{
        let t=await User.findOne({id:id})
        let data=t.tasks
        let status=query[1] 
        query.shift()
        query.shift()
        query=query.join(" ")
        let check=[]
        data=data.filter((el)=>{
            if(el.title!==query){
                return el
            }else{
                check.push(el)
            }
        })
        if(check.length>0){
            let d={
                title:query,
                status
            }
            data.push(d)
            let updated=await User.findOneAndUpdate({id:id},{tasks:data})
            return {message:"success"}
        }else{
            return {message:"error"}
        }
        
    }catch(e){
        return {message:"error"}
    }
}


const deleteTask=async(id,query)=>{
    try{
        let t=await User.findOne({id:id})
        let data=t.tasks
        query.shift()
        query=query.join(" ")
        data=data.filter((el)=>{
            if(el.title!==query){
                return el
            }
        })
        let updated=await User.findOneAndUpdate({id:id},{tasks:data})
        return {message:"success"}
    }catch(e){
        return {message:"error"}
    }
    }



module.exports={addColumn,removeColumn,addTask,changeStatus,deleteTask}
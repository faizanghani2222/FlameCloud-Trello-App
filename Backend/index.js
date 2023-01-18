const TelegramBot = require('node-telegram-bot-api')
const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const bodyParser=require("body-parser")
const userRouter=require("./src/User/User.Router")
const { addTask, deleteTask, addColumn, removeColumn, changeStatus } = require('./Components/Actions')
require('dotenv').config();
const Promise = require('bluebird');
  Promise.config({
    cancellation: true
  });

const app=express();

const port=process.env.PORT || 8080
const Database=process.env.DATABASE
const token=process.env.TOKEN

// telegram bot 


const telegramBot = new TelegramBot(token, { polling: true })



telegramBot.on('message', (msg) => {
    const id = msg.chat.id;
    let query=msg.text.split(" ")

    if(query[0]==="/addColumn"){

        addColumn(id,query).then((res)=>{
            if(res.message==="success"){
                telegramBot.sendMessage(id, 'Column added successfully');
               }else{
                telegramBot.sendMessage(id, 'Failed to add column try again command-> /addColumn Column-Name');
               }
           })

    }else if(query[0]==="/removeColumn"){
    
        removeColumn(id,query).then((res)=>{
        if(res.message==="success"){
            telegramBot.sendMessage(id, 'Removed Column Successfully');
           }else{
            telegramBot.sendMessage(id, 'Failed to add task try again command-> /removeColumn Column-Name');
           }
       })

    }else if(query[0]==="/addTask"){
    
        addTask(id,query).then((res)=>{
        if(res.message==="success"){
            telegramBot.sendMessage(id, 'Added Task Successfully');
           }else{
            telegramBot.sendMessage(id, 'Failed to add task try again command-> /addTask Column-Name Task-Title');
           }
       })

    }else if(query[0]==="/changeTaskStatus"){

        changeStatus(id,query).then((res)=>{
            if(res.message==="success"){
                telegramBot.sendMessage(id, 'Changed Task Status Successfully');
               }else{
                telegramBot.sendMessage(id, 'Failed to add change task status try again command-> /changeTaskStatus Column-Name Task-Title');
               }
           })

    }else if(query[0]==="/deleteTask"){

        deleteTask(id,query).then((res)=>{
            if(res.message==="success"){
                telegramBot.sendMessage(id, 'Task deleted successfully');
               }else{
                telegramBot.sendMessage(id, 'Failed to delete task status try again command-> /deleteTask Task-Title');
               }
           })

    }else if(query[0]==="/help"){
        telegramBot.sendMessage(id, "Welcome User, we are happy to assist you :) the  bot command for updating Trello Board are:- \n For adding new task --> /addTask Column-Name Task-Title \n For changing task status --> /changeTaskStatus Column-Name Task-Title \n For deleting a task --> /deleteTask Task-Title \n For Adding a column --> /addColumn Column-Name \n For deleting a column --> /removeColumn Column-Name");
    }
    
    else{
        telegramBot.sendMessage(id, 'Welcome User, we are happy to assist you :) Enter /help for info about commands or enter command to edit your Trello Board');
    }
    
    
  });



// express app for api


app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use("/user",userRouter)

app.listen(port,async ()=>{
    await mongoose.connect(Database);
    console.log("started")
})

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

telegramBot.onText(/\/start/, (msg) => {
     const id = msg.chat.id;
  telegramBot.sendMessage(id, "Welcome User, we are happy to assist you :) the  bot command for updating Trello Board are:- \n \n For adding new task --> \n /addTask Column-Name Task-Title \n \n For changing task status --> \n /changeTaskStatus Column-Name Task-Title \n \n For deleting a task --> \n /deleteTask Task-Title \n \n For Adding a column --> \n /addColumn Column-Name \n \n For deleting a column --> \n /removeColumn Column-Name");
});

telegramBot.on('message', (msg) => {
    const id = msg.chat.id;
    let query=msg.text.split(" ")

    if(query[0]==="/addColumn"){

        addColumn(id,query).then((res)=>{
            if(res.message==="success"){
                telegramBot.sendMessage(id, 'Column added successfully');
               }else{
                telegramBot.sendMessage(id, 'Failed to add column try again command-> \n /addColumn Column-Name');
               }
           })

    }else if(query[0]==="/removeColumn"){
    
        removeColumn(id,query).then((res)=>{
        if(res.message==="success"){
            telegramBot.sendMessage(id, 'Removed Column Successfully');
           }else{
            telegramBot.sendMessage(id, 'Failed to remove column try again command-> \n /removeColumn Column-Name');
           }
       })

    }else if(query[0]==="/addTask"){
    
        addTask(id,query).then((res)=>{
        if(res.message==="success"){
            telegramBot.sendMessage(id, 'Added Task Successfully');
           }else{
            telegramBot.sendMessage(id, 'Failed to add task try again command-> \n /addTask Column-Name Task-Title');
           }
       })

    }else if(query[0]==="/changeTaskStatus"){

        changeStatus(id,query).then((res)=>{
            if(res.message==="success"){
                telegramBot.sendMessage(id, 'Changed Task Status Successfully');
               }else{
                telegramBot.sendMessage(id, 'Failed to add change task status try again command-> \n /changeTaskStatus Column-Name Task-Title');
               }
           })

    }else if(query[0]==="/deleteTask"){

        deleteTask(id,query).then((res)=>{
            if(res.message==="success"){
                telegramBot.sendMessage(id, 'Task deleted successfully');
               }else{
                telegramBot.sendMessage(id, 'Failed to delete task status try again command-> \n /deleteTask Task-Title');
               }
           })

    }else if(query[0]==="/help"){
        telegramBot.sendMessage(id, "Welcome User, we are happy to assist you :) the  bot command for updating Trello Board are:- \n \n For adding new task --> \n /addTask Column-Name Task-Title \n \n For changing task status --> \n /changeTaskStatus Column-Name Task-Title \n \n For deleting a task --> \n /deleteTask Task-Title \n \n For Adding a column --> \n /addColumn Column-Name \n \n For deleting a column --> \n /removeColumn Column-Name");
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

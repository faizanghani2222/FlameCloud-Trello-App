import { Box, Button, ButtonGroup, Heading, Input, Spinner, useDisclosure, } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../Context/AppContext';
import Navbar from '../Components/Navbar';
import { Navigate } from 'react-router-dom';
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from 'axios';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'

function Dashboard(props) {

    const {data,setData}=useContext(AppContext)
    const [loading,setLoading]=useState(false)
    const [add,setAdd]=useState({})
    const [edit,setEdit]=useState({})
    const [deleteTask,setDelete]=useState("")
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen:eisOpen, onOpen:eonOpen, onClose:eonClose } = useDisclosure()
    const { isOpen:disOpen, onOpen:donOpen, onClose:donClose } = useDisclosure()


    const handleRefresh=()=>{
        setLoading(true)
        axios.post("https://flamecloud-trello-backend.onrender.com/user/login",data).then((res)=>{
            setLoading(false)
            setData(res.data)
        }).catch((err)=>{
            console.log(err)
            setLoading(false)
        })
    }

   const handleEditChange=(e)=>{
    let {name,value}=e.target
    setEdit({
        ...edit,
        [name]:value
    })
   }

   const handleChange=(e)=>{
    let {name,value}=e.target
    setAdd({
        ...add,
        [name]:value
    })
   }


   const handleAdd=()=>{
    if(add.title && add.status){
        let info=add
        info.id=data.id
        axios.patch("https://flamecloud-trello-backend.onrender.com/user/addTask",info).then((res)=>{
       handleRefresh()
       onClose()
    }).catch((err)=>{
        console.log(err)
        onClose()
    })
    }else{
        alert("Enter task details to add task or use our bot")
        onClose()
    }
    
   }

   const handleEdit=()=>{
    
    if(edit.task || edit.status){
        let info=edit
        if(!info.title){
            info.title=info.task
        }
        info.id=data.id
        axios.patch("https://flamecloud-trello-backend.onrender.com/user/updateTask",info).then((res)=>{
        handleRefresh()
        
        onClose()
        }).catch((err)=>{
            console.log(err)
            onClose()
        })
    }else{
        onClose()
        alert("Enter task details to update task or use our bot")
    }
    
   }

   const handleDelete=()=>{
    if(deleteTask){
        let info={}
        info.id=data.id
        info.title=deleteTask
        axios.patch("https://flamecloud-trello-backend.onrender.com/user/deleteTask",info).then((res)=>{
        handleRefresh()
        onClose()
        }).catch((err)=>{
            console.log(err)
            onClose()
        })
    }else{
        onClose()
        alert("No task selected try again or use our bot")
    }
    
   }
   

    

    if(loading){

        return ( <Box w="60%" m="auto" mt="40vh" textAlign="center">
         <Spinner
             thickness='4px'
             speed='0.65s'
             emptyColor='gray.200'
             color='blue.500'
             size='xl'
             />
         </Box>)

    }else{

        if(data.id){
        
            return (
                <Box w="100%" minHeight="100vh" bgImage="url('https://c4.wallpaperflare.com/wallpaper/81/59/648/android-lollipop-material-design-wallpaper-preview.jpg')" bgRepeat="repeat">
                    <Navbar/>
                    <Box mt="30px" display="flex" justifyContent="space-between" paddingX="5%">
                        <Heading fontSize="18px" fontWeight="400">You can edit this board with <strong>@flamecloudTrelloBot</strong> on Telegram</Heading>
                        <Button onClick={handleRefresh}>Refresh List</Button></Box>
                    <Box background={"transparent"} w="90%" m="auto" mt="30px" display="grid" gridTemplateColumns="repeat(3,1fr)" gap="20px">
                       {data && data.columns.map((el)=>{
                        return  <Box background="white" key={el} minHeight={"300px"}>
                        <Heading width="100%" fontWeight="400" textAlign="center" py="10px" >{el}</Heading>
                        <Button width="100%"  onClick={()=>{onOpen();setAdd({...add,status:el})} }>Add Task +</Button>
                        {data.tasks.filter((ele)=>{
                            if(ele.status===el){
                                return ele
                            }
                        }).map((elem,i)=>{
                            return <Box key={i} width="90%" m="auto" py="10px" borderBottom="1px solid gray" display="flex" alignItems="center" justifyContent={"space-between"}>
                                <Heading fontSize="21px"  fontWeight="400" >{elem.title}</Heading>
                                <ButtonGroup>
                                <Button variant="ghost" onClick={()=>{eonOpen();setEdit({...edit,task:elem.title,status:el})}}><FiEdit/></Button>
                                <Button variant="ghost" onClick={()=>{donOpen();setDelete(elem.title)}}><RiDeleteBin6Line/></Button>
                                </ButtonGroup>

                                </Box>
                        })}
                           
                    </Box>
                       })}


                       {/* Modal for adding task */}
                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                            <ModalHeader>Add Task</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Input name="title" onChange={(e)=>handleChange(e)} type="text" placeholder='Edit Task Title'/>
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme='blue' mr={3} onClick={handleAdd}>
                                Add
                                </Button>
                                <Button  onClick={onClose} variant='ghost'>Cancel</Button>
                            </ModalFooter>
                            </ModalContent>
                        </Modal>


                       {/* Modal for editing task */}
                        <Modal isOpen={eisOpen} onClose={eonClose}>
                            <ModalOverlay />
                            <ModalContent>
                            <ModalHeader>Edit Task</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                               <Input name="title" onChange={(e)=>handleEditChange(e)} type="text" placeholder='Edit Task Title'/>
                               <Input name="status" onChange={(e)=>handleEditChange(e)} type="text" placeholder='Edit Task Status'/>

                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme='yellow' mr={3} onClick={()=>handleEdit()}>
                                Edit
                                </Button>
                                <Button variant='ghost' onClick={eonClose}>Cancel</Button>
                            </ModalFooter>
                            </ModalContent>
                        </Modal>

                       {/* Modal for deleting task */}
                        <Modal isOpen={disOpen} onClose={donClose}>
                            <ModalOverlay />
                            <ModalContent>
                            <ModalHeader>Delete Task</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                               Confirm to delete the task
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme='red' mr={3} onClick={()=>handleDelete()}>
                                Confirm Delete
                                </Button>
                                <Button variant='ghost' onClick={donClose}>Cancel</Button>
                            </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </Box>

                </Box>
            );
        }else{

            return <Navigate to="/" />

           }
    }

}

export default Dashboard;
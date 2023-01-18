import { Box, Button, Heading, Spinner, } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../Context/AppContext';
import Navbar from '../Components/Navbar';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard(props) {

    const {data,setData}=useContext(AppContext)
    const [loading,setLoading]=useState(false)

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
                <>
                    <Navbar/>
                    <Box mt="30px" display="flex" justifyContent="space-between" paddingX="5%">
                        <Heading fontSize="18px" fontWeight="400">You can edit this board with <strong>@flamecloudTrelloBot</strong> on Telegram</Heading>
                        <Button onClick={handleRefresh}>Refresh List</Button></Box>
                    <Box w="90%" m="auto" mt="30px" display="grid" gridTemplateColumns="repeat(3,1fr)" gap="20px">
                       {data && data.columns.map((el)=>{
                        return  <Box border="1px solid gray" minHeight={"300px"}>
                        <Heading width="100%" fontWeight="500" textAlign="center" py="10px" borderBottom="1px solid gray">{el}</Heading>
                        
                        {data.tasks.filter((ele)=>{
                            if(ele.status===el){
                                return ele
                            }
                        }).map((elem)=>{
                            return <Heading fontSize="21px" marginX="30px" py="15px" fontWeight="400" borderBottom="1px solid gray">{elem.title}</Heading>
                        })}
                           
                    </Box>
                       })}
                    </Box>
                </>
            );
        }else{

            return <Navigate to="/" />

           }
    }

}

export default Dashboard;
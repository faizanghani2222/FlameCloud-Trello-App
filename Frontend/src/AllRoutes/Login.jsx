import { Box, Heading, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TelegramLogin from '../Components/TelegramLogin';
import { AppContext } from '../Context/AppContext';


function Login() {
     const {data,setData}=useContext(AppContext)
     const navigate=useNavigate()
     const [loading,setLoading]=useState(false)

    const handleUser=(user)=>{    
        setLoading(true)
        axios.post("https://flamecloud-trello-backend.onrender.com/user/login",user).then((res)=>{
            localStorage.setItem("flameCloudToken",res.data.id)
            setLoading(false)
            setData(res.data)
            navigate("/dashboard")
        }).catch((err)=>{
            console.log(err)
            setLoading(false)
            alert("Login Failed Try again")
        })
            
    }


   const handlePageRefresh=(id)=>{
    let obj={id:id}
    setLoading(true)
        axios.post("https://flamecloud-trello-backend.onrender.com/user/login",obj).then((res)=>{
            setLoading(false)
            setData(res.data)
            navigate("/dashboard")
        }).catch((err)=>{
            console.log(err)
            setLoading(false)
            alert("Login Failed Try again")
        })
    }


    useEffect(()=>{
        if(!data.id){
            let id=localStorage.getItem("flameCloudToken")
            if(id){
                handlePageRefresh(id)
            }
        }
    },[])

    if(loading===true){

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

            return (
                <Box width="100%" backgroundColor="#54A9EB" minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
                    <Box width="40%" background="white" borderRadius={"1.5em"} display="flex" flexDirection="column"  alignItems="center" paddingTop="5vh" height="50vh" gap="10vh">
                    
                        <Heading fontWeight="500" textAlign="center">FlameCloud Trello Login</Heading>
                
                        <TelegramLogin
                            botName="flamecloudTrelloBot"
                            dataOnauth={(user) => handleUser(user)}
                        />
                
                    </Box>
                </Box>
            );

        }

    
}

export default Login;
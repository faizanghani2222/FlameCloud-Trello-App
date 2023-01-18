import { Box, Heading, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TelegramLogin from '../Components/TelegramLogin';
import { AppContext } from '../Context/AppContext';


function Login() {
     const {setData}=useContext(AppContext)
     const navigate=useNavigate()
     const [loading,setLoading]=useState(false)

    const handleUser=(user)=>{    
        setLoading(true)
        axios.post("https://flamecloud-trello-backend.onrender.com/user/login",user).then((res)=>{
            setLoading(false)
            setData(res.data)
            alert("Login Successfull")
            navigate("/dashboard")
        }).catch((err)=>{
            console.log(err)
            setLoading(false)
            alert("Login Failed Try again")
        })
            
    }

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
                    
                        <Heading>FlameCloud Trello</Heading>
                
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
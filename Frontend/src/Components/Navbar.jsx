import { Box, Button, Heading } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { AppContext } from '../Context/AppContext';

function Navbar(props) {

    const {data,setData}=useContext(AppContext)

    const handleLogout=()=>{
        setData({})
        localStorage.removeItem("flameCloudToken")
    }

    return (
        <Box width={"100%"} px="5%" height="70px" color="white" background="#54A9EB" display={"flex"} justifyContent="space-between" alignItems={"center"}>
       
        <Heading fontWeight="500px"> Welcome, {data.first_name}</Heading>
        <Heading alignSelf="center" fontWeight="500px">FlameCloud Trello App</Heading>
        <Button variant={"outline"} onClick={handleLogout}>Logout</Button>
    </Box>
    );
}

export default Navbar;
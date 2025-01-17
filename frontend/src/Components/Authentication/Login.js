import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Link, Stack, VStack, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import AuthSocial from './AuthSocial';
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const history = useHistory();

    const handleClick = () => {
        setShow(!show);
        console.log(email);
        console.log(password);
    }

    const submitHandler = async () => {
        setLoading(true);
        if (!email || !password) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }

        // console.log(email, password);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                '/api/user/login',
                { email, password },
                config
            );

            console.log(JSON.stringify(data));
            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            history.push("/chats");
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast({
                    title: "Error Occurred!",
                    description: error.response.data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
            } else {
                toast({
                    title: "Error Occurred!",
                    description: "An unexpected error occurred.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
            }
            setLoading(false);
        }

    }
    return (
        // <Stack>
        //     New User?
        // </Stack>
        <VStack spacing='5px' >
            
            <FormControl id='loginEmail' isRequired>
                <FormLabel>Email</FormLabel>
                <Input placeholder='Enter Your Email' onChange={(e) => setEmail(e.target.value)} type='email' value={email} />
            </FormControl>

            <FormControl id='loginPassword' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input placeholder='Enter Your Password' onChange={(e) => setPassword(e.target.value)} type={show ? 'text' : 'password'} value={password} />
                    <InputRightElement width={'4.5rem'}>
                        <Button fontSize={25} backgroundColor={'inherit'} onClick={handleClick}>
                            {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <Button colorScheme='cyan' width={'100%'} style={{ marginTop: 15 }} onClick={submitHandler} isLoading={loading} textColor={'aliceblue'}>
                Login
            </Button>
            <Stack
                alignItems="flex-end"
                sx={{ my: 2 }}>
                {/* <Link
                    variant="body2"
                    color="inherit">
                    Forgot Password?
                </Link> */}
            </Stack>
            <AuthSocial />
            {/* <Button variant={'solid'} colorScheme='red' width={'100%'} style={{ marginTop: 15 }} onClick={() => {
                setEmail('guestexample@gmail.com')
                setPassword('123456')
            }}>
                Get Guest User Credentials
            </Button> */}
        </VStack>
    )
}

export default Login

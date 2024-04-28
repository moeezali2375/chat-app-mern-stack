import { useState } from "react";
import axios from "axios";
import { Button, Input, FormControl, FormLabel, FormErrorMessage, VStack } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";


const EmailForm = ({ user, close }) => {

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const toast = useToast();


    // const handleChange = async (query) => {
    //     setUsername(query);

    //     if (!query) {
    //         return;
    //     }


    // };

    const handleSubmit = async (e) => {
        console.log('submit')
        e.preventDefault();

        try {
            //   setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get(`/api/user/email`, { email }, config);
            // console.log("hehe");
            console.log(data);


            try {
                //   setLoading(true);

                const config = {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                };

                const { data } = await axios.put(`/api/user/email`, { email }, config);
                // console.log("hehe");
                console.log(data);


                toast({
                    title: "Email Changed Successfully",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
            } catch (error) {
                toast({
                    title: "Error Occured!",
                    // description: "Failed to Load the Search Results",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left",
                });
                console.log(error);
                setError("Username already exist!")
            }

            close();
        } catch (error) {
            toast({
                title: "Error Occured!",
                // description: "Failed to Load the Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
            console.log(error);
            setError("Username already exist!")
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
                <FormControl isRequired isInvalid={!!error}>
                    <FormLabel>New Email</FormLabel>
                    <Input type="email" value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <FormErrorMessage>{error}</FormErrorMessage>
                </FormControl>
                <Button type="submit">Submit</Button>
            </VStack>
        </form>
    )
}

export default EmailForm
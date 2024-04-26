import { useState } from "react";
import axios from "axios";
// import { Button, Input, FormControl, FormLabel, FormErrorMessage, Center, VStack ,} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";



const PasswordForm = ({ user, close }) => {

    const [oldPass, setOldPassword] = useState("");
    const [newPass, setNewPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState();
    const [error, setError] = useState("");
    const [showOldPass, setShowOldPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const toast = useToast();

    // const handleClick = () => setShow(!show);

    // const handleChange = async (query) => {
    //     setPassword(query);

    //     if (!query) {
    //         return;
    //     }


    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!oldPass || !newPass || !confirmPass) {
            toast({
              title: "Please Fill all the Feilds",
              status: "warning",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            return;
          }
          if (newPass !== confirmPass) {
            toast({
              title: "Passwords Do Not Match",
              status: "warning",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
            return;
          }

        try {
            //   setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.put(`/api/user/password`, { oldPass,newPass }, config);
            // console.log("hehe");
            console.log(data);

            toast({
                title: "Password Changed Successfully",
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
    };

    return (
        <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
                <FormControl isRequired isInvalid={!!error}>
                    <FormLabel>Current Password</FormLabel>
                    <InputGroup size="md">
                        <Input
                            value={oldPass}
                            onChange={(e) => setOldPassword(e.target.value)}
                            type={showOldPass ? "text" : "password"}
                            placeholder="Enter current password"
                        />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={()=>setShowOldPass(!showOldPass)}>
                                {showOldPass ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{error}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={!!error}>
                    <FormLabel>New Password</FormLabel>
                    <InputGroup size="md">
                        <Input
                            value={newPass}
                            onChange={(e) => setNewPassword(e.target.value)}
                            type={showNewPass ? "text" : "password"}
                            placeholder="Enter new password"
                        />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={()=>setShowNewPass(!showNewPass)}>
                                {showNewPass ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{error}</FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={!!error}>
                    <FormLabel>Confirm New Password</FormLabel>
                    <InputGroup size="md">
                        <Input
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(e.target.value)}
                            type={showNewPass ? "text" : "password"}
                            placeholder="Enter new password again"
                        />
                        <InputRightElement width="4.5rem">
                            <Button h="1.75rem" size="sm" onClick={()=>setShowNewPass(!showNewPass)}>
                                {showNewPass ? "Hide" : "Show"}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{error}</FormErrorMessage>
                </FormControl>
                <Button type="submit">Submit</Button>
            </VStack>
        </form>
    )
}

export default PasswordForm;
import { useState } from "react";
import { ViewIcon } from "@chakra-ui/icons";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    IconButton,
    Text,
    Image,
} from "@chakra-ui/react";

// import axios from "axios";
// import { Input, FormControl, FormLabel, FormErrorMessage, Center, VStack } from "@chakra-ui/react";
import EmailForm from './EmailForm'
import PasswordForm from './PasswordForm'


const FormModal = ({ user, children, type }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [username, setUsername] = useState("");
    const [error, setError] = useState("");

    // const handleChange = (event) => {
    //     setUsername(event.target.value);
    // };



    return (
        <>
            {children ? (
                <span onClick={onOpen}>{children}</span>
            ) : (
                <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
            )}
            <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent h="410px">
                    <ModalHeader
                        fontSize="40px"
                        fontFamily="Work sans"
                        d="flex"
                        justifyContent="center"
                    >
                        {type === 'password' ? 'Change Password' : 'Change Username'}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        d="flex"
                        flexDir="column"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        {type === 'email' &&

                            <Text
                                fontSize={{ base: "28px", md: "30px" }}
                                fontFamily="Work sans"
                            >
                                Current Email: {user.email}
                            </Text>
                        }
                        {type === 'password' ? <PasswordForm user={user} close={onClose} />
                            : <EmailForm user={user} close={onClose} />}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default FormModal;

import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  MenuItem,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import RatingReview from "./RatingReview"; // Adjust the import path accordi

const ReviewForm = ({ user }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0); // State for rating
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();

  const handleSubmit = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.post(
        "/api/review",
        { review, rating },
        config
      );

      setReview("");
      setRating(0);
      toast({
        title: "Review Submitted Successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setIsOpen(false);
    } catch (error) {
      setError("Failed to submit review");
      console.error("Error submitting review:", error);
    }
  };

  return (
    <>
      <MenuItem onClick={() => setIsOpen(true)}>Give Review</MenuItem>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Give Review</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              {/* Rating component */}
              <RatingReview rating={rating} setRating={setRating} />

              <FormControl isRequired isInvalid={!!error}>
                <FormLabel>Review</FormLabel>
                <Input
                  type="text"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                />
                <FormErrorMessage>{error}</FormErrorMessage>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={2} onClick={handleSubmit}>
              Submit
            </Button>
            <Button colorScheme="red" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReviewForm;

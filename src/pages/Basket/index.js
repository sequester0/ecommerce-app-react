import { Alert, Image, Button, Box, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { postOrder } from "../../api";
import { useBasket } from "../../contexts/BasketContext";

function Basket() {
    const [address, setAdress] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef()
    const { items, removeFromBasket, emptyBasket } = useBasket();

    const total = items.reduce((acc, item) => acc + item.price, 0);

    const handleSubmitForm = async() => {
        const itemIds = items.map(item => item._id);
        const input = {
            address,
            items: JSON.stringify(itemIds),
        }

        await postOrder(input);
        emptyBasket();
        onClose();
    }

  return (
    <Box p="5">
        {
            items.length < 1 && <Alert status="warning" borderRadius="lg">You have not any items in your basket.</Alert>
        }

        {
            items.length > 0 &&
            <>
                <ul style={{listStyleType: "decimal"}}>
                    {
                        items.map((item) => (
                            <li key={item._id} style={{marginBottom: 10}}>
                                <Link to={`/product/${item._id}`}>
                                    <Text fontSize="18">{item.title} - {item.price} TL</Text>
                                    <Image htmlWidth={200} src={item.photos[0]} loading="lazy" alt="basket item" />
                                </Link>

                                <Button colorScheme="red" mt="2" size="sm" mb="4" onClick={() => removeFromBasket(item._id)}>Remove from Basket</Button>
                                <hr />
                            </li>
                        ))
                    }
                </ul> 
                <Box mt="10">
                    Total: {total} TL
                </Box>

                <Button mt="2" size="sm" colorScheme="linkedin" onClick={onOpen}>Order</Button>
                <Modal
                  initialFocusRef={initialRef}
                  isOpen={isOpen}
                  onClose={onClose}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Order</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>

                      <FormControl>
                        <FormLabel>Address</FormLabel>
                        <Textarea ref={initialRef} placeholder='Address' value={address} onChange={ (e) => setAdress(e.target.value) } />
                      </FormControl>

                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme='blue' mr={3} onClick={handleSubmitForm}>
                        Order
                      </Button>
                      <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
            </>
        }
    </Box>
  )
}

export default Basket;
import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from '@chakra-ui/react';
import { useState } from 'react';

interface IAddPostModal {
  isOpen: boolean;
  onClose: () => void;
  createNewPostHandler: (post: string) => void;
}
function AddPostModal({
  isOpen,
  onClose,
  createNewPostHandler,
}: IAddPostModal) {
  const [value, setValue] = useState('');

  const confirmHandler = () => {
    createNewPostHandler(value);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormControl>
              <FormLabel>Post</FormLabel>
              <Textarea
                onChange={(e) => setValue(e.target.value)}
                value={value}
              />
            </FormControl>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button onClick={confirmHandler} variant="ghost">
            Secondary Action
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddPostModal;

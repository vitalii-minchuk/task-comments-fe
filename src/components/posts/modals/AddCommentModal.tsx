import { memo, useState } from 'react';
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

interface IAddCommentModal {
  isOpen: boolean;
  onClose: () => void;
  createNewCommentHandler: (comment: string) => void;
}
function AddCommentModal({
  isOpen,
  onClose,
  createNewCommentHandler,
}: IAddCommentModal) {
  const [value, setValue] = useState('');

  const confirmHandler = () => {
    createNewCommentHandler(value);
    onClose();
  };
  console.log('comment');
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor="gray.700">
        <ModalHeader>Comment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormControl>
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
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddCommentModal;

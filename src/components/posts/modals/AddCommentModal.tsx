import {
  Button,
  FormControl,
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
import ImageResize from '../../common/image-resize';

interface IAddCommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  createNewCommentHandler: (comment: string, image_url: string) => void;
}
function AddCommentModal({
  isOpen,
  onClose,
  createNewCommentHandler,
}: IAddCommentModalProps) {
  const [commentText, setCommentText] = useState('');
  const [image, setImage] = useState('');

  const confirmHandler = () => {
    createNewCommentHandler(commentText, image);
    onClose();
    setCommentText('');
    setImage('');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bgColor="gray.700">
        <ModalHeader>Comment</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Textarea
              onChange={(e) => setCommentText(e.target.value)}
              value={commentText}
            />
          </FormControl>

          <ImageResize setImage={setImage} />
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

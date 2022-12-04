import {
  Button,
  FormControl,
  FormErrorMessage,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SubmitTextForm, textValidationSchema } from '../../../validation';
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
  const [image, setImage] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubmitTextForm>({
    mode: 'onTouched',
    resolver: yupResolver(textValidationSchema),
  });

  const submitHandler = (data: SubmitTextForm) => {
    createNewCommentHandler(data.text, image);
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        reset();
      }}
    >
      <ModalOverlay />
      <ModalContent
        bgGradient="radial(gray.900, gray.700)"
        borderColor="transparent"
      >
        <ModalHeader>Comment</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(submitHandler)}>
          <ModalBody>
            <FormControl isInvalid={!!errors.text}>
              <Textarea id="text" {...register('text')} />
              <FormErrorMessage>
                {errors.text && errors.text.message}
              </FormErrorMessage>
            </FormControl>
            <ImageResize setImage={setImage} />
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                onClose();
                reset();
              }}
            >
              Close
            </Button>
            <Button type="submit" variant="ghost">
              Confirm
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default AddCommentModal;

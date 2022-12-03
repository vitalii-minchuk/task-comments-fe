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
import { useForm } from 'react-hook-form';

import { SubmitTextForm, textValidationSchema } from '../../../validation';

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
    createNewPostHandler(data.text);
    onClose();
    reset();
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
      <ModalContent bgColor="gray.700">
        <ModalHeader>Post</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit(submitHandler)}>
          <ModalBody>
            <FormControl isInvalid={!!errors.text}>
              <Textarea id="text" {...register('text')} />
              <FormErrorMessage>
                {errors.text && errors.text.message}
              </FormErrorMessage>
            </FormControl>
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

export default AddPostModal;

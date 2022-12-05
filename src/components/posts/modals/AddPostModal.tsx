import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { MessageType } from '../../../types';
import { SubmitTextForm, textValidationSchema } from '../../../validation';
import ImageResize from '../../common/image-resize';

interface IAddPostModal {
  isOpen: boolean;
  onClose: () => void;
  createNewPostHandler: ({ message, picture }: MessageType) => void;
}
function AddPostModal({
  isOpen,
  onClose,
  createNewPostHandler,
}: IAddPostModal) {
  const [image, setImage] = useState('');
  const {
    setValue,
    watch,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SubmitTextForm>({
    mode: 'onTouched',
    resolver: yupResolver(textValidationSchema),
  });

  const submitHandler = (data: SubmitTextForm) => {
    createNewPostHandler({ message: data.text, picture: image });
    onClose();
    reset();
  };

  useEffect(() => {
    register('text');
  }, [register]);

  const onEditorStateChange = (editorState: string) => {
    setValue('text', editorState);
  };

  const editorContent = watch('text');

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
            <ReactQuill
              theme="snow"
              value={editorContent}
              onChange={onEditorStateChange}
            />
            {errors.text && <Text color="red.500">{errors.text.message}</Text>}
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

export default AddPostModal;

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
    createNewCommentHandler(data.text, image);
    reset();
    onClose();
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
      <ModalContent
        bgGradient="radial(gray.900, gray.700)"
        borderColor="transparent"
      >
        <ModalHeader>Comment</ModalHeader>
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

export default AddCommentModal;

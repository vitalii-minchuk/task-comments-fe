import { Box, Button, useDisclosure } from '@chakra-ui/react';
import { memo } from 'react';

import {
  Post,
  useCreateNewCommentMutation,
} from '../../../apollo/generated/schema';
import CommentsSection from '../comments';
import AddCommentModal from '../modals/AddCommentModal';

interface IPostProps {
  post: Post;
}
function SinglePost({ post }: IPostProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [createNewComment] = useCreateNewCommentMutation();

  const createNewCommentHandler = (comment: string) => {
    createNewComment({
      variables: {
        input: {
          text: comment,
          postId: post.id,
        },
      },
    });
  };

  return (
    <>
      <Box border="1px solid white">
        {post.text} {post.user.username}
        <Button onClick={onOpen}>ok</Button>
      </Box>
      <CommentsSection postId={post.id} />
      <AddCommentModal
        createNewCommentHandler={createNewCommentHandler}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}

export default memo(SinglePost);

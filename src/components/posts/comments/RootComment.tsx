import { Box, Button, useDisclosure } from '@chakra-ui/react';

import {
  Comment,
  Post,
  useCreateNewCommentMutation,
} from '../../../apollo/generated/schema';
import AddCommentModal from '../modals/AddCommentModal';
import ListComments from './ListComments';

interface IRootComment {
  comment: Comment;
  postId: Post['id'];
}
function RootComment({ comment, postId }: IRootComment) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [createNewComment] = useCreateNewCommentMutation();

  const createNewCommentHandler = (newComment: string) => {
    createNewComment({
      variables: {
        input: {
          text: newComment,
          postId,
          parentId: comment.id,
        },
      },
    });
  };

  return (
    <>
      <Box>{comment.text}</Box>
      <Button onClick={onOpen}>ok</Button>
      <ListComments postId={postId} comments={comment.children} />
      <AddCommentModal
        createNewCommentHandler={createNewCommentHandler}
        onClose={onClose}
        isOpen={isOpen}
      />
    </>
  );
}

export default RootComment;

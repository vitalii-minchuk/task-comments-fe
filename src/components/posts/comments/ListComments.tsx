/* eslint-disable @typescript-eslint/no-use-before-define */
import { Box, Button, useDisclosure } from '@chakra-ui/react';

import {
  Comment,
  Post,
  useCreateNewCommentMutation,
} from '../../../apollo/generated/schema';
import AddCommentModal from '../modals/AddCommentModal';

interface ICommentProps {
  comment: Comment;
  postId: Post['id'];
}

function SingleComment({ comment, postId }: ICommentProps) {
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
      <Box>
        <Box>{comment.text}</Box>
        <Button onClick={onOpen}>ok</Button>
        {comment.children && comment?.children?.length > 0 && (
          <ListComments postId={postId} comments={comment.children} />
        )}
      </Box>
      <AddCommentModal
        createNewCommentHandler={createNewCommentHandler}
        onClose={onClose}
        isOpen={isOpen}
      />
    </>
  );
}

interface IListCommentsProps {
  comments: Array<Comment>;
  postId: Post['id'];
}
function ListComments({ comments, postId }: IListCommentsProps) {
  console.log('list', comments);
  return (
    <Box border="1px solid green">
      {comments?.map((comment) => (
        <SingleComment key={comment.id} postId={postId} comment={comment} />
      ))}
    </Box>
  );
}

export default ListComments;

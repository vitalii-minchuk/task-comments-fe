/* eslint-disable @typescript-eslint/no-use-before-define */
import { Box, Button, useDisclosure } from '@chakra-ui/react';

import {
  Post,
  useCreateNewCommentMutation,
} from '../../../apollo/generated/schema';
import { CommentWithChildren } from '../../../helpers/format-coments';
import AddCommentModal from '../modals/AddCommentModal';

interface ICommentProps {
  refetchComments: () => void;
  comment: CommentWithChildren;
  postId: Post['id'];
}

function SingleComment({ comment, postId, refetchComments }: ICommentProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [createNewComment] = useCreateNewCommentMutation({
    onCompleted() {
      refetchComments();
    },
  });

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
        <Box>
          {comment.text} {comment.user.username}
        </Box>
        <Button onClick={onOpen}>ok</Button>

        <ListComments
          refetchComments={refetchComments}
          postId={postId}
          comments={comment.children}
        />
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
  comments: Array<CommentWithChildren>;
  postId: Post['id'];
  refetchComments: () => void;
}
function ListComments({
  comments,
  postId,
  refetchComments,
}: IListCommentsProps) {
  return (
    <Box border="1px solid green" pl="15px">
      {comments?.map((comment) => (
        <SingleComment
          refetchComments={refetchComments}
          key={comment.id}
          postId={postId}
          comment={comment}
        />
      ))}
    </Box>
  );
}

export default ListComments;

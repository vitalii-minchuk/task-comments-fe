/* eslint-disable @typescript-eslint/no-use-before-define */
import { Box, Button, useDisclosure } from '@chakra-ui/react';

import {
  Comment,
  Post,
  useCreateNewCommentMutation,
  useGetAllPostCommentsQuery,
} from '../../../apollo/generated/schema';
import formatNestedComments from '../../../helpers/format-nested-comments';
import AddCommentModal from '../modals/AddCommentModal';

interface ICommentProps {
  comment: Comment;
  postId: Post['id'];
}

function SingleComment({ comment, postId }: ICommentProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [createNewComment] = useCreateNewCommentMutation();
  const { data } = useGetAllPostCommentsQuery({
    variables: {
      input: {
        postId,
      },
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

  console.log(comment);
  return (
    <>
      <Box>
        <Box>{comment.text}</Box>
        <Button onClick={onOpen}>ok</Button>
        {comment && (
          <ListComments
            postId={postId}
            comments={formatNestedComments({
              data: data?.getAllPostComments as Array<Comment>,
              id: comment.id || '',
            })}
          />
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
  return (
    <Box border="1px solid green" pl="15px">
      {comments?.map((comment) => (
        <SingleComment key={comment.id} postId={postId} comment={comment} />
      ))}
    </Box>
  );
}

export default ListComments;

import { Box, Button, Stack, useDisclosure } from '@chakra-ui/react';
import { Dispatch, memo, SetStateAction } from 'react';

import {
  Post,
  useCreateNewCommentMutation,
  useGetAllPostCommentsQuery,
} from '../../../apollo/generated/schema';
import Comment from '../comments/Comment';
import AddCommentModal from '../modals/AddCommentModal';

interface IPostProps {
  post: Post;
}
function SinglePost({ post }: IPostProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: allComments, refetch } = useGetAllPostCommentsQuery({
    variables: { input: { postId: post.id } },
  });
  const [createNewComment, { data: newComment }] = useCreateNewCommentMutation({
    onCompleted() {
      refetch();
    },
  });

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
        <Stack>
          {allComments?.getAllPostComments?.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </Stack>
      </Box>
      <AddCommentModal
        createNewCommentHandler={createNewCommentHandler}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}

export default memo(SinglePost);

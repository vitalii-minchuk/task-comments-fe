import { Box, Button, useDisclosure } from '@chakra-ui/react';
import { memo } from 'react';

import {
  Comment,
  Post,
  useCreateNewCommentMutation,
  useGetAllPostCommentsQuery,
} from '../../../apollo/generated/schema';
import CommentsSection from '../comments';
import AddCommentModal from '../modals/AddCommentModal';

interface IPostProps {
  post: Post;
}
function SinglePost({ post }: IPostProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: allComments, refetch } = useGetAllPostCommentsQuery({
    variables: { input: { postId: post.id } },
  });
  const [createNewComment] = useCreateNewCommentMutation({
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
      </Box>
      <CommentsSection
        postId={post.id}
        comments={allComments?.getAllPostComments as Array<Comment>}
      />
      <AddCommentModal
        createNewCommentHandler={createNewCommentHandler}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}

export default memo(SinglePost);

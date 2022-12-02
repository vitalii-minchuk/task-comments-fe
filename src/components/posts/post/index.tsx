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
  const { data, refetch: refetchComments } = useGetAllPostCommentsQuery({
    variables: {
      input: {
        postId: post.id,
      },
    },
  });

  const [createNewComment] = useCreateNewCommentMutation({
    onCompleted() {
      refetchComments();
    },
  });

  const createNewCommentHandler = (comment: string, image_url: string) => {
    createNewComment({
      variables: {
        input: {
          text: comment,
          image_url,
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
        refetchComments={refetchComments}
        comments={data?.getAllPostComments as Array<Comment>}
        postId={post.id}
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

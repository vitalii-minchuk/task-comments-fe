import { Box, Button, useDisclosure, useToast } from '@chakra-ui/react';
import moment from 'moment';
import parse from 'html-react-parser';

import { memo, useEffect } from 'react';

import {
  Comment,
  Post,
  useCreateNewCommentMutation,
  useGetAllPostCommentsQuery,
} from '../../../apollo/generated/schema';
import makeToast, { ToastStatus } from '../../../helpers/make-toast';
import CommentsSection from '../comments';
import AddCommentModal from '../modals/AddCommentModal';

interface IPostProps {
  post: Post;
}
function SinglePost({ post }: IPostProps) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, refetch: refetchComments } = useGetAllPostCommentsQuery({
    refetchWritePolicy: 'merge',
    variables: {
      input: {
        postId: post.id,
      },
    },
  });

  const [createNewComment, { error }] = useCreateNewCommentMutation({
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

  useEffect(() => {
    if (error?.message) {
      toast(
        makeToast({
          description: error.message,
          title: 'Create comment',
          status: ToastStatus.ERROR,
        })
      );
    }
  }, [error, toast]);

  return (
    <>
      <Box border="1px solid white">
        {parse(post.text)} {post.user.username}
        {moment(new Date(post?.createdAt)).fromNow()}
        {post.user.avatar && <img src={post.user.avatar} alt="avatar" />}
        {post.image_url && <img src={post.image_url} alt="some image" />}
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

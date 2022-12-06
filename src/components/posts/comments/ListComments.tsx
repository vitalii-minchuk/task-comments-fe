/* eslint-disable @typescript-eslint/no-use-before-define */
import { Box, Button, useDisclosure } from '@chakra-ui/react';

import {
  Post,
  useCreateNewCommentMutation,
} from '../../../apollo/generated/schema';
import { CommentWithChildren } from '../../../helpers/format-coments';
import { AddCommentAndPostTitleEnum, MessageType } from '../../../types';
import AddCommentAndPostModal from '../modal';

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

  const createMessageHandler = ({ message, picture }: MessageType) => {
    createNewComment({
      variables: {
        input: {
          text: message,
          image_url: picture,
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
        <img src={comment.image_url} alt="some images" />
        <Button onClick={onOpen}>ok</Button>

        <ListComments
          refetchComments={refetchComments}
          postId={postId}
          comments={comment.children}
        />
      </Box>
      <AddCommentAndPostModal
        title={AddCommentAndPostTitleEnum.Comment}
        createMessageHandler={createMessageHandler}
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
    <Box borderLeft="1px solid" borderColor="gray.600" pl="15px">
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

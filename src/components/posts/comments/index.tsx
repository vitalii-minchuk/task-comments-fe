import { memo, useMemo } from 'react';
import { Box } from '@chakra-ui/react';
import _filter from 'lodash.filter';
import _isNull from 'lodash.isnull';

import { Comment, Post } from '../../../apollo/generated/schema';
import RootComment from './RootComment';

interface ICommentsSectionProps {
  comments: Array<Comment> | null;
  postId: Post['id'];
}

function CommentsSection({ comments, postId }: ICommentsSectionProps) {
  const rootComments = useMemo(() => {
    return _filter(comments, (comment) => {
      return _isNull(comment?.parentId);
    });
  }, [comments]);

  return (
    <Box border="1px solid red">
      {rootComments?.map((comment) => (
        <RootComment key={comment.id} comment={comment} postId={postId} />
      ))}
    </Box>
  );
}

export default memo(CommentsSection);

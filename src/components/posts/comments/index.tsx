import { Box } from '@chakra-ui/react';
import { memo } from 'react';

import { Comment, Post } from '../../../apollo/generated/schema';
import formatComments from '../../../helpers/format-coments';
import ListComments from './ListComments';

interface ICommentsSectionProps {
  comments: Array<Comment> | null;
  postId: Post['id'];
}

function CommentsSection({ comments, postId }: ICommentsSectionProps) {
  return (
    <Box border="1px solid red" pl="15px">
      <Box>
        {comments && (
          <ListComments
            postId={postId}
            comments={formatComments(comments || [])}
          />
        )}
      </Box>
    </Box>
  );
}

export default memo(CommentsSection);

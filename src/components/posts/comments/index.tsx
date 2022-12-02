import { Box } from '@chakra-ui/react';
import { memo } from 'react';

import {
  Comment,
  Post,
  useGetAllPostCommentsQuery,
} from '../../../apollo/generated/schema';
import formatComments from '../../../helpers/format-coments';
import ListComments from './ListComments';

interface ICommentsSectionProps {
  postId: Post['id'];
}

function CommentsSection({ postId }: ICommentsSectionProps) {
  const { data, refetch: refetchComments } = useGetAllPostCommentsQuery({
    variables: {
      input: {
        postId,
      },
    },
  });

  const comments = data?.getAllPostComments as Array<Comment>;

  return (
    <Box border="1px solid red">
      <Box>
        {comments && (
          <ListComments
            refetchComments={refetchComments}
            postId={postId}
            comments={formatComments(comments || [])}
          />
        )}
      </Box>
    </Box>
  );
}

export default memo(CommentsSection);

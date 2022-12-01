import { Box, Button } from '@chakra-ui/react';
import { memo } from 'react';

function Post({ post, onOpen, setCurrentPost }) {
  const clickHandler = () => {
    setCurrentPost(post.id);
    onOpen();
  };
  return (
    <Box border="1px solid white">
      {post?.text} {post.user.username}
      <Button onClick={clickHandler}>ok</Button>
    </Box>
  );
}

export default memo(Post);

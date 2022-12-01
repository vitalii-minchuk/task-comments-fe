import { Box, Button, Flex, Stack, useDisclosure } from '@chakra-ui/react';

import {
  Post,
  useCreatePostMutation,
  useGetPostsQuery,
} from '../../apollo/generated/schema';
import AddPostModal from './modals/AddPostModal';
import SinglePost from './post';

function Posts() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, refetch } = useGetPostsQuery({
    refetchWritePolicy: 'merge',
  });
  const [createNewPost] = useCreatePostMutation({
    onCompleted() {
      refetch();
    },
  });

  const createNewPostHandler = (post: string) => {
    createNewPost({
      variables: {
        input: {
          text: post,
        },
      },
    });
  };

  return (
    <>
      <Box pt="50px">
        <Flex justify="space-between">
          <Button onClick={onOpen}>Add post</Button>
          <Flex>d</Flex>
        </Flex>
        <Box>
          <Stack>
            {data?.getAllPosts?.map((post) => (
              <SinglePost key={post.id} post={post as Post} />
            ))}
          </Stack>
        </Box>
      </Box>
      <AddPostModal
        createNewPostHandler={createNewPostHandler}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}

export default Posts;

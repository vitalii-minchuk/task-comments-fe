import { useMutation, useQuery } from '@apollo/client';
import { Box, Button, Flex, Stack, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { CREATE_POST, GET_ALL_POSTS } from '../../apollo/generated';
import AddCommentModal from './modals/AddCommentModal';
import AddPostModal from './modals/AddPostModal';
import Post from './Post';

function Posts() {
  const [currentPost, setCurrentPost] = useState('');
  const {
    isOpen: isPostOpen,
    onOpen: onPostOpen,
    onClose: onPostClose,
  } = useDisclosure();
  const {
    isOpen: isCommentOpen,
    onOpen: onCommentOpen,
    onClose: onCommentClose,
  } = useDisclosure();
  const { data: allPosts } = useQuery(GET_ALL_POSTS);
  const [createNewPost, { data: newPost, error, loading }] =
    useMutation(CREATE_POST);
  const posts = allPosts?.getAllPosts;

  const createNewPostHandler = (post: string) => {
    createNewPost({
      variables: {
        input: {
          text: post,
          link: '12sfd5d',
        },
      },
    });
  };

  const createNewCommentHandler = (comment: string) => {
    console.log(currentPost);
  };

  return (
    <>
      <Box pt="50px">
        <Flex justify="space-between">
          <Button onClick={onPostOpen}>Add post</Button>
          <Flex>d</Flex>
        </Flex>
        <Box>
          <Stack>
            {posts?.map((post) => (
              <Post
                key={post.id}
                post={post}
                onOpen={onCommentOpen}
                setCurrentPost={setCurrentPost}
              />
            ))}
          </Stack>
        </Box>
      </Box>
      <AddPostModal
        createNewPostHandler={createNewPostHandler}
        isOpen={isPostOpen}
        onClose={onPostClose}
      />
      <AddCommentModal
        createNewCommentHandler={createNewCommentHandler}
        isOpen={isCommentOpen}
        onClose={onCommentClose}
      />
    </>
  );
}

export default Posts;

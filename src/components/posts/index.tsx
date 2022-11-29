import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';
import AddPostModal from './AddPostModal';

function Posts() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const createNewPostHandler = (post: string) => {
    console.log(post);
  };

  return (
    <>
      <Box pt="50px">
        <Flex justify="space-between">
          <Button onClick={onOpen}>Add post</Button>
          <Flex>d</Flex>
        </Flex>
        <Box>
          <Flex>
            <Box>dd</Box>
            <Box mx={4} _hover={{ outline: '2px solid white' }}>
              dd
            </Box>
            <Box>dd</Box>
          </Flex>
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

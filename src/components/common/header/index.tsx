import { Box, Button, Container, Flex, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <Box as="header" w="full" shadow="2px 1px 10px white">
      <Container maxWidth="4xl">
        <Flex align="center" justify="space-between" h="60px">
          <Heading cursor="pointer" onClick={() => navigate('')}>
            Logo
          </Heading>
          <Flex gap="10px">
            <Button
              h="34"
              rounded="full"
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              _hover={{
                shadow: '5px 5px 20px #7928CA',
              }}
              onClick={() => navigate('/login')}
            >
              sign in
            </Button>
            <Button
              h="34"
              rounded="full"
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              _hover={{
                shadow: '5px 5px 20px #7928CA',
              }}
              onClick={() => navigate('/register')}
            >
              sign up
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}

export default Header;

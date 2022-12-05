import { Box, Button, Container, Flex, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useMeQuery } from '../../../apollo/generated/schema';

function Header() {
  const navigate = useNavigate();
  const { data } = useMeQuery();

  return (
    <Box as="header" w="full" shadow="2px 1px 10px #7928CA">
      <Container maxWidth="4xl">
        <Flex align="center" justify="space-between" h="60px">
          <Heading opacity="0.8" cursor="pointer" onClick={() => navigate('')}>
            Logo
          </Heading>
          {!data?.me ? (
            <Text>{data?.me.username}</Text>
          ) : (
            <Flex gap="10px">
              <Button
                h="34"
                rounded="full"
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                _active={{
                  shadow: 'none',
                }}
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
                _active={{
                  shadow: 'none',
                }}
                _hover={{
                  shadow: '5px 5px 20px #7928CA',
                }}
                onClick={() => navigate('/register')}
              >
                sign up
              </Button>
            </Flex>
          )}
        </Flex>
        <Box position="absolute" right={0}>
          <Button variant="text" onClick={() => navigate('/info')}>
            info
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Header;

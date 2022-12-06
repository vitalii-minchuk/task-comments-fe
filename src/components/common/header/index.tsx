import { ArrowBackIcon, QuestionOutlineIcon } from '@chakra-ui/icons';
import { Box, Button, Container, Flex, Heading, Text } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useMeQuery } from '../../../apollo/generated/schema';

function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data } = useMeQuery();

  return (
    <Box as="header" w="full" shadow="2px 1px 10px #7928CA">
      <Container maxWidth="4xl" position="relative">
        <Flex align="center" justify="space-between" h="60px">
          <Heading cursor="pointer" onClick={() => navigate('')}>
            Logo
          </Heading>
          <Flex gap="10px">
            <Button variant="myAuth" onClick={() => navigate('/login')}>
              sign in
            </Button>
            <Button variant="myAuth" onClick={() => navigate('/register')}>
              sign up
            </Button>
          </Flex>
        </Flex>
        <Box position="absolute" right="16px" bottom="-50px">
          {pathname === '/info' ? (
            <Button
              leftIcon={<ArrowBackIcon />}
              variant="myInfo"
              onClick={() => navigate(-1)}
            >
              back
            </Button>
          ) : (
            <Button
              variant="myInfo"
              rightIcon={<QuestionOutlineIcon />}
              onClick={() => navigate('/info')}
            >
              info
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default Header;

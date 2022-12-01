import { FormEvent, useState } from 'react';
import {
  Box,
  Button,
  Center,
  CircularProgress,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import { LoginUserInput, useLoginMutation } from '../apollo/generated/schema';

function Login() {
  const [value, setValue] = useState<LoginUserInput>({} as LoginUserInput);
  const navigate = useNavigate();
  const [login, { error, loading }] = useLoginMutation({
    onCompleted() {
      navigate('/');
    },
  });

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    login({
      variables: {
        input: { password: value.password, email: value.email },
      },
    });
    setValue({} as LoginUserInput);
  };

  return (
    <Center w="full" pt="80px">
      {loading ? (
        <CircularProgress mt={10} isIndeterminate color="gray.600" />
      ) : (
        <Box
          w={{ base: '300px', md: '400px' }}
          bg="gray.800"
          px={4}
          py={8}
          boxShadow="3px 3px 15px gray"
          border="1px solid"
          borderColor="gray.500"
          rounded="lg"
        >
          {error && <Text>{error.message}</Text>}
          <form>
            <Stack gap={4}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  onChange={(e) =>
                    setValue({ ...value, email: e.target.value })
                  }
                  type="email"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  onChange={(e) => {
                    setValue({ ...value, password: e.target.value });
                  }}
                  type="password"
                />
              </FormControl>
              <Button onClick={submitHandler} type="submit">
                ok
              </Button>
            </Stack>
          </form>
        </Box>
      )}
    </Center>
  );
}

export default Login;

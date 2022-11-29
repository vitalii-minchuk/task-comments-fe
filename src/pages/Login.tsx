import { FormEvent, useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';

import GET_LOCATIONS from '../apollo/generated';

function Login() {
  const [value, setValue] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });
  const [login, { data, error, loading }] = useMutation(GET_LOCATIONS);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    login({
      variables: {
        input: { password: 'test1234', email: 'test5@test.com' },
      },
    });
  };
  return (
    <Center w="full" pt="80px">
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
        <form>
          <Stack gap={4}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                onChange={(e) => setValue({ ...value, email: e.target.value })}
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
    </Center>
  );
}

export default Login;

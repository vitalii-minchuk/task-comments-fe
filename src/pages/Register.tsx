import { FormEvent, useState } from 'react';
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { REGISTER } from '../apollo/generated';

function Register() {
  const [value, setValue] = useState<{
    email: string;
    password: string;
    username: string;
  }>({
    email: '',
    password: '',
    username: '',
  });
  const [registerUser, { data, error, loading }] = useMutation(REGISTER);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    registerUser({
      variables: {
        input: {
          password: value.password,
          email: value.email,
          username: value.username,
        },
      },
    });
    setValue({ email: '', password: '', username: '' });
  };
  return (
    <Center w="full" pt="50px">
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
              <FormLabel>User name</FormLabel>
              <Input
                value={value.username}
                onChange={(e) =>
                  setValue({ ...value, username: e.target.value })
                }
                type="text"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                value={value.email}
                onChange={(e) => setValue({ ...value, email: e.target.value })}
                type="email"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                value={value.password}
                onChange={(e) =>
                  setValue({ ...value, password: e.target.value })
                }
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

export default Register;

import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  RegisterUserInput,
  useRegisterUserMutation,
} from '../apollo/generated/schema';

function Register() {
  const [value, setValue] = useState<RegisterUserInput>(
    {} as RegisterUserInput
  );
  const navigate = useNavigate();
  const [registerUser] = useRegisterUserMutation({
    onCompleted() {
      navigate('/');
    },
  });

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
    setValue({ username: '', password: '', email: '' });
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
                onChange={(e) =>
                  setValue({ ...value, username: e.target.value })
                }
                type="text"
              />
            </FormControl>
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

import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  Center,
  CircularProgress,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';

import { useLoginMutation } from '../apollo/generated/schema';
import { loginUserValidationSchema, UserSubmitLoginForm } from '../validation';

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserSubmitLoginForm>({
    mode: 'onTouched',
    resolver: yupResolver(loginUserValidationSchema),
  });

  const [login, { error, loading }] = useLoginMutation({
    onCompleted() {
      reset();
      navigate('/');
    },
  });

  const submitHandler = (data: UserSubmitLoginForm) => {
    login({
      variables: {
        input: { password: data.password, email: data.email },
      },
    });
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
          <form onSubmit={handleSubmit(submitHandler)}>
            <Stack gap={4}>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel>Email</FormLabel>
                <Input id="email" type="email" {...register('email')} />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  id="password"
                  {...register('password')}
                  type="password"
                />
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </Box>
      )}
    </Center>
  );
}

export default Login;

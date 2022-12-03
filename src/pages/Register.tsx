import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useRegisterUserMutation } from '../apollo/generated/schema';
import {
  registerUserValidationSchema,
  UserSubmitRegisterForm,
} from '../validation';

function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserSubmitRegisterForm>({
    mode: 'onTouched',
    resolver: yupResolver(registerUserValidationSchema),
  });
  const [registerUser] = useRegisterUserMutation({
    onCompleted() {
      navigate('/');
      reset();
    },
  });

  const submitHandler = (data: UserSubmitRegisterForm) => {
    registerUser({
      variables: {
        input: {
          password: data.password,
          email: data.email,
          username: data.username,
        },
      },
    });
  };
  return (
    <Center w="full" pt="50px">
      <Box
        w={{ base: '300px', md: '400px' }}
        bg="gray.800"
        px={4}
        py={8}
        boxShadow="3px 3px 15px #7928CA"
        border="1px solid"
        borderColor="gray.500"
        rounded="lg"
      >
        <form onSubmit={handleSubmit(submitHandler)}>
          <Stack gap={4}>
            <FormControl isInvalid={!!errors.username}>
              <FormLabel>User name</FormLabel>
              <Input id="username" {...register('username')} type="text" />
              <FormErrorMessage>
                {errors.username && errors.username.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.email}>
              <FormLabel>Email</FormLabel>
              <Input id="email" {...register('email')} type="email" />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.password}>
              <FormLabel>Password</FormLabel>
              <Input id="password" {...register('password')} type="password" />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <Button type="submit">ok</Button>
          </Stack>
        </form>
      </Box>
    </Center>
  );
}

export default Register;

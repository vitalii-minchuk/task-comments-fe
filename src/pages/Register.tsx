import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  useToast,
} from '@chakra-ui/react';
import { useForm, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useRegisterUserMutation } from '../apollo/generated/schema';
import {
  registerUserValidationSchema,
  UserSubmitRegisterForm,
} from '../validation';
import makeToast, { ToastStatus } from '../helpers/make-toast';

function Register() {
  const toast = useToast();
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
  const [registerUser, { loading, error }] = useRegisterUserMutation({
    onCompleted() {
      navigate('/login');
      reset();
      toast(
        makeToast({
          description: 'User has been registered',
          title: 'Register user',
          status: ToastStatus.SUCCESS,
        })
      );
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

  useEffect(() => {
    if (error?.message) {
      toast(
        makeToast({
          description: error.message,
          title: 'Register user',
          status: ToastStatus.ERROR,
        })
      );
    }
  }, [error, toast]);
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
            <FormControl isInvalid={!!errors.homePageUrl}>
              <FormLabel>Home page url</FormLabel>
              <Input
                id="homePageUrl"
                {...register('homePageUrl')}
                type="text"
              />
              <FormErrorMessage>
                {errors.homePageUrl && errors.homePageUrl.message}
              </FormErrorMessage>
            </FormControl>
            <Button isLoading={loading} type="submit">
              ok
            </Button>
          </Stack>
        </form>
      </Box>
    </Center>
  );
}

export default Register;

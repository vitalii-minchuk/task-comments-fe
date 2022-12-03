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
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useLoginMutation } from '../apollo/generated/schema';
import makeToast, { ToastStatus } from '../helpers/make-toast';
import { loginUserValidationSchema, UserSubmitLoginForm } from '../validation';

function Login() {
  const toast = useToast();
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
      toast(
        makeToast({
          description: 'User has been logged in',
          title: 'Login user',
          status: ToastStatus.SUCCESS,
        })
      );
    },
  });

  useEffect(() => {
    if (error?.message) {
      toast(
        makeToast({
          description: error.message,
          title: 'Login user',
          status: ToastStatus.ERROR,
        })
      );
    }
  }, [error, toast]);

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
          boxShadow="3px 3px 15px #7928CA"
          border="1px solid"
          borderColor="gray.500"
          rounded="lg"
        >
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

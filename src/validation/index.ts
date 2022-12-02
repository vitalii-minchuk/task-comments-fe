import * as Yup from 'yup';

export type UserSubmitLoginForm = {
  email: string;
  password: string;
};

export const loginUserValidationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(44, 'Password must not exceed 40 characters'),
});

export type UserSubmitRegisterForm = {
  username: string;
  email: string;
  password: string;
};

export const registerUserValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .min(2, 'Username must be at least 6 characters')
    .max(64, 'Username must not exceed 20 characters'),
  email: Yup.string().required('Email is required').email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(44, 'Password must not exceed 40 characters'),
});

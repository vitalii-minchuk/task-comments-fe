import * as Yup from 'yup';

// const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;

export type UserSubmitLoginForm = {
  email: string;
  password: string;
};

export const loginUserValidationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('Email is invalid'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(44, 'Password must not exceed 44 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase character')
    .matches(
      /([a-z])/,
      'Password must contain at least one lowercase character'
    )
    .matches(/(\d)/, 'Password must contain at least one number'),
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
    .max(44, 'Password must not exceed 40 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase character')
    .matches(
      /([a-z])/,
      'Password must contain at least one lowercase character'
    )
    .matches(/(\d)/, 'Password must contain at least one number'),
});

export type SubmitTextForm = {
  text: string;
};

export const textValidationSchema = Yup.object().shape({
  text: Yup.string()
    .required('Field must not br empty')
    .min(20, 'Text must be at least 20 characters')
    .max(640, 'Text must not exceed 640 characters'),
});

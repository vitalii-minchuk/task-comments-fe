import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($input: LoginUserInput!) {
    login(input: $input)
  }
`;

export const REGISTER = gql`
  mutation RegisterUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      username
      email
    }
  }
`;

export const CREATE_POST = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createNewPost(input: $input) {
      text
    }
  }
`;

export const GET_ALL_POSTS = gql`
  query GetPosts {
    getAllPosts {
      id
      createdAt
      text
      user {
        username
      }
    }
  }
`;

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Comment = {
  __typename?: 'Comment';
  children?: Maybe<Comment>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  parentId?: Maybe<Scalars['String']>;
  postId: Scalars['String'];
  text: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: User;
};

export type CreateCommentInput = {
  parentId?: InputMaybe<Scalars['String']>;
  postId: Scalars['String'];
  text: Scalars['String'];
};

export type CreatePostInput = {
  text: Scalars['String'];
};

export type GetPostCommentsInput = {
  postId: Scalars['String'];
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createNewComment: Comment;
  createNewPost: Post;
  login: Scalars['String'];
  registerUser: User;
};


export type MutationCreateNewCommentArgs = {
  input: CreateCommentInput;
};


export type MutationCreateNewPostArgs = {
  input: CreatePostInput;
};


export type MutationLoginArgs = {
  input: LoginUserInput;
};


export type MutationRegisterUserArgs = {
  input: RegisterUserInput;
};

export type Post = {
  __typename?: 'Post';
  comments?: Maybe<Comment>;
  createdAt?: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  text: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: User;
};

export type Query = {
  __typename?: 'Query';
  getAllPostComments: Array<Comment>;
  getAllPosts: Array<Post>;
  me: User;
};


export type QueryGetAllPostCommentsArgs = {
  input: GetPostCommentsInput;
};

export type RegisterUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  comments?: Maybe<Comment>;
  createdAt?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  homePageUrl?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  password: Scalars['String'];
  posts?: Maybe<Post>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  username: Scalars['String'];
};

export type CreateNewCommentMutationVariables = Exact<{
  input: CreateCommentInput;
}>;


export type CreateNewCommentMutation = { __typename?: 'Mutation', createNewComment: { __typename?: 'Comment', text: string } };

export type GetAllPostCommentsQueryVariables = Exact<{
  input: GetPostCommentsInput;
}>;


export type GetAllPostCommentsQuery = { __typename?: 'Query', getAllPostComments: Array<{ __typename?: 'Comment', text: string, id: string, createdAt?: any | null, parentId?: string | null, user: { __typename?: 'User', username: string } }> };

export type CreatePostMutationVariables = Exact<{
  input: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createNewPost: { __typename?: 'Post', text: string } };

export type GetPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPostsQuery = { __typename?: 'Query', getAllPosts: Array<{ __typename?: 'Post', id: string, createdAt?: any | null, text: string, user: { __typename?: 'User', username: string } }> };

export type LoginMutationVariables = Exact<{
  input: LoginUserInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: string };

export type RegisterUserMutationVariables = Exact<{
  input: RegisterUserInput;
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'User', username: string, email: string } };


export const CreateNewCommentDocument = gql`
    mutation CreateNewComment($input: CreateCommentInput!) {
  createNewComment(input: $input) {
    text
  }
}
    `;
export type CreateNewCommentMutationFn = Apollo.MutationFunction<CreateNewCommentMutation, CreateNewCommentMutationVariables>;

/**
 * __useCreateNewCommentMutation__
 *
 * To run a mutation, you first call `useCreateNewCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewCommentMutation, { data, loading, error }] = useCreateNewCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateNewCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewCommentMutation, CreateNewCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewCommentMutation, CreateNewCommentMutationVariables>(CreateNewCommentDocument, options);
      }
export type CreateNewCommentMutationHookResult = ReturnType<typeof useCreateNewCommentMutation>;
export type CreateNewCommentMutationResult = Apollo.MutationResult<CreateNewCommentMutation>;
export type CreateNewCommentMutationOptions = Apollo.BaseMutationOptions<CreateNewCommentMutation, CreateNewCommentMutationVariables>;
export const GetAllPostCommentsDocument = gql`
    query GetAllPostComments($input: GetPostCommentsInput!) {
  getAllPostComments(input: $input) {
    text
    id
    createdAt
    parentId
    user {
      username
    }
  }
}
    `;

/**
 * __useGetAllPostCommentsQuery__
 *
 * To run a query within a React component, call `useGetAllPostCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPostCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPostCommentsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetAllPostCommentsQuery(baseOptions: Apollo.QueryHookOptions<GetAllPostCommentsQuery, GetAllPostCommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllPostCommentsQuery, GetAllPostCommentsQueryVariables>(GetAllPostCommentsDocument, options);
      }
export function useGetAllPostCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPostCommentsQuery, GetAllPostCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllPostCommentsQuery, GetAllPostCommentsQueryVariables>(GetAllPostCommentsDocument, options);
        }
export type GetAllPostCommentsQueryHookResult = ReturnType<typeof useGetAllPostCommentsQuery>;
export type GetAllPostCommentsLazyQueryHookResult = ReturnType<typeof useGetAllPostCommentsLazyQuery>;
export type GetAllPostCommentsQueryResult = Apollo.QueryResult<GetAllPostCommentsQuery, GetAllPostCommentsQueryVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($input: CreatePostInput!) {
  createNewPost(input: $input) {
    text
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const GetPostsDocument = gql`
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

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
      }
export function useGetPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsQueryResult = Apollo.QueryResult<GetPostsQuery, GetPostsQueryVariables>;
export const LoginDocument = gql`
    mutation Login($input: LoginUserInput!) {
  login(input: $input)
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterUserDocument = gql`
    mutation RegisterUser($input: RegisterUserInput!) {
  registerUser(input: $input) {
    username
    email
  }
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
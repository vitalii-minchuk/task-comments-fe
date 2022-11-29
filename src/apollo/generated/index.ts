import { gql } from '@apollo/client';

const GET_LOCATIONS = gql`
  mutation Login($input: LoginUserInput!) {
    login(input: $input)
  }
`;

export default GET_LOCATIONS;

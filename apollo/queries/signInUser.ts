import {gql} from '@apollo/client';

export const GET_IS_USER_SIGNEDIN = gql`
  query signInUser {
    isUserSignedIn @client
  }
`;
export const GET_IS_USER_AUTHENTICATION = gql`
  query authenticateUSer {
    isUserAuthenticated @client
  }
`;

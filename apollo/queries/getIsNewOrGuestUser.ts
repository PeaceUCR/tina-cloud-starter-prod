/* eslint-disable import/prefer-default-export */
import {gql} from '@apollo/client';

export const GET_IS_NEW_OR_GUEST_USER = gql`
  query getIsNewOrGuestUser {
    getIsNewOrGuestUser @client
  }
`;

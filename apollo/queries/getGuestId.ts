/* eslint-disable import/prefer-default-export */
import {gql} from '@apollo/client';

export const GET_GUEST_USER_ID = gql`
  query GET_GUEST_USER_ID($input: GetGuestUserInput!) {
    getGuestUserId(input: $input) {
      guestId
    }
  }
`;

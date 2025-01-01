/* eslint-disable import/prefer-default-export */
import {gql} from '@apollo/client';

export const GET_SAVED_CARDS = gql`
  query GetSavedCards($input: GetSavedCardsInput!) {
    getSavedCards(input: $input) {
      id
      isPrimaryCard
      brand
      cvc_check
      last4
    }
  }
`;

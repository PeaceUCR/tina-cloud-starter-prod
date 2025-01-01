/* eslint-disable import/prefer-default-export */
import {gql} from '@apollo/client';

export const SAVE_CARD_TO_STRIPE = gql`
  mutation SaveCard($input: SaveCardInput!) {
    saveCard(input: $input) {
      success
      message
    }
  }
`;

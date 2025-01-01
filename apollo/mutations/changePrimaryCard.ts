/* eslint-disable import/prefer-default-export */
import {gql} from '@apollo/client';

export const CHANGE_PRIMARY_CARD = gql`
  mutation ChangePrimaryCardMutation($input: ChangePrimaryCardInput!) {
    changePrimaryPayment(input: $input) {
      success
      message
    }
  }
`;

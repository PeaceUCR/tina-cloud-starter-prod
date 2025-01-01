/* eslint-disable import/prefer-default-export */
import {gql} from '@apollo/client';

export const DELETE_PAYMENT_METHOD = gql`
  mutation DeletePaymentMethod($input: ChangePrimaryCardInput!) {
    deletePaymentMethod(input: $input) {
      success
      message
    }
  }
`;

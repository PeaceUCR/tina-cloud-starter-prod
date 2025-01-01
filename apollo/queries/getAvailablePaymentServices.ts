/* eslint-disable import/prefer-default-export */
import {gql} from '@apollo/client';

export const GET_AVAILABLE_PAYMENT_SERVICES = gql`
  query GET_AVAILABLE_PAYMENTS {
    getAvailablePaymentServices {
      availablePayments
    }
  }
`;

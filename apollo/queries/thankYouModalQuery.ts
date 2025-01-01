/* eslint-disable import/prefer-default-export */
import {gql} from '@apollo/client';

export const GET_THANK_YOU_MODAL = gql`
  query isThankYouModal {
    isThankYouModal @client
  }
`;

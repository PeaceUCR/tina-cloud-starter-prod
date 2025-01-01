/* eslint-disable import/prefer-default-export */
import {gql} from '@apollo/client';

export const GET_CART_AMOUNT = gql`
  query getCartAmount {
    getCartAmount @client
  }
`;

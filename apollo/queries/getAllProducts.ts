/* eslint-disable import/prefer-default-export */

import {gql} from '@apollo/client';

export const GET_ALL_PRODUCTS = gql`
  query GetAllProduct($input: AllProductsInput) {
    getAllProducts(input: $input) {
      id
      name
      imageURL
      cost
      isFavorite
    }
  }
`;

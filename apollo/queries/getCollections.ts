/* eslint-disable import/prefer-default-export */

import {gql} from '@apollo/client';

export const GET_COLLECTIONS = gql`
  query GetProductCollections {
    getProductCollections {
      id
      name
    }
  }
`;

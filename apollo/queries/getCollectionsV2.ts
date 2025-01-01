/* eslint-disable import/prefer-default-export */

import {gql} from '@apollo/client';

export const GET_COLLECTIONS_V2 = gql`
  query onGetProductCollections {
    getProductCollectionsV2 {
      id
      name
      parentId
    }
  }
`;
// productIds
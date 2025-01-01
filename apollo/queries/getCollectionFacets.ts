/* eslint-disable import/prefer-default-export */

import {gql} from '@apollo/client';

export const GET_COLLECTION_FACETS = gql`
  query GetCollectionFacets($id: Int) {
    getCollectionFacets(collectionId: $id)
  }
`;

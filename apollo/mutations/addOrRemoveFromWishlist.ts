import {gql} from '@apollo/client';

export const ADD_OR_REMOVE_FROM_WISHLIST = gql`
  mutation ADD_OR_REMOVE_FROM_WISHLIST($input: AddOrRemoveFromWishlistInput!) {
    addOrRemoveFromWishlist(input: $input) {
      id
      success
      message
    }
  }
`;

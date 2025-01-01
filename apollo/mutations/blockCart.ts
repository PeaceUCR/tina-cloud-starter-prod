import {gql} from '@apollo/client';

export const BLOCK_CART = gql`
  mutation BLOCK_CART {
    blockCart{
      message
      success
    }
  }
`;

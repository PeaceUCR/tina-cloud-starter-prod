/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/prefer-default-export */
import {gql} from '@apollo/client';

export const ProductQtyChange = gql`
  mutation onChangeProductQtyInCart($input: ChangeProductQtyInCartInput!) {
    changeProductQtyInCart(input: $input) {
      success
      message
    }
  }
`;

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/prefer-default-export */
import {gql} from '@apollo/client';

export const DeleteFromCart = gql`
  mutation onDeleteFromCart($input: DeleteFromCartInput!) {
    deleteFromCart(input: $input) {
      success
      message
    }
  }
`;
